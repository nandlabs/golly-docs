---
title: Lifecycle
weight: 4
---

The `lifecycle` package provides a framework for managing the lifecycle of application components in Go. It offers a structured approach to starting and stopping components in a controlled manner, ensuring proper initialization and cleanup.

## Features

- **Component Management**: Register and manage multiple application components
- **Controlled Startup**: Start components in a specific order, handling dependencies
- **Graceful Shutdown**: Stop components in the reverse order of startup
- **Error Handling**: Proper propagation of errors during startup and shutdown
- **Simple API**: Easy-to-use interface for lifecycle management

## Core Components

### Component Interface

The central element of the package is the `Component` interface, which defines the contract for any component that needs lifecycle management:

```go
type Component interface {
    Start() error
    Stop() error
}
```

Any struct implementing these two methods can be managed by the lifecycle package.

### Lifecycle Manager

The package provides a lifecycle manager that coordinates the starting and stopping of components:

```go
type Lifecycle struct {
    // internal fields omitted
}

// Methods:
// AddComponent(component Component)
// Start() error
// Stop() error
```

## Usage Examples

### Using the SimpleComponent

The package includes a `SimpleComponent` implementation that can be used as a reference or for basic scenarios:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/lifecycle"
)

func main() {
    // Create a lifecycle manager
    lc := &lifecycle.Lifecycle{}

    // Create and add a simple component
    simpleComponent := &lifecycle.SimpleComponent{
        Name: "ExampleComponent",
        StartFunc: func() error {
            fmt.Println("Component started")
            return nil
        },
        StopFunc: func() error {
            fmt.Println("Component stopped")
            return nil
        },
    }

    lc.AddComponent(simpleComponent)

    // Start all components
    if err := lc.Start(); err != nil {
        fmt.Printf("Failed to start components: %v\n", err)
        return
    }

    // Application runs here...
    fmt.Println("Application is running")

    // Stop all components in reverse order
    if err := lc.Stop(); err != nil {
        fmt.Printf("Failed to stop components: %v\n", err)
    }
}
```

### Creating Custom Components

You can create custom components by implementing the `Component` interface:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/lifecycle"
)

// DatabaseConnection represents a component that manages a database connection
type DatabaseConnection struct {
    connectionString string
    isConnected      bool
}

// Start establishes the database connection
func (db *DatabaseConnection) Start() error {
    fmt.Printf("Connecting to database at %s\n", db.connectionString)
    // In a real implementation, this would actually establish a connection
    db.isConnected = true
    return nil
}

// Stop closes the database connection
func (db *DatabaseConnection) Stop() error {
    if (db.isConnected) {
        fmt.Println("Closing database connection")
        db.isConnected = false
    }
    return nil
}

func main() {
    // Create a lifecycle manager
    lc := &lifecycle.Lifecycle{}

    // Create and add our custom component
    dbConn := &DatabaseConnection{
        connectionString: "postgres://localhost:5432/mydb",
    }

    lc.AddComponent(dbConn)

    // Start all components
    if err := lc.Start(); err != nil {
        fmt.Printf("Failed to start components: %v\n", err)
        return
    }

    // Use the database connection here...
    fmt.Println("Application is using the database connection")

    // Stop all components
    if err := lc.Stop(); err != nil {
        fmt.Printf("Failed to stop components: %v\n", err)
    }
}
```

### Managing Multiple Components

The lifecycle package excels at managing multiple interdependent components:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/lifecycle"
)

// Define custom components
type ConfigService struct{}
type DatabaseService struct{}
type CacheService struct{}
type APIServer struct{}

// Implement Start and Stop methods for each component
// (implementation details omitted for brevity)

func main() {
    // Create a lifecycle manager
    lc := &lifecycle.Lifecycle{}

    // Create components
    config := &ConfigService{}
    db := &DatabaseService{}
    cache := &CacheService{}
    api := &APIServer{}

    // Add components in the order they should start
    // They will be stopped in reverse order
    lc.AddComponent(config)  // First to start, last to stop
    lc.AddComponent(db)      // Depends on config
    lc.AddComponent(cache)   // Depends on config
    lc.AddComponent(api)     // Depends on db and cache, last to start, first to stop

    // Start all components
    if err := lc.Start(); err != nil {
        fmt.Printf("Failed to start application: %v\n", err)
        return
    }

    fmt.Println("Application is running")

    // Stop all components in reverse order
    if err := lc.Stop(); err != nil {
        fmt.Printf("Error during shutdown: %v\n", err)
    }

    fmt.Println("Application stopped gracefully")
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/lifecycle
```
