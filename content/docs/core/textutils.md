---
title: Text Utilities
draft: false
prev: /docs/core/testing
next: /docs/core/turbo
---

The `textutils` package provides constants and utilities for working with text and character data in Go. It offers a comprehensive set of constants for ASCII characters and strings to make text processing code more readable and maintainable.

## Features

- **ASCII Character Constants**: Named constants for all ASCII letters and special characters
- **String Constants**: String versions of all ASCII characters
- **Whitespace Constants**: Special constants for whitespace characters like space, newline, and carriage return
- **Readable Code**: Improve code readability by using named constants instead of character literals

## Core Components

### Character Constants

The package provides character constants for all ASCII letters (both uppercase and lowercase) and special characters:

```go
// Uppercase letters
const (
    AUpperChar = 'A'
    BUpperChar = 'B'
    // ... other uppercase letters
    ZUpperChar = 'Z'
)

// Lowercase letters
const (
    ALowerChar = 'a'
    BLowerChar = 'b'
    // ... other lowercase letters
    ZLowerChar = 'z'
)

// Special characters
const (
    ColonChar           = ':'
    SemiColonChar       = ';'
    DoubleQuoteChar     = '"'
    SingleQuoteChar     = '\''
    ForwardSlashChar    = '/'
    BackSlashChar       = '\\'
    QuestionMarkChar    = '?'
    GreaterThanChar     = '>'
    LessThanChar        = '<'
    // ... other special characters
)

// Whitespace characters
const (
    WhiteSpaceChar  = ' '
    NewLineChar     = '\n'
    CarriageRtnChar = '\r'
)
```

### String Constants

The package also provides string versions of all the characters:

```go
// Uppercase letter strings
const (
    AUpperStr = "A"
    BUpperStr = "B"
    // ... other uppercase letter strings
    ZUpperStr = "Z"
)

// Lowercase letter strings
const (
    ALowerStr = "a"
    BLowerStr = "b"
    // ... other lowercase letter strings
    ZLowerStr = "z"
)

// Special character strings
const (
    ColonStr           = ":"
    SemiColonStr       = ";"
    DoubleQuoteStr     = "\""
    SingleQuoteStr     = "\""
    ForwardSlashStr    = "/"
    BackSlashStr       = "\\"
    // ... other special character strings
)

// Whitespace and utility strings
const (
    EmptyStr          = ""
    WhiteSpaceStr     = " "
    NewLineString     = "\n"
    CarriageRtnString = "\r"
)
```

## Usage Examples

### String Processing

```go
package main

import (
    "fmt"
    "strings"
    "oss.nandlabs.io/golly/textutils"
)

func main() {
    // Using character constants for comparison
    text := "Hello, World!"

    if text[0] == textutils.HUpperChar {
        fmt.Println("Text starts with 'H'")
    }

    // Using string constants for replacement
    result := strings.ReplaceAll(text, textutils.CommaStr, textutils.EmptyStr)
    fmt.Println(result)  // Output: Hello World!

    // Building a string with constants
    greeting := textutils.HUpperStr + textutils.ELowerStr + textutils.LLowerStr +
                textutils.LLowerStr + textutils.OLowerStr
    fmt.Println(greeting)  // Output: Hello
}
```

### Input Validation

```go
package main

import (
    "fmt"
    "strings"
    "oss.nandlabs.io/golly/textutils"
)

// Checks if the input contains only alphanumeric characters
func isAlphanumeric(input string) bool {
    for _, c := range input {
        isLetter := (c >= textutils.AUpperChar && c <= textutils.ZUpperChar) ||
                    (c >= textutils.ALowerChar && c <= textutils.ZLowerChar)
        isDigit := c >= '0' && c <= '9'

        if !isLetter && !isDigit {
            return false
        }
    }
    return true
}

func main() {
    // Test the validation function
    testCases := []string{
        "Hello123",
        "Hello, World!",
        "JustLetters",
        "12345",
    }

    for _, tc := range testCases {
        fmt.Printf("%s is alphanumeric: %t\n", tc, isAlphanumeric(tc))
    }

    // Output:
    // Hello123 is alphanumeric: true
    // Hello, World! is alphanumeric: false
    // JustLetters is alphanumeric: true
    // 12345 is alphanumeric: true
}
```

### Formatting Text

```go
package main

import (
    "fmt"
    "strings"
    "oss.nandlabs.io/golly/textutils"
)

// Formats a CSV row with the specified values
func formatCSVRow(values []string) string {
    return strings.Join(values, textutils.CommaStr)
}

// Formats a multiline text with the specified lines
func formatMultiline(lines []string) string {
    return strings.Join(lines, textutils.NewLineString)
}

func main() {
    // Format CSV data
    row := []string{"Name", "Age", "Email"}
    csvRow := formatCSVRow(row)
    fmt.Println(csvRow)  // Output: Name,Age,Email

    // Format multiline text
    lines := []string{
        "First line",
        "Second line",
        "Third line",
    }
    multilineText := formatMultiline(lines)
    fmt.Println(multilineText)
    // Output:
    // First line
    // Second line
    // Third line
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/textutils
```
