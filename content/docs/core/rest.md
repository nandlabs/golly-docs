---
title: REST Package
draft: false
prev: /docs/core/pool
next: /docs/core/secrets
---

The `rest` package provides a comprehensive toolkit for building and consuming RESTful APIs in Go. It offers both client and server implementations with a rich set of features for building robust, production-ready web services.

## Features

### Client Features

- **HTTP Methods**: Support for GET, POST, PUT, DELETE and other standard methods
- **Request Configuration**: Easy setup of headers, query parameters, and body content
- **Resilience Features**: Built-in retry and circuit breaker capabilities
- **TLS Configuration**: Secure communication with custom certificates
- **Proxy Support**: Configure proxies for HTTP requests
- **Transport Layer Configuration**: Fine-tune connection timeouts and pooling

### Server Features

- **Routing**: Simple API for defining routes with different HTTP methods
- **Path Parameters**: Support for route parameters (e.g., `/users/:id`)
- **Query Parameters**: Easy access to query string parameters
- **Request Context**: Context object that provides access to request data and response writing
- **Lifecycle Management**: Integration with the `lifecycle` package for managing server startup and shutdown
- **TLS Support**: Secure your API with HTTPS

## Core Components

### Client Components

- **Client**: Main client object for executing HTTP requests
- **Request**: Represents an HTTP request with its associated configuration
- **Response**: Encapsulates the response from an HTTP request

### Server Components

- **Server**: Main server object for defining routes and handling requests
- **ServerContext**: Context object provided to request handlers with access to request data and response writing
- **ServerOptions**: Configuration options for the server (e.g., address, timeouts)

## Usage Examples

### Client Usage

#### Basic GET Request

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/rest"
)

func main() {
    // Create a new client
    client := rest.NewClient()

    // Create a new request
    req := client.NewRequest("https://api.example.com/users", "GET")

    // Add headers
    req.AddHeader("Accept", "application/json")

    // Add query parameters
    req.AddParam("page", "1")
    req.AddParam("limit", "10")

    // Execute the request
    res, err := client.Execute(req)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // Check status code
    if res.StatusCode() != 200 {
        fmt.Printf("Unexpected status code: %d\n", res.StatusCode())
        return
    }

    // Get the response body
    body := res.GetBody()
    fmt.Printf("Response: %s\n", string(body))
}
```

#### POST Request with JSON Body

```go
package main

import (
    "encoding/json"
    "fmt"
    "oss.nandlabs.io/golly/rest"
)

type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    // Create a new client
    client := rest.NewClient()

    // Create a new POST request
    req := client.NewRequest("https://api.example.com/users", "POST")

    // Set headers
    req.AddHeader("Content-Type", "application/json")
    req.AddHeader("Accept", "application/json")

    // Create and set the request body
    user := User{
        Name:  "John Doe",
        Email: "john@example.com",
    }

    userData, _ := json.Marshal(user)
    req.SetBody(userData)

    // Execute the request
    res, err := client.Execute(req)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    // Handle the response
    if res.StatusCode() == 201 {
        fmt.Println("User created successfully")
    } else {
        fmt.Printf("Error creating user: %s\n", string(res.GetBody()))
    }
}
```

#### Client with Retry and Circuit Breaker

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/rest"
)

func main() {
    // Create a new client
    client := rest.NewClient()

    // Configure retry (max retries = 3, wait time = 5 seconds)
    client.Retry(3, 5)

    // Configure circuit breaker
    // (failure threshold = 3, success threshold = 2, max half-open = 1, timeout = 30 seconds)
    client.UseCircuitBreaker(3, 2, 1, 30)

    // Create and execute a request
    req := client.NewRequest("https://api.example.com/data", "GET")
    res, err := client.Execute(req)

    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }

    fmt.Printf("Response: %s\n", string(res.GetBody()))
}
```

### Server Usage

#### Basic Server with Multiple Endpoints

