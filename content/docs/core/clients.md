---
title: Clients Package
draft: false
prev: /docs/core/cli
next: /docs/core/collections
---

The `clients` package provides utility features for building robust and resilient client implementations in Go. It includes essential patterns for creating fault-tolerant applications that can gracefully handle communication failures with external services.

## Features

- **Retry Handling**: Configurable retry logic to handle transient errors
- **Circuit Breaker Pattern**: Prevent cascading failures by stopping requests to failing services
- **Authentication Support**: Common authentication mechanisms for client applications
- **Extensible Client Options**: Flexible configuration for different client types

## Core Components

### RetryHandler

The RetryHandler allows you to configure retry logic for your client operations. This is particularly useful for handling transient errors and ensuring that your client can recover from temporary failures.

#### Configuration Parameters

- **MaxRetries**: Maximum number of retry attempts
- **Wait**: Time to wait between retry attempts (in milliseconds)

### CircuitBreaker

The CircuitBreaker pattern helps prevent cascading failures by stopping requests to a failing service. It transitions between different states based on the success or failure of requests:

- **Closed**: Normal operation, requests flow through
- **Open**: Requests are blocked to prevent further failures
- **Half-Open**: Limited requests allowed to test if the service has recovered

#### Configuration Parameters

- **FailureThreshold**: Number of consecutive failures required to open the circuit
- **SuccessThreshold**: Number of consecutive successes required to close the circuit
- **MaxHalfOpen**: Maximum number of requests allowed in the half-open state
- **Timeout**: Timeout duration (in seconds) for the circuit to transition from open to half-open state

## Usage Examples

### RetryHandler Example

```go
package main

import (
    "fmt"
    "time"
    "oss.nandlabs.io/golly/clients"
)

func main() {
    retryInfo := clients.RetryInfo{
        MaxRetries: 3,
        Wait:       1000, // Wait time in milliseconds
    }

    for i := 0; i < retryInfo.MaxRetries; i++ {
        err := performOperation()
        if err == nil {
            fmt.Println("Operation succeeded")
            break
        }
        fmt.Printf("Operation failed: %v. Retrying...\n", err)
        time.Sleep(time.Duration(retryInfo.Wait) * time.Millisecond)
    }
}

func performOperation() error {
    // Simulate an operation that may fail
    return fmt.Errorf("simulated error")
}
```

### CircuitBreaker Example

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/clients"
)

func main() {
    breakerInfo := &clients.BreakerInfo{
        FailureThreshold: 3,
        SuccessThreshold: 3,
        MaxHalfOpen:      5,
        Timeout:          300, // Timeout in seconds
    }

    cb := clients.NewCB(breakerInfo)

    for i := 0; i < 10; i++ {
        err := cb.CanExecute()
        if err != nil {
            fmt.Println("Circuit breaker is open. Cannot execute operation.")
            continue
        }

        err = performOperation()
        cb.OnExecution(err == nil)
        if err != nil {
            fmt.Printf("Operation failed: %v\n", err)
        } else {
            fmt.Println("Operation succeeded")
        }
    }
}

func performOperation() error {
    // Simulate an operation that may fail
    return fmt.Errorf("simulated error")
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/clients
```
