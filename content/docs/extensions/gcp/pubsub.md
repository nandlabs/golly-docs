---
title: Pub/Sub
weight: 4
---

The `pubsub` package is a Google Cloud Pub/Sub (v2) implementation of the [golly messaging](https://pkg.go.dev/oss.nandlabs.io/golly/messaging) `Provider` interface. Blank-import it to auto-register the `pubsub://` scheme with the messaging manager.

## Installation

```sh
go get oss.nandlabs.io/golly-gcp/pubsub
```

## Features

- **Send** — Publish a single message to a Pub/Sub topic
- **SendBatch** — Publish multiple messages asynchronously with automatic batching
- **Receive** — Receive a single message from a subscription with configurable timeout
- **ReceiveBatch** — Receive up to N messages from a subscription
- **AddListener** — Continuously receive messages in a background goroutine with graceful shutdown
- **Rsvp** — Acknowledge (Ack) or reject (Nack) received messages for at-least-once delivery
- **Ordered Delivery** — Ordering key support for FIFO-like message ordering
- **Auto-Registration** — Blank import registers the `pubsub://` scheme with `messaging.GetManager()`
- **Config Resolution** — Per-topic/subscription or global GCP config via `gcpsvc.GetConfig`
- **Thread-Safe** — All listener management is protected with mutexes and atomic flags

## Quick Start

```go
package main

import (
    "fmt"
    "log"
    "net/url"

    "oss.nandlabs.io/golly-gcp/gcpsvc"
    _ "oss.nandlabs.io/golly-gcp/pubsub"
    "oss.nandlabs.io/golly/messaging"
)

func main() {
    // Register GCP config
    cfg := &gcpsvc.Config{ProjectId: "my-gcp-project"}
    gcpsvc.Manager.Register("pubsub", cfg)

    mgr := messaging.GetManager()

    // Publish a message
    u, _ := url.Parse("pubsub://my-topic")
    msg := messaging.NewSimpleMessage([]byte("Hello from Golly!"))
    if err := mgr.Send(u, msg); err != nil {
        log.Fatal(err)
    }

    // Receive from a subscription
    subURL, _ := url.Parse("pubsub://my-subscription")
    received, err := mgr.Receive(subURL)
    if err != nil {
        log.Fatal(err)
    }
    body, _ := received.Body()
    fmt.Println(string(body))

    // Acknowledge
    mgr.Rsvp(subURL, received, true)
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  import _ "oss.nandlabs.io/golly-gcp/pubsub"            │
│                                                         │
│  messaging.GetManager().Send(url, msg)                  │
│  messaging.GetManager().Receive(url)                    │
│  messaging.GetManager().AddListener(url, fn)            │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  golly/messaging.Manager                                │
│  Routes to provider by URL scheme ("pubsub")            │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  pubsub.Provider                                        │
│  1. getPubSubClient(u) → gcpsvc.GetConfig(u, "pubsub")  │
│  2. resolvePublisher/Subscriber                         │
│  3. Pub/Sub v2 API → Publish / Receive                  │
└─────────────────────────────────────────────────────────┘
```

## URL Format

| URL                        | Operation | Target                |
| -------------------------- | --------- | --------------------- |
| `pubsub://my-topic`        | Send      | Topic `my-topic`      |
| `pubsub://my-subscription` | Receive   | Sub `my-subscription` |

{{< callout type="info" >}}
Topics and subscriptions must be created in advance (via Console, Terraform, or `gcloud`). Publishing goes to topics; receiving is done from subscriptions.
{{< /callout >}}

## Configuration

Configuration is resolved via `gcpsvc.GetConfig(url, "pubsub")`:

1. **`url.Host`** — topic/subscription-specific config
2. **`url.Host + "/" + url.Path`** — path-specific config
3. **Fallback `"pubsub"`** — default config for all Pub/Sub operations

If no config is found or `ProjectId` is missing, the provider returns an error.

```go
// Per-topic configuration
ordersCfg := &gcpsvc.Config{ProjectId: "orders-project"}
gcpsvc.Manager.Register("orders-topic", ordersCfg)

// Default for all other Pub/Sub operations
gcpsvc.Manager.Register("pubsub", defaultCfg)
```

### With Emulator

```go
cfg := &gcpsvc.Config{ProjectId: "my-gcp-project"}
cfg.SetEndpoint("localhost:8085")
gcpsvc.Manager.Register("pubsub", cfg)
```

## Listener

Use `AddListener` to continuously receive messages in a background goroutine:

```go
subURL, _ := url.Parse("pubsub://my-subscription")

mgr.AddListener(subURL, func(msg messaging.Message) error {
    body, _ := msg.Body()
    fmt.Printf("Received: %s\n", string(body))
    return nil // returning nil auto-acknowledges
})
```
