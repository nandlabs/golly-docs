---
title: Turbo Filters
draft: false
weight: 2
prev: /docs/core/turbo/auth
next: /docs/core/uuid
---

The `turbo/filters` package provides HTTP request/response filter middleware for the Turbo router, including CORS support.

## Installation

```sh
go get oss.nandlabs.io/golly
```

## Features

- **CORS Filter**: Configurable Cross-Origin Resource Sharing middleware
- Support for allowed origins, methods, headers, and credentials
- Easy integration with the Turbo router

## Usage

### CORS Filter

```go
import (
    "oss.nandlabs.io/golly/turbo"
    "oss.nandlabs.io/golly/turbo/filters"
)

// Create a CORS filter with allowed origins
cors := filters.NewCorsFilter("https://example.com", "https://app.example.com")

// Or configure CORS options in detail
opts := &filters.CorsOptions{
    AllowedOrigins: []string{"*"},
    AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
    AllowedHeaders: []string{"Content-Type", "Authorization"},
}

// Attach to a Turbo router
router := turbo.NewRouter()
router.AddCorsFilter(opts)
```

### Custom Filters

You can create custom filters (middleware) that wrap the `http.Handler` chain:

```go
func rateLimitFilter(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Check rate limit...
        next.ServeHTTP(w, r)
    })
}

route, _ := router.Get("/api/data", dataHandler)
route.AddFilter(rateLimitFilter)
```
