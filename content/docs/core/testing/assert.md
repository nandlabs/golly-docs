---
title: Assert
draft: false
weight: 1
---

The `testing/assert` package is a flexible and extensible assertion library designed to provide a unified interface for asserting conditions in Go tests. It allows developers to integrate assertion functionality without being tied to a specific assertion library.

## Installation

```bash
go get oss.nandlabs.io/golly/testing/assert
```

## Features

- General assertion interface for asserting conditions in tests
- Supports various assertion functions for different types of conditions
- Easy-to-use functions for consistent handling of assertions
- Clear failure messages with optional formatting

## Usage

1. Import the library into your Go test file:

   ```go
   import "oss.nandlabs.io/golly/testing/assert"
   ```

2. Use the assertion functions in your test cases:

   ```go
   func TestAdd(t *testing.T) {
       result := add(1, 2)
       assert.Equal(t, result, 3)
   }
   ```

3. Run your tests:
   ```bash
   go test
   ```

## Available Assertions

| Function   | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `Equal`    | Asserts two values are equal                               |
| `NotEqual` | Asserts two values are not equal                           |
| `True`     | Asserts a value is true                                    |
| `False`    | Asserts a value is false                                   |
| `Nil`      | Asserts a value is nil                                     |
| `NotNil`   | Asserts a value is not nil                                 |
| `Contains` | Asserts a string, array, slice, or map contains an element |
| `NoError`  | Asserts an error is nil                                    |
| `Error`    | Asserts an error is not nil                                |

## Examples

### Struct Testing

```go
type Person struct {
    Name string
    Age  int
}

func TestPersonCreation(t *testing.T) {
    person := Person{Name: "Alice", Age: 30}
    assert.Equal(t, person.Name, "Alice", "Name should be Alice")
    assert.Equal(t, person.Age, 30, "Age should be 30")

    var nilPerson *Person
    assert.Nil(t, nilPerson, "Uninitialized pointer should be nil")

    actualPerson := &Person{Name: "Bob", Age: 25}
    assert.NotNil(t, actualPerson, "Initialized pointer should not be nil")
}
```

### Error Handling

```go
func TestErrorHandling(t *testing.T) {
    _, err := riskyOperation()
    assert.NoError(t, err, "operation should succeed")

    _, err = failingOperation()
    assert.Error(t, err, "operation should fail")
    assert.Equal(t, err.Error(), "expected failure")
}
```
