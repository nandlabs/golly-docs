---
title: SQS
weight: 5
---

The `sqs` package is an AWS SQS implementation of the [golly messaging](https://pkg.go.dev/oss.nandlabs.io/golly/messaging) `Provider` interface. Blank-import it to auto-register the `sqs://` scheme with the messaging manager.

## Installation

```sh
go get oss.nandlabs.io/golly-aws/sqs
```

## Features

- **Send** — Send a single message to an SQS queue
- **SendBatch** — Send up to N messages, automatically split into batches of 10
- **Receive** — Receive a single message with configurable long-polling
- **ReceiveBatch** — Receive up to 10 messages at once
- **AddListener** — Continuously poll a queue in a background goroutine with automatic error backoff
- **Rsvp** — Acknowledge (delete) or reject (change visibility to 0) messages
- **FIFO Support** — Message group ID and deduplication ID via options
- **Custom Endpoint** — Works with LocalStack, ElasticMQ, and other SQS-compatible services
- **Auto-Registration** — Blank import registers the `sqs://` scheme with `messaging.GetManager()`
- **Config Resolution** — Per-queue or global AWS config via `awscfg.GetConfig`
- **Thread-Safe** — All listener management is protected with mutexes and atomic flags

## Quick Start

```go
package main

import (
    "fmt"
    "log"
    "net/url"

    "oss.nandlabs.io/golly-aws/awscfg"
    _ "oss.nandlabs.io/golly-aws/sqs"
    "oss.nandlabs.io/golly/messaging"
)

func main() {
    // Register AWS config
    cfg := awscfg.NewConfig("us-east-1")
    awscfg.Manager.Register("sqs", cfg)

    mgr := messaging.GetManager()

    // Send a message
    u, _ := url.Parse("sqs://my-queue")
    msg := messaging.NewSimpleMessage([]byte("Hello from Golly!"))
    if err := mgr.Send(u, msg); err != nil {
        log.Fatal(err)
    }

    // Receive a message
    received, err := mgr.Receive(u)
    if err != nil {
        log.Fatal(err)
    }
    body, _ := received.Body()
    fmt.Println(string(body))

    // Acknowledge
    mgr.Rsvp(u, received, true)
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  import _ "oss.nandlabs.io/golly-aws/sqs"               │
│                                                         │
│  messaging.GetManager().Send(url, msg)                  │
│  messaging.GetManager().Receive(url)                    │
│  messaging.GetManager().AddListener(url, fn)            │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  golly/messaging.Manager                                │
│  Routes to provider by URL scheme ("sqs")               │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  sqs.Provider                                           │
│  1. getSQSClient(u)    → awscfg.GetConfig(u, "sqs")     │
│  2. resolveQueueURL     → GetQueueUrl API or direct URL │
│  3. SQS API call        → SendMessage / ReceiveMessage  │
└─────────────────────────────────────────────────────────┘
```

## URL Format

| URL                           | Queue Name    | Account ID       |
| ----------------------------- | ------------- | ---------------- |
| `sqs://my-queue`              | `my-queue`    | _(caller's own)_ |
| `sqs://my-queue/123456789012` | `my-queue`    | `123456789012`   |
| `sqs://orders.fifo`           | `orders.fifo` | _(caller's own)_ |

## Configuration

Configuration is resolved via `awscfg.GetConfig(url, "sqs")`:

1. **`url.Host`** — queue-specific config
2. **`url.Host + "/" + url.Path`** — path-specific config
3. **Fallback `"sqs"`** — default config for all SQS operations

```go
// Per-queue configuration
highPriorityCfg := awscfg.NewConfig("us-east-1")
highPriorityCfg.SetProfile("prod")
awscfg.Manager.Register("high-priority-queue", highPriorityCfg)

// Default for all other queues
awscfg.Manager.Register("sqs", defaultCfg)
```

## Listener

Use `AddListener` to continuously poll a queue in a background goroutine:

```go
u, _ := url.Parse("sqs://my-queue")

mgr.AddListener(u, func(msg messaging.Message) error {
    body, _ := msg.Body()
    fmt.Printf("Received: %s\n", string(body))
    return nil // returning nil auto-acknowledges
})
```
