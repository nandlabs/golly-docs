---
title: Turbo Package
weight: 3
sidebar:
  open: true
---

The `turbo` package provides a high-performance, lightweight HTTP routing framework for Go applications. It offers enterprise-grade routing capabilities with a focus on simplicity, flexibility, and performance.

## Installation

```bash
go get oss.nandlabs.io/golly/turbo
```

## Features

- **HTTP Method Routing**: Support for standard HTTP methods (GET, POST, PUT, DELETE)
- **Path Parameters**: Extract values from URL path segments
- **Query Parameters**: Convenient access to query string parameters with type conversion
- **Middleware Support**: Add custom middleware (filters) to your routes
- **Authentication Filters**: Built-in authentication scheme support
- **CORS Support**: Configurable Cross-Origin Resource Sharing middleware
- **Startup Banner**: Prints registered routes, port, and interface on server start
- **Performance Focused**: Designed for high throughput and low latency

## Sub-packages

- [Auth]({{< relref "auth" >}}) — Authentication middleware for Basic Auth and extensible authenticators
- [Filters]({{< relref "filters" >}}) — HTTP request/response filters including CORS support

## Core Components

### Router

The main router component provides HTTP request routing:

```go
// Create a new router
router := turbo.NewRouter()

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
// Route with path parameters (supports :id and {id} syntax)
router.Get("/api/users/:id", func(w http.ResponseWriter, r *http.Request) {
    // Extract as string
    id, _ := turbo.GetPathParam("id", r)

    // Or with type conversion
    userID, _ := turbo.GetPathParamAsInt("id", r)
    score, _ := turbo.GetPathParamAsFloat("score", r)
    active, _ := turbo.GetPathParamAsBool("active", r)
})
```

### Query Parameters

Access query string parameters with type conversion:

```go
func handler(w http.ResponseWriter, r *http.Request) {
    name, _ := turbo.GetQueryParam("name", r)
    age, _ := turbo.GetQueryParamAsInt("age", r)
    score, _ := turbo.GetQueryParamAsFloat("score", r)
    active, _ := turbo.GetQueryParamAsBool("active", r)
}
```

### Filters (Middleware)

Add custom middleware to your routes:

```go
// Add filters to a route
route, _ := router.Get("/api/protected", handleProtected)
route.AddFilter(loggingFilter, metricsFilter)

// Define a filter function
func loggingFilter(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("Request: %s %s", r.Method, r.URL.Path)
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("Response time: %v", time.Since(start))
    })
}
```

### Route Introspection

List all registered routes programmatically:

```go
router := turbo.NewRouter()
router.Get("/api/users", listUsers)
router.Post("/api/users", createUser)

// Get registered routes
routes := router.RegisteredRoutes()
for _, r := range routes {
    fmt.Printf("%s %s\n", r.Methods, r.Path) // e.g. [GET] /api/users
}
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
    router := turbo.NewRouter()

    router.Get("/", home)
    router.Get("/api/healthcheck", healthcheck)
    router.Get("/api/users", listUsers)
    router.Get("/api/users/:id", getUser)

    srv := &http.Server{
        Handler:      router,
        Addr:         ":8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

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
    fmt.Fprintf(w, "List of users")
}

func getUser(w http.ResponseWriter, r *http.Request) {
    id, _ := turbo.GetPathParam("id", r)
    fmt.Fprintf(w, "User ID: %s", id)
}
```

### Advanced Usage with Middleware and Auth

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

func main() {
    router := turbo.NewRouter()

    // Public routes
    router.Get("/api/public", publicHandler)

    // Protected routes with authentication and additional middleware
    r, _ := router.Get("/api/users", listUsersHandler)
    r.AddAuthenticator(auth.CreateBasicAuthAuthenticator())
    r.AddFilter(rateLimitMiddleware)

    r2, _ := router.Get("/api/users/:id", getUserHandler)
    r2.AddAuthenticator(auth.CreateBasicAuthAuthenticator())

    srv := &http.Server{
        Handler:      router,
        Addr:         ":8080",
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
    }

    log.Println("Server starting on :8080")
    log.Fatal(srv.ListenAndServe())
}

func rateLimitMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Implement rate limiting logic here
        next.ServeHTTP(w, r)
    })
}

func publicHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"message": "public endpoint"})
}

func listUsersHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode([]map[string]string{
        {"id": "1", "name": "Alice"},
        {"id": "2", "name": "Bob"},
    })
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
    id, _ := turbo.GetPathParam("id", r)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"id": id, "name": "user" + id})
}
```
