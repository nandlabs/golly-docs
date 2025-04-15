---
title: Error Utilities
draft: false
prev: /docs/core/data
next: /docs/core/fnutils
---

The `errutils` package provides enhanced error handling capabilities for Go applications. It offers utilities for working with multiple errors simultaneously and creating custom error types with consistent formatting.

## Features

- **Multiple Error Handling**: Collect and manage multiple errors as a single entity
- **Thread Safety**: Concurrent-safe error collection
- **Custom Error Templates**: Create reusable error templates with consistent formatting
- **Error Type Checking**: Check for specific error types within a collection of errors
- **Simple API**: Easy-to-use interface for common error handling scenarios

## Core Components

### MultiError

The `MultiError` type provides a way to collect and manage multiple errors:

```go
type MultiError struct {
    // internal fields omitted
}
```

**Key Methods**:

- `Add(err error)`: Adds an error to the collection (nil errors are ignored)
- `GetAll() []error`: Returns all collected errors
- `Error() string`: Implements the error interface, returns all errors as a newline-separated string
- `HasErrors() bool`: Checks if any errors are present
- `HasError(err error) bool`: Checks if a specific error type is present in the collection

### CustomError

The `CustomError` type provides a template-based approach to creating consistent error messages:

```go
type CustomError struct {
    // internal fields omitted
}
```

**Key Methods**:

- `Err(params ...any) error`: Creates a new error using the template and provided parameters

## Usage Examples

### Working with Multiple Errors

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/errutils"
    "errors"
)

func main() {
    // Create a new multi-error
    multiErr := errutils.NewMultiErr(nil)

    // Add some errors
    multiErr.Add(errors.New("first error"))
    multiErr.Add(errors.New("second error"))

    // Skip nil errors (they won't be added)
    multiErr.Add(nil)

    // Check if there are any errors
    if multiErr.HasErrors() {
        fmt.Println("Collected errors:")
        fmt.Println(multiErr.Error())
    }

    // Get all errors for custom handling
    allErrors := multiErr.GetAll()
    fmt.Printf("Number of errors: %d\n", len(allErrors))

    // Error type checking
    specificErr := errors.New("specific error")
    multiErr.Add(specificErr)

    if multiErr.HasError(specificErr) {
        fmt.Println("Found the specific error")
    }
}
```

### Using Custom Error Templates

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/errutils"
)

func main() {
    // Create reusable error templates
    notFoundErr := errutils.NewCustomError("resource %s not found")
    invalidParamErr := errutils.NewCustomError("invalid parameter: %s (must be %v)")

    // Use the templates to create specific errors
    userNotFoundErr := notFoundErr.Err("user")
    fmt.Println(userNotFoundErr) // Output: resource user not found

    invalidAgeErr := invalidParamErr.Err("age", "greater than 0")
    fmt.Println(invalidAgeErr) // Output: invalid parameter: age (must be greater than 0)
}
```

### Combining Multiple Errors with Custom Errors

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/errutils"
)

func validateUser(name string, age int) *errutils.MultiError {
    validationErr := errutils.NewMultiErr(nil)

    // Create error templates
    requiredFieldErr := errutils.NewCustomError("required field missing: %s")
    invalidValueErr := errutils.NewCustomError("invalid value for %s: %v")

    // Validate name
    if name == "" {
        validationErr.Add(requiredFieldErr.Err("name"))
    }

    // Validate age
    if age <= 0 {
        validationErr.Add(invalidValueErr.Err("age", age))
    }

    return validationErr
}

func main() {
    // Valid user
    err1 := validateUser("John", 30)
    if !err1.HasErrors() {
        fmt.Println("User 1 is valid")
    }

    // Invalid user
    err2 := validateUser("", -5)
    if err2.HasErrors() {
        fmt.Println("User 2 validation errors:")
        fmt.Println(err2.Error())
    }
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/errutils
```
