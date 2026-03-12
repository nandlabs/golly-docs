---
title: SNS
weight: 4
---

The `sns` package is an AWS SNS implementation of the [golly messaging](https://pkg.go.dev/oss.nandlabs.io/golly/messaging) `Provider` interface. Blank-import it to auto-register the `sns://` scheme with the messaging manager.

{{< callout type="info" >}}
**SNS is publish-only.** `Receive`, `ReceiveBatch`, and `AddListener` are not supported. For receiving messages, use an SNS→SQS subscription with the [`sqs`]({{< relref "sqs" >}}) package.
{{< /callout >}}

## Installation

```sh
go get oss.nandlabs.io/golly-aws/sns
```

## Features

- **Send** — Publish a single message to an SNS topic, phone number, or endpoint ARN
- **SendBatch** — Publish up to N messages, automatically split into batches of 10
- **FIFO Support** — Message group ID and deduplication ID via options
- **Topic ARN Resolution** — Resolves topic names to ARNs via `CreateTopic` (idempotent) or direct ARN in URL path
- **Subject** — Optional subject for email/email-json subscriptions
- **SMS Direct Publish** — Send SMS directly to a phone number without a topic
- **Custom Endpoint** — Works with LocalStack and other SNS-compatible services
- **Auto-Registration** — Blank import registers the `sns://` scheme with `messaging.GetManager()`
- **Config Resolution** — Per-topic or global AWS config via `awscfg.GetConfig`

## Quick Start

```go
package main

import (
    "log"
    "net/url"

    "oss.nandlabs.io/golly-aws/awscfg"
    _ "oss.nandlabs.io/golly-aws/sns"
    "oss.nandlabs.io/golly/messaging"
)

func main() {
    // Register AWS config
    cfg := awscfg.NewConfig("us-east-1")
    awscfg.Manager.Register("sns", cfg)

    mgr := messaging.GetManager()

    u, _ := url.Parse("sns://my-topic")
    msg := messaging.NewSimpleMessage([]byte("Hello from Golly!"))

    if err := mgr.Send(u, msg); err != nil {
        log.Fatal(err)
    }
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  import _ "oss.nandlabs.io/golly-aws/sns"               │
│                                                         │
│  messaging.GetManager().Send(url, msg)                  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  golly/messaging.Manager                                │
│  Routes to provider by URL scheme ("sns")               │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  sns.Provider                                           │
│  1. getSNSClient(u) → awscfg.GetConfig(u, "sns")       │
│  2. resolveTopicARN  → CreateTopic (idempotent) or ARN  │
│  3. SNS API call     → Publish / PublishBatch           │
└─────────────────────────────────────────────────────────┘
```

## URL Format

| URL                                                  | Resolution                                  |
| ---------------------------------------------------- | ------------------------------------------- |
| `sns://my-topic`                                     | Resolves ARN via `CreateTopic` (idempotent) |
| `sns:///arn:aws:sns:us-east-1:123456789012:my-topic` | Uses the ARN directly from path             |
| `sns://my-topic.fifo`                                | Resolves ARN for a FIFO topic               |

## Configuration

Configuration is resolved via `awscfg.GetConfig(url, "sns")`:

1. **`url.Host`** — topic-specific config
2. **`url.Host + "/" + url.Path`** — path-specific config
3. **Fallback `"sns"`** — default config for all SNS operations

```go
// Per-topic configuration
alertsCfg := awscfg.NewConfig("us-east-1")
alertsCfg.SetProfile("prod-alerts")
awscfg.Manager.Register("critical-alerts", alertsCfg)

// Default for all other topics
awscfg.Manager.Register("sns", defaultCfg)
```
