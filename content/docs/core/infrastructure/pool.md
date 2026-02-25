---
title: Pool
weight: 6
---

The `pool` package provides a generic, thread-safe object pool implementation with configurable capacity, automatic lifecycle management, and wait-based checkout.

## Installation

```sh
go get oss.nandlabs.io/golly
```

## Features

- **Generic**: Pool any type using Go generics (`Pool[T]`)
- **Configurable capacity**: Set minimum and maximum pool size
- **Lifecycle management**: User-supplied creator and destroyer functions
- **Wait-based checkout**: Configurable max wait time when pool is exhausted
- **Thread-safe**: Safe for concurrent use from multiple goroutines
- **Metrics**: Track current size, high water mark, and pool state

## Usage

```go
import "oss.nandlabs.io/golly/pool"

// Create a pool with creator and destroyer functions
p, err := pool.NewPool(
    func() (*Connection, error) { return NewConnection(), nil },  // creator
    func(c *Connection) error { return c.Close() },               // destroyer
    2,   // min: pre-create 2 objects
    10,  // max: allow up to 10 objects
    30,  // maxWait: wait up to 30 seconds for an object
)

// Start the pool (pre-creates min objects)
p.Start()

// Checkout an object
conn, err := p.Checkout()

// Use the object...

// Return to pool
p.Checkin(conn)

// Pool metrics
fmt.Println(p.Current())       // current pool size
fmt.Println(p.HighWaterMark()) // peak pool size

// Close the pool (destroys all objects)
p.Close()
```

## API Reference

### NewPool

```go
func NewPool[T any](
    creator func() (T, error),
    destroyer func(T) error,
    min, max, maxWait int,
) (*Pool[T], error)
```

Creates a new pool with the given creator/destroyer functions and capacity settings.

| Parameter   | Description                                         |
| ----------- | --------------------------------------------------- |
| `creator`   | Function to create new pool objects                 |
| `destroyer` | Function to destroy pool objects on cleanup         |
| `min`       | Minimum objects to pre-create on `Start()`          |
| `max`       | Maximum number of objects the pool can hold         |
| `maxWait`   | Maximum seconds to wait for an object on `Checkout` |

### Pool Methods

| Method            | Description                                       |
| ----------------- | ------------------------------------------------- |
| `Start()`         | Pre-creates `min` objects and activates the pool  |
| `Checkout() T`    | Gets an object from the pool (blocks if exhaused) |
| `Checkin(T)`      | Returns an object to the pool                     |
| `Current() int`   | Returns current number of objects in the pool     |
| `HighWaterMark()` | Returns the peak number of objects created        |
| `Close()`         | Destroys all objects and shuts down the pool      |

## Example

### Database Connection Pool

```go
package main

import (
    "database/sql"
    "fmt"
    "log"

    "oss.nandlabs.io/golly/pool"
)

func main() {
    dbPool, err := pool.NewPool(
        func() (*sql.DB, error) {
            return sql.Open("postgres", "postgres://localhost/mydb")
        },
        func(db *sql.DB) error {
            return db.Close()
        },
        2,  // min connections
        20, // max connections
        10, // max wait seconds
    )
    if err != nil {
        log.Fatal(err)
    }

    dbPool.Start()
    defer dbPool.Close()

    // Use a connection
    db, err := dbPool.Checkout()
    if err != nil {
        log.Fatal(err)
    }
    defer dbPool.Checkin(db)

    // Execute queries...
    fmt.Printf("Pool size: %d, High water mark: %d\n",
        dbPool.Current(), dbPool.HighWaterMark())
}
```
