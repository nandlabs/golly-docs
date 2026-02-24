---
title: Managers Package
draft: false
prev: /docs/core/lifecycle
next: /docs/core/messaging
---

The `managers` package provides utility features for managing items in Go. It includes support for registering, unregistering, and retrieving items in a thread-safe manner using Go generics.

## Installation

```sh
go get oss.nandlabs.io/golly
```

## Features

- **Generic Item Management**: Pool any type using Go generics (`ItemManager[T]`)
- **Thread-Safe**: Uses `sync.RWMutex` for safe concurrent access
- **Simple API**: Register, unregister, get, and list items

## ItemManager Interface

```go
type ItemManager[T any] interface {
    Register(name string, item T)
    Unregister(name string)
    Get(name string) T
    Items() []T
}
```

## Usage

### Creating a Manager

```go
import "oss.nandlabs.io/golly/managers"

manager := managers.NewItemManager[string]()
```

### Registering Items

```go
manager := managers.NewItemManager[string]()
manager.Register("item1", "This is item 1")

item := manager.Get("item1")
fmt.Println("Registered item:", item)
```

### Unregistering Items

```go
manager := managers.NewItemManager[string]()
manager.Register("item1", "This is item 1")

manager.Unregister("item1")
item := manager.Get("item1")
fmt.Println("Unregistered item:", item) // Output: Unregistered item:
```

### Listing All Items

```go
manager := managers.NewItemManager[string]()
manager.Register("item1", "This is item 1")
manager.Register("item2", "This is item 2")

items := manager.Items()
fmt.Println("All items:", items)
```

### Using with Custom Types

```go
type Service struct {
    Name    string
    Port    int
    Healthy bool
}

manager := managers.NewItemManager[*Service]()
manager.Register("auth", &Service{Name: "auth-service", Port: 8081, Healthy: true})
manager.Register("api", &Service{Name: "api-service", Port: 8080, Healthy: true})

authSvc := manager.Get("auth")
fmt.Printf("Service: %s on port %d\n", authSvc.Name, authSvc.Port)

all := manager.Items()
for _, svc := range all {
    fmt.Printf("  %s (port %d, healthy=%v)\n", svc.Name, svc.Port, svc.Healthy)
}
```
