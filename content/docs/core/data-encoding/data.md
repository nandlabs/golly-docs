---
title: Data
weight: 2
---

The `data` package provides utilities for defining, validating, and working with structured data schemas in Go. It implements a subset of the OpenAPI 3.0 schema specification, allowing developers to define rich data models with validation constraints.

## Features

- **Schema Definition**: Define data structures with rich type information
- **Validation Rules**: Specify constraints like min/max values, string patterns, and more
- **OpenAPI Compatible**: Based on OpenAPI 3.0 schema specifications
- **Code Generation**: Generate Go structs from schema definitions
- **Type Safety**: Ensure data conforms to expected formats and constraints

## Core Components

### Schema Type

The `Schema` type is the core of the package, allowing you to define structure, constraints, and metadata for your data:

```go
type Schema struct {
    Id               string             // Schema identifier
    Ref              string             // Reference to another schema
    Description      string             // Description of the schema
    Type             string             // Data type (string, number, boolean, object, array, etc.)
    Nullable         bool               // Whether the value can be null
    Format           *string            // Format specifier (e.g., int32, float, date-time)
    Title            string             // Title of the schema
    Default          any                // Default value
    Maximum          *float64           // Maximum value for numbers
    Minimum          *float64           // Minimum value for numbers
    MaxLength        *int               // Maximum length for strings
    MinLength        *int               // Minimum length for strings
    Pattern          *string            // Regex pattern for strings
    MaxItems         *int               // Maximum items in an array
    MinItems         *int               // Minimum items in an array
    UniqueItems      bool               // Whether array items must be unique
    Required         []string           // Required properties for objects
    Properties       map[string]*Schema // Properties for object types
    // Additional fields omitted for brevity
}
```

### Schema Types and Formats

The package defines several constants for common schema types and formats:

- **Types**:
  - `SchemaTypeBool` (boolean)
  - `SchemaTypeString` (string)
  - `SchemaTypeNumber` (number)
  - `SchemaTypeObject` (object)
  - `SchemaTypeArray` (array)
  - `SchemaTypeInteger` (integer)
- **Formats**:
  - `SchemaFormatFloat` (float)
  - `SchemaFormatDouble` (double)
  - `SchemaFormatInt32` (int32)
  - `SchemaFormatInt64` (int64)

## Usage Examples

### Defining a Basic Schema

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/data"
)

func main() {
    // Define a schema for a person
    personSchema := &data.Schema{
        Type:        data.SchemaTypeObject,
        Description: "A schema representing a person",
        Properties: map[string]*data.Schema{
            "name": {
                Type:        data.SchemaTypeString,
                Description: "The person's full name",
                MinLength:   intPtr(1),
                MaxLength:   intPtr(100),
            },
            "age": {
                Type:        data.SchemaTypeInteger,
                Format:      strPtr(data.SchemaFormatInt32),
                Description: "The person's age in years",
                Minimum:     float64Ptr(0),
                Maximum:     float64Ptr(120),
            },
            "email": {
                Type:        data.SchemaTypeString,
                Description: "The person's email address",
                Pattern:     strPtr(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`),
            },
        },
        Required: []string{"name", "age"},
    }

    fmt.Printf("Created person schema with %d properties\n", len(personSchema.Properties))
}

func intPtr(i int) *int {
    return &i
}

func float64Ptr(f float64) *float64 {
    return &f
}

func strPtr(s string) *string {
    return &s
}
```

### Schema Generation

The package provides utilities to generate schemas from Go structs, making it easy to define your data models:

```go
package main

import (
    "encoding/json"
    "fmt"
    "oss.nandlabs.io/golly/data"
)

// Define a struct that will be used to generate a schema
type Product struct {
    ID          string  `json:"id" schema:"required"`
    Name        string  `json:"name" schema:"required,minLength=3,maxLength=100"`
    Description string  `json:"description" schema:"maxLength=500"`
    Price       float64 `json:"price" schema:"minimum=0,exclusiveMinimum"`
    InStock     bool    `json:"inStock"`
    Categories  []string `json:"categories" schema:"uniqueItems"`
}

func main() {
    // Generate a schema from the Product struct
    schema, err := data.GenerateSchema(Product{})
    if err != nil {
        fmt.Printf("Error generating schema: %v\n", err)
        return
    }

    // Convert the schema to JSON
    jsonSchema, err := json.MarshalIndent(schema, "", "  ")
    if err != nil {
        fmt.Printf("Error marshaling schema: %v\n", err)
        return
    }

    fmt.Println(string(jsonSchema))
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/data
```
