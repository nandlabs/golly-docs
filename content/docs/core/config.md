---
title: Config Package
draft: false
prev: /docs/core/codec
next: /docs/core/data
---

The `config` package provides a comprehensive configuration management system for Go applications. It offers a unified interface for loading, accessing, and manipulating configuration data from various sources such as environment variables, files, and in-memory stores.

## Features

- **Multiple Data Sources**: Load configuration from files, environment variables, or programmatically
- **Type-Safe Access**: Get configuration values as specific types (string, int, float, bool)
- **Default Values**: Specify fallback values when configuration keys are missing
- **Dynamic Configuration**: Update configuration values at runtime
- **Persistence**: Save configuration changes back to storage

## Core Components

### Configuration Interface

The core of the package is the `Configuration` interface, which provides methods for loading, saving, and accessing configuration values:

```go
type Configuration interface {
    Load(r io.Reader) error
    Save(w io.Writer) error
    Get(k, defaultVal string) string
    GetAsInt(k string, defaultVal int) (int, error)
    GetAsInt64(k string, defaultVal int64) (int64, error)
    GetAsBool(k string, defaultVal bool) (bool, error)
    GetAsDecimal(k string, defaultVal float64) (float64, error)
    Put(k, v string) string
    PutInt(k string, v int) (int, error)
    PutInt64(k string, v int64) (int64, error)
    PutBool(k string, v bool) (bool, error)
    PutDecimal(k string, v float64) (float64, error)
}
```

### Implementation Types

The package includes several concrete implementations of the Configuration interface:

- **Properties**: Manages configuration as key-value pairs, typically loaded from properties files
- **MapAttributes**: Stores configuration in an in-memory map
- **Environment**: Accesses configuration from environment variables

## Usage Examples

### Loading Configuration from a File

```go
package main

import (
    "fmt"
    "os"
    "oss.nandlabs.io/golly/config"
)

func main() {
    // Create a new Properties configuration
    conf := config.NewProperties()

    // Open the configuration file
    file, err := os.Open("config.properties")
    if err != nil {
        fmt.Printf("Error opening config file: %v\n", err)
        return
    }
    defer file.Close()

    // Load the configuration
    if err := conf.Load(file); err != nil {
        fmt.Printf("Error loading config: %v\n", err)
        return
    }

    // Access configuration values
    serverHost := conf.Get("server.host", "localhost")
    serverPort, _ := conf.GetAsInt("server.port", 8080)

    fmt.Printf("Server: %s:%d\n", serverHost, serverPort)
}
```

### Creating and Modifying Configuration

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/config"
)

func main() {
    // Create a new in-memory configuration
    conf := config.NewMapAttributes()

    // Set configuration values
    conf.Put("app.name", "MyApp")
    conf.PutInt("app.version.major", 1)
    conf.PutInt("app.version.minor", 2)
    conf.PutBool("app.debug", true)

    // Access configuration values
    appName := conf.Get("app.name", "")
    majorVersion, _ := conf.GetAsInt("app.version.major", 0)
    minorVersion, _ := conf.GetAsInt("app.version.minor", 0)
    debugMode, _ := conf.GetAsBool("app.debug", false)

    fmt.Printf("%s v%d.%d (Debug: %t)\n", appName, majorVersion, minorVersion, debugMode)
}
```

### Using Environment Variables

```go
package main

import (
    "fmt"
    "os"
    "oss.nandlabs.io/golly/config"
)

func main() {
    // Set some environment variables for demonstration
    os.Setenv("APP_HOST", "example.com")
    os.Setenv("APP_PORT", "9000")

    // Create a configuration that reads from environment variables
    conf := config.NewEnvironment()

    // Access configuration from environment variables
    host := conf.Get("APP_HOST", "localhost")
    port, _ := conf.GetAsInt("APP_PORT", 8080)

    fmt.Printf("Application will run on %s:%d\n", host, port)
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/config
```
