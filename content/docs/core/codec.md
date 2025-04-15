---
title: Codec Package
draft: false
prev: /docs/core/clients
next: /docs/core/config
---

The `codec` package provides a unified interface for encoding and decoding structured data formats such as JSON, XML, and YAML. It offers a consistent API for serialization and deserialization operations, along with built-in validation capabilities.

## Features

- **Format Abstraction**: Work with multiple serialization formats using a consistent API
- **Built-in Validation**: Validate data structures during encoding/decoding with annotation-based constraints
- **Extensible Design**: Easily add support for additional data formats
- **Type Safety**: Strong typing for serialization operations

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

### Basic Encoding Example

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
  // Create a message
  m := Message{"TestUser", "Hello", 123124124}

  // Get a codec for JSON
  cd, _ := codec.Get("application/json", nil)

  // Create a buffer to write to
  buf := new(bytes.Buffer)

  // Encode the message
  if err := cd.Write(m, buf); err != nil {
    fmt.Errorf("error in write: %v", err)
  }

  // Use the encoded data
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

// Message with validation constraints
type Message struct {
  Name string `json:"name" constraints:"min-length=5"`
  Body string `json:"body" constraints:"max-length=50"`
  Time int64  `json:"time" constraints:"min=10"`
}

func main() {
  // Create a message
  m := Message{"TestUser", "Hello", 123124124}

  // Get a codec for JSON
  c, _ := codec.Get("application/json", nil)

  // Create a buffer to write to
  buf := new(bytes.Buffer)

  // Encode the message with validation
  if err := c.Write(m, buf); err != nil {
    fmt.Errorf("error in write: %v", err)
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
  // JSON data to decode
  jsonData := []byte(`{"name":"TestUser","body":"Hello","time":123124124}`)

  // Get a codec for JSON
  cd, _ := codec.Get("application/json", nil)

  // Create a buffer with the JSON data
  buf := bytes.NewBuffer(jsonData)

  // Create a variable to decode into
  var m Message

  // Decode the data
  if err := cd.Read(buf, &m); err != nil {
    fmt.Errorf("error in read: %v", err)
  }

  // Use the decoded data
  fmt.Printf("Name: %s, Body: %s, Time: %d\n", m.Name, m.Body, m.Time)
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/codec
```
