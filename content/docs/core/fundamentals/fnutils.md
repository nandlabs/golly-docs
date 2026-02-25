---
title: Function Utilities
weight: 6
---

The `fnutils` package provides utilities for working with functions in Go. It includes helpers for delayed function execution and other common function-related operations.

## Features

- **Delayed Execution**: Execute functions after specified time intervals
- **Multiple Time Units**: Support for various time units (seconds, milliseconds, minutes)
- **Error Handling**: Consistent error handling for function execution
- **Simple API**: Easy-to-use interface for common function operations

## Core Functions

### Delayed Execution

The package provides several functions for executing a given function after a specific time delay:

- `ExecuteAfterSecs(fn func(), timeout int) error`: Execute a function after the specified number of seconds
- `ExecuteAfterMs(fn func(), timeout int64) error`: Execute a function after the specified number of milliseconds
- `ExecuteAfterMin(fn func(), timeout int) error`: Execute a function after the specified number of minutes
- `ExecuteAfter(fn func(), timeout time.Duration) error`: Base function that executes a function after the specified time duration

## Usage Examples

### Basic Delayed Execution

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/fnutils"
)

func main() {
    // Execute a function after 5 seconds
    err := fnutils.ExecuteAfterSecs(func() {
        fmt.Println("This will be printed after 5 seconds")
    }, 5)

    if err != nil {
        fmt.Printf("Error: %v\n", err)
    }

    // Keep the program running
    fmt.Println("Waiting...")
    // In a real application, you might wait using another mechanism
}
```

### Using Different Time Units

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/fnutils"
)

func main() {
    // Execute after 2000 milliseconds (2 seconds)
    fnutils.ExecuteAfterMs(func() {
        fmt.Println("Executed after 2000 milliseconds")
    }, 2000)

    // Execute after 1 minute
    fnutils.ExecuteAfterMin(func() {
        fmt.Println("Executed after 1 minute")
    }, 1)

    // Keep the program running
    fmt.Println("Waiting...")
    // In a real application, you might wait using another mechanism
}
```

### Error Handling

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/fnutils"
)

func main() {
    // Invalid cases
    err1 := fnutils.ExecuteAfterSecs(nil, 5) // Nil function
    if err1 != nil {
        fmt.Printf("Error 1: %v\n", err1) // Expected: "nil function provided"
    }

    err2 := fnutils.ExecuteAfterSecs(func() {
        fmt.Println("This won't execute")
    }, -10) // Negative timeout

    if err2 != nil {
        fmt.Printf("Error 2: %v\n", err2) // Expected: "timeout cannot be negative"
    }
}
```

### Practical Applications

```go
package main

import (
    "fmt"
    "time"
    "oss.nandlabs.io/golly/fnutils"
)

func main() {
    fmt.Println("Starting a simulated task...")

    // Simulate starting a task
    taskStart := time.Now()

    // Set up a delayed function to check on the task after 3 seconds
    fnutils.ExecuteAfterSecs(func() {
        elapsed := time.Since(taskStart)
        fmt.Printf("Task has been running for %v\n", elapsed)

        // Check some condition
        if elapsed > 2*time.Second {
            fmt.Println("Task is progressing normally")
        } else {
            fmt.Println("Task might be running slowly")
        }
    }, 3)

    // Keep the program running
    fmt.Println("Waiting for the check...")
    time.Sleep(5 * time.Second)
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/fnutils
```
