---
title: Turbo Auth
draft: false
weight: 1
---

The `turbo/auth` package provides authentication middleware (filters) for the Turbo HTTP router.

## Installation

```sh
go get oss.nandlabs.io/golly
```

## Features

- **Basic Auth Filter**: Middleware for HTTP Basic Authentication
- **Extensible Interface**: Implement the `Authenticator` interface for custom authentication strategies

## Authenticator Interface

The package defines an `Authenticator` interface that can be implemented for custom authentication strategies and attached to routes via `AddAuthenticator()`.

## Usage

### Basic Authentication

```go
import (
    "oss.nandlabs.io/golly/turbo"
    "oss.nandlabs.io/golly/turbo/auth"
)

router := turbo.NewRouter()

// Create a Basic Auth filter
basicAuth := auth.CreateBasicAuthAuthenticator()

// Attach to a route
route, _ := router.Get("/api/admin", adminHandler)
route.AddAuthenticator(basicAuth)
```

### Custom Authenticator

Implement the `Authenticator` interface for custom authentication:

```go
type TokenAuthenticator struct {
    validTokens map[string]bool
}

func (a *TokenAuthenticator) Authenticate(r *http.Request) bool {
    token := r.Header.Get("X-Auth-Token")
    return a.validTokens[token]
}

// Use it
route, _ := router.Get("/api/secure", secureHandler)
route.AddAuthenticator(&TokenAuthenticator{
    validTokens: map[string]bool{"my-secret-token": true},
})
```
