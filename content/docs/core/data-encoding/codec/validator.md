---
title: Struct Validator
draft: false
weight: 1
---

The `codec/validator` package provides struct validation inspired by the OpenAPI Specification (OAS). It uses `constraints` struct tags to declaratively validate field values.

## Installation

```bash
go get oss.nandlabs.io/golly/codec/validator
```

## Quick Start

Add `constraints` tags to your struct fields and use the validator to check values:

```go
package main

import (
    "fmt"
    validator "oss.nandlabs.io/golly/codec/validator"
)

type TestStruct struct {
    Name        string  `json:"name" constraints:"min-length=5"`
    Age         int     `json:"age" constraints:"min=21"`
    Description string  `json:"description" constraints:"max-length=50"`
    Cost        float64 `json:"cost" constraints:"exclusiveMin=200"`
    ItemCount   int     `json:"itemCount" constraints:"multipleOf=5"`
}

func main() {
    sv := validator.NewStructValidator()
    msg := TestStruct{
        Name:        "Test",
        Age:         25,
        Description: "this is bench testing",
        Cost:        299.9,
        ItemCount:   2000,
    }

    if err := sv.Validate(msg); err != nil {
        fmt.Println(err)
    }
}
```

Fields without `constraints` tags are skipped during validation.

## Supported Validations

| Name           | Data Type | Description                        | Status |
| -------------- | --------- | ---------------------------------- | ------ |
| `min`          | numeric   | Minimum value (inclusive)          | ✅     |
| `max`          | numeric   | Maximum value (inclusive)          | ✅     |
| `exclusiveMin` | numeric   | Minimum value (exclusive)          | ✅     |
| `exclusiveMax` | numeric   | Maximum value (exclusive)          | ✅     |
| `multipleOf`   | numeric   | Value must be a multiple of        | ✅     |
| `max-length`   | string    | Maximum string length              | ✅     |
| `min-length`   | string    | Minimum string length              | ✅     |
| `pattern`      | string    | Regex pattern match                | ✅     |
| `notnull`      | string    | Must not be empty                  | ✅     |
| `enum`         | all       | Value must be one of listed values | ✅     |

## Usage

### Multiple Constraints

Combine multiple constraints on a single field:

```go
type Config struct {
    Port        int    `constraints:"min=1,max=65535"`
    Host        string `constraints:"min-length=1,pattern=^[a-z0-9.-]+$"`
    Environment string `constraints:"enum=dev|staging|prod"`
}
```

### Skipping Validation

Fields without `constraints` tags are not validated:

```go
type User struct {
    Name   string `constraints:"min-length=1"`  // validated
    Email  string `constraints:"pattern=.+@.+"` // validated
    Notes  string                                // skipped
}
```
