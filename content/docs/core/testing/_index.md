---
title: Testing Package
draft: false
prev: /docs/core/semver
next: /docs/core/textutils
---

The `testing` package provides utilities and helpers for writing and running automated tests in Go applications. It offers enhanced testing capabilities beyond what's available in Go's standard library.

## Installation

```bash
go get oss.nandlabs.io/golly/testing
```

## Features

- **Flexible Assertions**: Comprehensive assertion functions for various data types and conditions
- **Clean Test Output**: Clear and informative test failure messages
- **Extensible Design**: Easy to integrate with existing test frameworks
- **Type-Safe Testing**: Type-specific assertion functions for precise testing

## Sub-packages

- [Assert]({{< relref "assert" >}}) — Assertion library for consistent, expressive tests

## Core Components

### Assert

The `assert` subpackage provides a comprehensive set of assertion functions:

```go
// Equal asserts that two values are equal
func Equal(t TestingT, actual, expected interface{}, msgAndArgs ...interface{})

// NotEqual asserts that two values are not equal
func NotEqual(t TestingT, actual, expected interface{}, msgAndArgs ...interface{})

// True asserts that a value is true
func True(t TestingT, value bool, msgAndArgs ...interface{})

// False asserts that a value is false
func False(t TestingT, value bool, msgAndArgs ...interface{})

// Nil asserts that a value is nil
func Nil(t TestingT, object interface{}, msgAndArgs ...interface{})

// NotNil asserts that a value is not nil
func NotNil(t TestingT, object interface{}, msgAndArgs ...interface{})

// Contains asserts that a string, array, slice, or map contains an element
func Contains(t TestingT, haystack, needle interface{}, msgAndArgs ...interface{})

// NoError asserts that an error is nil
func NoError(t TestingT, err error, msgAndArgs ...interface{})

// Error asserts that an error is not nil
func Error(t TestingT, err error, msgAndArgs ...interface{})
```

## Usage Examples

### Basic Assertions

```go
package mypackage_test

import (
    "testing"
    "oss.nandlabs.io/golly/testing/assert"
)

func TestAddition(t *testing.T) {
    result := 2 + 2
    assert.Equal(t, result, 4, "2 + 2 should equal 4")
    assert.NotEqual(t, result, 5, "2 + 2 should not equal 5")
}
```

### Testing Error Cases

```go
func TestDivision(t *testing.T) {
    result, err := divideIfPossible(10, 2)
    assert.NoError(t, err, "Division by 2 should not error")
    assert.Equal(t, result, 5, "10 / 2 should equal 5")

    _, err = divideIfPossible(10, 0)
    assert.Error(t, err, "Division by zero should return an error")
}
```

### Collections Testing

```go
func TestCollections(t *testing.T) {
    numbers := []int{1, 2, 3, 4, 5}
    assert.Contains(t, numbers, 3, "Slice should contain 3")

    people := map[string]int{"Alice": 30, "Bob": 25}
    assert.Contains(t, people, "Bob", "Map should contain key 'Bob'")

    message := "Hello, world!"
    assert.Contains(t, message, "world", "Message should contain 'world'")
}
```

### Custom Failure Messages

```go
func TestWithCustomMessages(t *testing.T) {
    assert.True(t, 1 < 2, "1 should be less than 2")

    x, y := 5, 10
    assert.True(t, x < y, "%d should be less than %d", x, y)
}
```
