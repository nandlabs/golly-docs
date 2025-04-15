---
title: Testing Package
draft: false
prev: /docs/core/semver
next: /docs/core/textutils
---

The `testing` package provides utilities and helpers for writing and running automated tests in Go applications. It offers enhanced testing capabilities beyond what's available in Go's standard library.

## Features

- **Flexible Assertions**: Comprehensive assertion functions for various data types and conditions
- **Clean Test Output**: Clear and informative test failure messages
- **Extensible Design**: Easy to integrate with existing test frameworks and environments
- **Type-Safe Testing**: Type-specific assertion functions for precise testing
- **Test Helpers**: Utilities to simplify common testing patterns

## Core Components

### Assert

The `assert` subpackage provides a comprehensive set of assertion functions for testing various conditions in Go tests:

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
    // Test a simple addition function
    result := 2 + 2

    // Assert that the result equals 4
    assert.Equal(t, result, 4, "2 + 2 should equal 4")

    // Assert that the result is not equal to 5
    assert.NotEqual(t, result, 5, "2 + 2 should not equal 5")
}
```

### Testing Error Cases

```go
package mypackage_test

import (
    "errors"
    "testing"
    "oss.nandlabs.io/golly/testing/assert"
)

// A function that might return an error
func divideIfPossible(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func TestDivision(t *testing.T) {
    // Test successful division
    result, err := divideIfPossible(10, 2)
    assert.NoError(t, err, "Division by 2 should not error")
    assert.Equal(t, result, 5, "10 / 2 should equal 5")

    // Test division by zero
    result, err := divideIfPossible(10, 0)
    assert.Error(t, err, "Division by zero should return an error")
    assert.Equal(t, err.Error(), "division by zero", "Error message should match")
}
```

### Testing Complex Types

```go
package mypackage_test

import (
    "testing"
    "oss.nandlabs.io/golly/testing/assert"
)

// A simple struct for testing
type Person struct {
    Name string
    Age  int
}

func TestPersonCreation(t *testing.T) {
    // Create a person
    person := Person{
        Name: "Alice",
        Age:  30,
    }

    // Test individual fields
    assert.Equal(t, person.Name, "Alice", "Name should be Alice")
    assert.Equal(t, person.Age, 30, "Age should be 30")

    // Test nil handling
    var nilPerson *Person
    assert.Nil(t, nilPerson, "Uninitialized pointer should be nil")

    // Test not nil
    actualPerson := &Person{Name: "Bob", Age: 25}
    assert.NotNil(t, actualPerson, "Initialized pointer should not be nil")
}
```

### Collections Testing

```go
package mypackage_test

import (
    "testing"
    "oss.nandlabs.io/golly/testing/assert"
)

func TestCollections(t *testing.T) {
    // Test slices
    numbers := []int{1, 2, 3, 4, 5}
    assert.Contains(t, numbers, 3, "Slice should contain 3")

    // Test maps
    people := map[string]int{
        "Alice": 30,
        "Bob":   25,
        "Carol": 35,
    }

    // Test map keys
    assert.Contains(t, people, "Bob", "Map should contain key 'Bob'")

    // Test string contains
    message := "Hello, world!"
    assert.Contains(t, message, "world", "Message should contain 'world'")
}
```

### Custom Failure Messages

```go
package mypackage_test

import (
    "testing"
    "oss.nandlabs.io/golly/testing/assert"
)

func TestWithCustomMessages(t *testing.T) {
    // Test with a basic message
    assert.True(t, 1 < 2, "1 should be less than 2")

    // Test with a formatted message
    x, y := 5, 10
    assert.True(t, x < y, "%d should be less than %d", x, y)

    // Test with additional context
    result := someOperation()
    assert.NoError(t, result.Err, "Operation should complete without errors: %v", result.Context)
}

func someOperation() struct { Err error; Context string } {
    return struct { Err error; Context string }{
        Err:     nil,
        Context: "Example operation",
    }
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/testing
```
