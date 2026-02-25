---
title: Getting Started
weight: 1
---

Get up and running with Golly in minutes.

## Prerequisites

- **Go 1.24** or later — [Download Go](https://go.dev/dl/)
- A Go module-enabled project (`go.mod`)

## Installation

Add Golly to your Go project:

```bash
go get oss.nandlabs.io/golly
```

This installs the core module. Import only the packages you need — Golly is modular by design.

## Quick Examples

### Logging with L3

```go
package main

import "oss.nandlabs.io/golly/l3"

var logger = l3.Get()

func main() {
    logger.Info("Hello from Golly!")
    logger.Debug("Debug messages are filtered by log level")
    logger.Error("Something went wrong")
}
```

### HTTP Router with Turbo

```go
package main

import (
    "net/http"
    "oss.nandlabs.io/golly/turbo"
)

func main() {
    router := turbo.NewRouter()

    router.Get("/hello", func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("Hello, World!"))
    })

    router.Get("/users/:id", func(w http.ResponseWriter, r *http.Request) {
        id := turbo.PathParam(r, "id")
        w.Write([]byte("User: " + id))
    })

    http.ListenAndServe(":8080", router)
}
```

### Encoding with Codec

```go
package main

import (
    "bytes"
    "fmt"
    "oss.nandlabs.io/golly/codec"
)

type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    // Get the JSON codec
    c, _ := codec.Get("application/json")

    // Encode
    var buf bytes.Buffer
    user := User{Name: "Alice", Email: "alice@example.com"}
    c.Write(&user, &buf)

    fmt.Println(buf.String())

    // Decode
    var decoded User
    c.Read(bytes.NewReader(buf.Bytes()), &decoded)
    fmt.Printf("%+v\n", decoded)
}
```

### UUID Generation

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/uuid"
)

func main() {
    id, _ := uuid.V4()
    fmt.Println("Generated UUID:", id.String())
}
```

### Collections

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/collections"
)

func main() {
    // Stack
    stack := collections.NewStack[string]()
    stack.Push("first")
    stack.Push("second")
    val, _ := stack.Pop()
    fmt.Println("Popped:", val) // "second"

    // Queue
    queue := collections.NewQueue[int]()
    queue.Enqueue(1)
    queue.Enqueue(2)
    item, _ := queue.Dequeue()
    fmt.Println("Dequeued:", item) // 1
}
```

## Project Structure

Golly is organised as a single Go module with independent packages. Import only what you need:

```go
import (
    "oss.nandlabs.io/golly/turbo"       // HTTP routing
    "oss.nandlabs.io/golly/l3"          // Logging
    "oss.nandlabs.io/golly/codec"       // Encoding/decoding
    "oss.nandlabs.io/golly/collections" // Data structures
    "oss.nandlabs.io/golly/genai"       // GenAI provider interface
)
```

Each package is self-contained — no hidden global state or mandatory initialization.

## What's Next?

Explore the package categories to find what you need:

| Category                                                  | What's Inside                                                    |
| --------------------------------------------------------- | ---------------------------------------------------------------- |
| [🔧 Fundamentals]({{< relref "core/fundamentals" >}})     | Assertions, CLI, collections, config, error & function utilities |
| [🗃️ Data & Encoding]({{< relref "core/data-encoding" >}}) | Codec, data containers, semver, text utilities, UUID             |
| [📡 Networking]({{< relref "core/networking" >}})         | HTTP clients, REST server, Turbo router, messaging               |
| [🛠️ Infrastructure]({{< relref "core/infrastructure" >}}) | Filesystem, IO, logging, lifecycle, pools, secrets, VFS          |
| [🤖 AI & Intelligence]({{< relref "core/ai" >}})          | GenAI providers — OpenAI, Claude, Ollama                         |
| [🧪 Testing]({{< relref "core/testing" >}})               | Assertion helpers for unit tests                                 |

For full API reference, visit [pkg.go.dev](https://pkg.go.dev/oss.nandlabs.io/golly).
