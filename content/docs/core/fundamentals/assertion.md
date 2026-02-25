---
title: Assertion
weight: 1
---

The `assertion` package provides a flexible and extensible assertion library designed to facilitate consistent testing practices in Go projects. It offers a unified interface for asserting conditions in tests with helpful error messages.

## Features

- Simple and intuitive API for common assertions
- Comprehensive set of assertion functions for various data types and scenarios
- Detailed error messages that help identify test failures quickly
- Clean integration with Go's testing package

## Core Functions

### Basic Assertions

- **Equal** - Checks if two values are equal
- **NotEqual** - Checks if two values are not equal
- **True** - Asserts that a condition is true
- **False** - Asserts that a condition is false
- **Nil** - Checks if a value is nil
- **NotNil** - Checks if a value is not nil

### Collection Assertions

- **ListHas** - Checks if a list contains a value
- **ListMissing** - Checks if a list does not contain a value
- **Empty** - Checks if an object is empty
- **NotEmpty** - Checks if an object is not empty
- **Len** - Verifies the length of an object
- **ElementsMatch** - Checks if the elements of a list match the expected elements

### Map Assertions

- **MapContains** - Checks if a map contains a key-value pair
- **MapMissing** - Checks if a map does not contain a key-value pair
- **HasValue** - Checks if a map contains a value

## Usage Examples

### Basic Equality Check

```go
package main

import (
    "fmt"
    "github.com/nandlabs/golly/assertion"
)

func main() {
    a := 5
    b := 5
    if assertion.Equal(a, b) {
        fmt.Println("Values are equal")
    } else {
        fmt.Println("Values are not equal")
    }
}
```

### Collection Operations

```go
package main

import (
    "fmt"
    "github.com/nandlabs/golly/assertion"
)

func main() {
    list := []int{1, 2, 3, 4, 5}

    // Check if list contains a value
    if assertion.ListHas(3, list) {
        fmt.Println("List contains the value 3")
    }

    // Check if list has expected length
    if assertion.Len(list, 5) {
        fmt.Println("List has 5 elements")
    }
}
```

### Map Operations

```go
package main

import (
    "fmt"
    "github.com/nandlabs/golly/assertion"
)

func main() {
    m := map[string]interface{}{"key1": "value1", "key2": "value2"}

    // Check if map contains a key-value pair
    if assertion.MapContains(m, "key1", "value1") {
        fmt.Println("Map contains the key-value pair")
    }
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/assertion
```
