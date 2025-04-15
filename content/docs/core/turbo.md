---
title: Turbo Package
draft: false
prev: /docs/core/textutils
next: /docs/core/uuid
---

The `turbo` package provides a high-performance, lightweight HTTP routing framework for Go applications. It offers enterprise-grade routing capabilities with a focus on simplicity, flexibility, and performance.

## Features

- **HTTP Method Routing**: Support for standard HTTP methods (GET, POST, PUT, DELETE)
- **Path Parameters**: Extract values from URL path segments
- **Query Parameters**: Convenient access to query string parameters
- **Middleware Support**: Add custom middleware (filters) to your routes
- **Authentication Filters**: Built-in authentication scheme support
- **Performance Focused**: Designed for high throughput and low latency
- **Modular Design**: Compose different components to meet your needs

## Core Components

### Router

The main router component provides HTTP request routing:

```go
// Create a new router
router := turbo.New()

// Register routes with different HTTP methods
router.Get("/api/users", listUsers)
router.Post("/api/users", createUser)
router.Put("/api/users/:id", updateUser)
router.Delete("/api/users/:id", deleteUser)

// Register a route with multiple HTTP methods
router.Add("/api/resources", handleResources, "GET", "POST")
```

### Path Parameters

Extract values from URL path segments:

```go
// Route with path parameters
router.Get("/api/users/:id", func(w http.ResponseWriter, r *http.Request) {
    // Extract path parameter as string
    id := turbo.GetPathParams("id", r)

    // Or extract with type conversion
    userID := turbo.GetIntPathParams("id", r)

    // Process the request...
})
```

### Query Parameters

Easily access query string parameters with type conversion:

```go
// Access query parameters with different types
func handler(w http.ResponseWriter, r *http.Request) {
    // String parameter
    name := turbo.GetQueryParams("name", r)

    // Integer parameter
    age := turbo.GetIntQueryParams("age", r)

    // Float parameter
    score := turbo.GetFloatQueryParams("score", r)

    // Boolean parameter
    active := turbo.GetBoolQueryParams("active", r)

    // Process the request...
}
```

### Filters (Middleware)

Add custom middleware to your routes:

```go
// Add multiple filters to a route
router.Get("/api/protected", handleProtected).AddFilter(
    loggingFilter,
    metricsFilter,
    rateLimitFilter,
)

// Define a filter function
func loggingFilter(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("Request: %s %s", r.Method, r.URL.Path)
        start := time.Now()

        // Call the next handler in the chain
        next.ServeHTTP(w, r)

        log.Printf("Response time: %v", time.Since(start))
    })
}
```

### Authentication

Add authentication to your routes:

```go
// Add an authenticator to a route
router.Get("/api/admin", handleAdmin).AddAuthenticator(
    auth.CreateBasicAuthAuthenticator(),
)
```

## Usage Examples

### Basic Server

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "time"

    "oss.nandlabs.io/golly/turbo"
)

func main() {
    // Create a new router
    router := turbo.New()

    // Register routes
    router.Get("/", home)
    router.Get("/api/healthcheck", healthcheck)
    router.Get("/api/users", listUsers)
    router.Get("/api/users/:id", getUser)

    // Configure HTTP server
    srv := &http.Server{
        Handler:      router,
        Addr:         ":8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    // Start the server
    log.Println("Server starting on :8080")
    log.Fatal(srv.ListenAndServe())
}

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome to the API")
}

func healthcheck(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "OK")
}

func listUsers(w http.ResponseWriter, r *http.Request) {
    // In a real app, you would fetch users from a database
    fmt.Fprintf(w, "List of users")
}

func getUser(w http.ResponseWriter, r *http.Request) {
    id := turbo.GetPathParams("id", r)
    fmt.Fprintf(w, "User ID: %s", id)
}
```

### Advanced Usage with Middleware

```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
    "time"

    "oss.nandlabs.io/golly/turbo"
    "oss.nandlabs.io/golly/turbo/auth"
)

// User represents a user in the system
type User struct {
    ID       string `json:"id"`
    Username string `json:"username"`
    Email    string `json:"email"`
}

func main() {
    router := turbo.New()

    // Add global middleware
    router.Use(loggingMiddleware)

    // Public routes
    router.Get("/api/public", publicHandler)

    // Protected routes with authentication and additional middleware
    router.Get("/api/users", listUsersHandler).
        AddAuthenticator(auth.CreateBasicAuthAuthenticator()).
        AddFilter(rateLimitMiddleware)

    router.Get("/api/users/:id", getUserHandler).
        AddAuthenticator(auth.CreateBasicAuthAuthenticator())

    // Start server
    srv := &http.Server{
        Handler:      router,
        Addr:         ":8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    log.Println("Server starting on :8080")
    log.Fatal(srv.ListenAndServe())
}

// Middleware functions
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        log.Printf("Started %s %s", r.Method, r.URL.Path)

        next.ServeHTTP(w, r)

        log.Printf("Completed %s %s in %v", r.Method, r.URL.Path, time.Since(start))
    })
}

func rateLimitMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Implement rate limiting logic here
        // For example, check if a client has made too many requests

        next.ServeHTTP(w, r)
    })
}

// Route handlers
func publicHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "message": "This is a public endpoint",
    })
}

func listUsersHandler(w http.ResponseWriter, r *http.Request) {
    // In a real app, fetch users from a database
    users := []User{
        {ID: "1", Username: "user1", Email: "user1@example.com"},
        {ID: "2", Username: "user2", Email: "user2@example.com"},
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
    id := turbo.GetPathParams("id", r)

    // In a real app, fetch user from a database using the ID
    user := User{
        ID:       id,
        Username: "user" + id,
        Email:    "user" + id + "@example.com",
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/turbo
```
