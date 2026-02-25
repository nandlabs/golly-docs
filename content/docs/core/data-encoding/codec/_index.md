---
title: Codec
weight: 1
sidebar:
  open: true
---

The `codec` package provides a unified interface for encoding and decoding structured data formats such as JSON, XML, and YAML. It offers a consistent API for serialization and deserialization operations, along with built-in validation capabilities.

## Installation

```bash
go get oss.nandlabs.io/golly/codec
```

## Features

- **Format Abstraction**: Work with multiple serialization formats using a consistent API
- **Built-in Validation**: Validate data structures during encoding/decoding with annotation-based constraints
- **Extensible Design**: Easily add support for additional data formats
- **Type Safety**: Strong typing for serialization operations

## Sub-packages

- [Validator]({{< relref "validator" >}}) — Struct validation using OAS-inspired constraint tags

## Supported Formats

| Format | Status    |
| ------ | --------- |
| JSON   | Supported |
| YAML   | Supported |
| XML    | Supported |

## Core Concepts

### Codec Interface

The package provides a `Codec` interface that abstracts away the details of different serialization formats, allowing you to work with multiple formats through a consistent API.

### Validation

The codec package integrates validation capabilities through constraint annotations. This allows you to validate your data structures during encoding and decoding operations, ensuring that your data meets specific requirements.

## Usage Examples

### Basic Encoding

```go
package main

import (
    "bytes"
    "fmt"
    "oss.nandlabs.io/golly/codec"
)

type Message struct {
    Name string `json:"name"`
    Body string `json:"body"`
    Time int64  `json:"time"`
}

func main() {
    m := Message{"TestUser", "Hello", 123124124}

    // Get a codec for JSON
    cd, _ := codec.Get("application/json", nil)

    buf := new(bytes.Buffer)
    if err := cd.Write(m, buf); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println(buf.String())
}
```

### Validation Example

```go
package main

import (
    "bytes"
    "fmt"
    "oss.nandlabs.io/golly/codec"
)

type Message struct {
    Name string `json:"name" constraints:"min-length=5"`
    Body string `json:"body" constraints:"max-length=50"`
    Time int64  `json:"time" constraints:"min=10"`
}

func main() {
    m := Message{"TestUser", "Hello", 123124124}

    c, _ := codec.Get("application/json", nil)
    buf := new(bytes.Buffer)
    if err := c.Write(m, buf); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Println("Message validated and encoded successfully")
}
```

### Decoding Example

```go
package main

import (
    "bytes"
    "fmt"
    "oss.nandlabs.io/golly/codec"
)

type Message struct {
    Name string `json:"name"`
    Body string `json:"body"`
    Time int64  `json:"time"`
}

func main() {
    jsonData := []byte(`{"name":"TestUser","body":"Hello","time":123124124}`)

    cd, _ := codec.Get("application/json", nil)
    buf := bytes.NewBuffer(jsonData)
    var m Message
    if err := cd.Read(buf, &m); err != nil {
        fmt.Println("error:", err)
    }
    fmt.Printf("Name: %s, Body: %s, Time: %d\n", m.Name, m.Body, m.Time)
}
```
