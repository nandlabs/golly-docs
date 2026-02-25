---
title: Secrets Package
weight: 7
---

The `secrets` package provides a secure framework for managing credentials and secrets in Go applications. It offers a unified interface for storing, retrieving, and encrypting sensitive information across various storage backends.

## Features

- **Credential Management**: Store and retrieve credentials securely
- **Encryption**: Built-in AES encryption for sensitive data
- **Pluggable Storage Backends**: Interface-based design for multiple storage providers
- **Local Storage**: File-based local storage implementation
- **Extensibility**: Easy to implement custom storage providers

## Core Components

### Credential

The `Credential` type represents a set of sensitive information that needs to be stored securely:

```go
type Credential struct {
    // Fields for storing username, password, and other sensitive information
}
```

### Store Interface

The `Store` interface defines the contract for any credential storage implementation:

```go
type Store interface {
    Get(key string, ctx context.Context) (*Credential, error)
    Write(key string, credential *Credential, ctx context.Context) error
    Provider() string
}
```

### Store Manager

The `StoreManager` provides a centralized way to manage multiple credential stores:

```go
type StoreManager struct {
    // Internal implementation details
}
```

## Usage Examples

### Basic Credential Storage and Retrieval

```go
package main

import (
    "context"
    "fmt"
    "oss.nandlabs.io/golly/secrets"
)

func main() {
    // Create a new local store
    store, err := secrets.NewLocalStore("/path/to/credentials")
    if err != nil {
        fmt.Printf("Error creating store: %v\n", err)
        return
    }

    // Create a new credential
    cred := secrets.NewCredential()
    cred.SetUsername("user123")
    cred.SetPassword("securePassword!")

    // Store the credential
    ctx := context.Background()
    err = store.Write("myapp.database", cred, ctx)
    if err != nil {
        fmt.Printf("Error writing credential: %v\n", err)
        return
    }

    // Later, retrieve the credential
    retrievedCred, err := store.Get("myapp.database", ctx)
    if err != nil {
        fmt.Printf("Error retrieving credential: %v\n", err)
        return
    }

    // Use the credential
    username := retrievedCred.Username()
    password := retrievedCred.Password()

    fmt.Printf("Retrieved credentials for user: %s\n", username)
}
```

### Using Store Manager with Multiple Backends

```go
package main

import (
    "context"
    "fmt"
    "oss.nandlabs.io/golly/secrets"
)

func main() {
    // Create a store manager
    manager := secrets.NewStoreManager()

    // Add different credential stores
    localStore, _ := secrets.NewLocalStore("/path/to/local/credentials")
    manager.Register(localStore)

    // Register a custom store (implementation not shown)
    // customStore := NewCustomStore()
    // manager.Register(customStore)

    // Get a credential using the manager
    ctx := context.Background()
    cred, err := manager.Get("myapp.apikey", ctx)
    if err != nil {
        fmt.Printf("Error retrieving credential: %v\n", err)
        return
    }

    // Use the credential
    apiKey := cred.GetAttribute("api_key")
    fmt.Printf("Retrieved API key: %s\n", apiKey)
}
```

### Using AES Encryption Directly

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/secrets"
)

func main() {
    // Create a new AES encryptor with a key
    encryptor, err := secrets.NewAES("my-secure-encryption-key-32-bytes!")
    if err != nil {
        fmt.Printf("Error creating encryptor: %v\n", err)
        return
    }

    // Encrypt some sensitive data
    plaintext := []byte("sensitive information")
    ciphertext, err := encryptor.Encrypt(plaintext)
    if err != nil {
        fmt.Printf("Error encrypting data: %v\n", err)
        return
    }

    fmt.Printf("Encrypted data: %x\n", ciphertext)

    // Later, decrypt the data
    decrypted, err := encryptor.Decrypt(ciphertext)
    if err != nil {
        fmt.Printf("Error decrypting data: %v\n", err)
        return
    }

    fmt.Printf("Decrypted data: %s\n", string(decrypted))
}
```

### Creating a Custom Storage Provider

```go
package main

import (
    "context"
    "fmt"
    "oss.nandlabs.io/golly/secrets"
)

// Define a custom credential store
type DatabaseStore struct {
    connectionString string
    // Other fields as needed
}

// Implement the Store interface
func (ds *DatabaseStore) Get(key string, ctx context.Context) (*secrets.Credential, error) {
    // Implementation that retrieves a credential from the database
    // ...
    return credential, nil
}

func (ds *DatabaseStore) Write(key string, credential *secrets.Credential, ctx context.Context) error {
    // Implementation that writes a credential to the database
    // ...
    return nil
}

func (ds *DatabaseStore) Provider() string {
    return "database"
}

// Constructor for the custom store
func NewDatabaseStore(connectionString string) *DatabaseStore {
    return &DatabaseStore{
        connectionString: connectionString,
    }
}

func main() {
    // Create the custom store
    dbStore := NewDatabaseStore("postgresql://localhost/secrets")

    // Use it directly or register with a store manager
    manager := secrets.NewStoreManager()
    manager.Register(dbStore)

    fmt.Println("Database store registered successfully")
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/secrets
```
