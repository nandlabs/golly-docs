---
title: UUID Package
weight: 5
---

The `uuid` package provides functionality for generating and handling Universally Unique Identifiers (UUIDs) in Go applications. It supports multiple UUID versions and offers a clean API for creating and working with UUIDs.

## Features

- **Multiple UUID Versions**: Support for UUID versions 1, 2, 3, and 4
- **RFC Compliance**: Implements UUIDs according to RFC 4122
- **Thread Safety**: Safe for concurrent use
- **String Conversion**: Easy conversion between UUID objects and strings
- **Parsing**: Parse UUID strings into UUID objects
- **Validation**: Validate UUID strings and objects

## Core Components

### UUID Type

The main type representing a UUID:

```go
type UUID struct {
    // Internal representation of the UUID
}

// Methods:
// String() string - Convert UUID to string
// Bytes() []byte - Get raw bytes of the UUID
// Version() int - Get the UUID version
// Variant() int - Get the UUID variant
```

### Generator Functions

Functions for generating different versions of UUIDs:

```go
// Generate a Version 1 UUID (time-based)
func V1() (UUID, error)

// Generate a Version 2 UUID (DCE security)
func V2() (UUID, error)

// Generate a Version 3 UUID (namespace with MD5)
func V3(namespace, name string) (UUID, error)

// Generate a Version 4 UUID (random)
func V4() (UUID, error)
```

### Parsing Functions

Functions for parsing and validating UUIDs:

```go
// Parse a UUID string into a UUID object
func ParseUUID(uuidStr string) (UUID, error)

// Check if a string is a valid UUID
func IsValidUUID(uuidStr string) bool
```

## Usage Examples

### Generating Version 4 (Random) UUIDs

Version 4 UUIDs are completely random and are the most commonly used type:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/uuid"
)

func main() {
    // Generate a random UUID
    id, err := uuid.V4()
    if err != nil {
        fmt.Printf("Error generating UUID: %v\n", err)
        return
    }

    // Convert to string for display or storage
    fmt.Printf("Generated UUID: %s\n", id.String())

    // Check version
    fmt.Printf("UUID version: %d\n", id.Version())
}
```

### Using Version 1 (Time-based) UUIDs

Version 1 UUIDs incorporate the timestamp and MAC address:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/uuid"
)

func main() {
    // Generate a time-based UUID
    id, err := uuid.V1()
    if err != nil {
        fmt.Printf("Error generating UUID: %v\n", err)
        return
    }

    fmt.Printf("Generated UUID: %s\n", id.String())
}
```

### Creating Version 3 (Namespace) UUIDs

Version 3 UUIDs are generated from a namespace and name using MD5:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/uuid"
)

func main() {
    // Define a namespace and name
    namespace := "example.com"
    name := "user123"

    // Generate a namespace UUID
    id, err := uuid.V3(namespace, name)
    if err != nil {
        fmt.Printf("Error generating UUID: %v\n", err)
        return
    }

    fmt.Printf("Generated UUID: %s\n", id.String())

    // Generate another UUID with the same inputs
    id2, _ := uuid.V3(namespace, name)

    // Version 3 UUIDs are deterministic - same inputs produce same UUID
    fmt.Printf("Same inputs produce same UUID: %v\n", id.String() == id2.String())
}
```

### Parsing and Validating UUIDs

Parse UUID strings into UUID objects:

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/uuid"
)

func main() {
    // A UUID string to parse
    uuidString := "f47ac10b-58cc-4372-a567-0e02b2c3d479"

    // Parse the string into a UUID object
    id, err := uuid.ParseUUID(uuidString)
    if err != nil {
        fmt.Printf("Error parsing UUID: %v\n", err)
        return
    }

    // UUID successfully parsed
    fmt.Printf("Parsed UUID: %s\n", id.String())
    fmt.Printf("UUID version: %d\n", id.Version())

    // Validate a UUID string
    validString := "550e8400-e29b-41d4-a716-446655440000"
    invalidString := "not-a-uuid"

    fmt.Printf("Is '%s' valid? %v\n", validString, uuid.IsValidUUID(validString))
    fmt.Printf("Is '%s' valid? %v\n", invalidString, uuid.IsValidUUID(invalidString))
}
```

### UUID in Database Primary Keys

Using UUIDs as primary keys in a database:

```go
package main

import (
    "database/sql"
    "fmt"
    "log"

    "oss.nandlabs.io/golly/uuid"
    _ "github.com/lib/pq"
)

// User represents a user in the system
type User struct {
    ID    string
    Name  string
    Email string
}

func main() {
    // Connect to database
    db, err := sql.Open("postgres", "postgresql://user:password@localhost/mydb?sslmode=disable")
    if err != nil {
        log.Fatalf("Error connecting to database: %v", err)
    }
    defer db.Close()

    // Create a new user with a UUID primary key
    user := User{
        ID:    generateUserID(),
        Name:  "John Doe",
        Email: "john@example.com",
    }

    // Insert the user into the database
    _, err = db.Exec(
        "INSERT INTO users (id, name, email) VALUES ($1, $2, $3)",
        user.ID, user.Name, user.Email,
    )
    if err != nil {
        log.Fatalf("Error inserting user: %v", err)
    }

    fmt.Printf("Created user with ID: %s\n", user.ID)
}

// Generate a unique ID for a user
func generateUserID() string {
    id, err := uuid.V4()
    if err != nil {
        log.Fatalf("Error generating UUID: %v", err)
    }
    return id.String()
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/uuid
```