```go
package main

import (
    "encoding/json"
    "net/http"

    "oss.nandlabs.io/golly/lifecycle"
    "oss.nandlabs.io/golly/rest"
)

type User struct {
    ID   string `json:"id"`
    Name string `json:"name"`
}

func main() {
    // Create a new server
    srv, err := rest.DefaultServer()
    if err != nil {
        panic(err)
    }

    // Configure the server
    srv.Opts().PathPrefix = "/api/v1"

    // Define a GET endpoint
    srv.Get("users", func(ctx rest.ServerContext) {
        // Mock data
        users := []User{
            {ID: "1", Name: "Alice"},
            {ID: "2", Name: "Bob"},
        }

        // Convert to JSON
        data, err := json.Marshal(users)
        if err != nil {
            ctx.SetStatusCode(http.StatusInternalServerError)
            ctx.WriteString("Error marshaling data")
            return
        }

        // Set response headers
        ctx.SetHeader("Content-Type", "application/json")

        // Write response
        ctx.SetStatusCode(http.StatusOK)
        ctx.Write(data)
    })

    // Define a GET endpoint with path parameter
    srv.Get("users/:id", func(ctx rest.ServerContext) {
        // Get path parameter
        id := ctx.GetParam("id", rest.PathParam)

        // Mock data retrieval
        var user User
        if id == "1" {
            user = User{ID: "1", Name: "Alice"}
        } else if id == "2" {
            user = User{ID: "2", Name: "Bob"}
        } else {
            ctx.SetStatusCode(http.StatusNotFound)
            ctx.WriteString("User not found")
            return
        }

        // Convert to JSON
        data, err := json.Marshal(user)
        if err != nil {
            ctx.SetStatusCode(http.StatusInternalServerError)
            ctx.WriteString("Error marshaling data")
            return
        }

        // Set response
        ctx.SetHeader("Content-Type", "application/json")
        ctx.SetStatusCode(http.StatusOK)
        ctx.Write(data)
    })

    // Define a POST endpoint
    srv.Post("users", func(ctx rest.ServerContext) {
        // Get request body
        body, err := ctx.GetBody()
        if err != nil {
            ctx.SetStatusCode(http.StatusBadRequest)
            ctx.WriteString("Error reading request body")
            return
        }

        // Parse the user data
        var newUser User
        err = json.Unmarshal(body, &newUser)
        if err != nil {
            ctx.SetStatusCode(http.StatusBadRequest)
            ctx.WriteString("Invalid user data")
            return
        }

        // In a real app, you would save the user here

        // Return the created user
        ctx.SetHeader("Content-Type", "application/json")
        ctx.SetStatusCode(http.StatusCreated)
        ctx.Write(body)
    })

    // Create a lifecycle manager
    mgr := lifecycle.NewSimpleComponentManager()

    // Register the server with the lifecycle manager
    mgr.Register(srv)

    // Start the server and wait for signals
    mgr.StartAndWait()
}
```

#### Server with Custom Configuration

```go
package main

import (
    "net/http"

    "oss.nandlabs.io/golly/lifecycle"
    "oss.nandlabs.io/golly/rest"
)

func main() {
    // Create server options
    opts := &rest.SrvOptions{
        Host:         "localhost",
        Port:         8443,
        ReadTimeout:  30,  // seconds
        WriteTimeout: 30,  // seconds
        UseTLS:       true,
        CertFile:     "server.crt",
        KeyFile:      "server.key",
        PathPrefix:   "/api/v2",
    }

    // Create a new server with custom options
    srv, err := rest.New(opts)
    if err != nil {
        panic(err)
    }

    // Add middleware-like functionality
    srv.Before(func(ctx rest.ServerContext) bool {
        // Log all requests
        fmt.Printf("Request: %s %s\n", ctx.Method(), ctx.Path())

        // Check authentication
        authHeader := ctx.GetHeader("Authorization")
        if authHeader == "" {
            ctx.SetStatusCode(http.StatusUnauthorized)
            ctx.WriteString("Authentication required")
            return false  // Stop handling
        }

        return true  // Continue handling
    })

    // Add routes
    srv.Get("healthz", func(ctx rest.ServerContext) {
        ctx.SetStatusCode(http.StatusOK)
        ctx.WriteString("OK")
    })

    // Create lifecycle manager and start
    mgr := lifecycle.NewSimpleComponentManager()
    mgr.Register(srv)
    mgr.StartAndWait()
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/rest
```
