---
title: Arguments
draft: false
weight: 4
prev: /docs/cli/flags
next: /docs/cli/help
---

# Comprehensive Guide to Argument Handling in Golly's CLI Package

In command-line interfaces (CLIs), **arguments** are essential for passing inputs to commands. These inputs, which are distinct from flags, typically consist of filenames, paths, or other necessary data required by the command to perform its task. The Golly `cli` package provides robust support for handling arguments, making it simple to manage both required and optional arguments in your Go applications.

Lets explore how to handle arguments using the Golly `cli` package, covering everything from simple argument retrieval to advanced use cases. We will provide detailed examples to illustrate how you can leverage arguments effectively in your CLI application.

## What Are Arguments in CLI?

Arguments in a CLI application refer to positional parameters passed to a command when it is invoked. Unlike flags, which are prefixed by an identifier (e.g., `--flag`), arguments do not require a prefix and are typically listed after the command in the terminal. For example:

```bash
$ myapp greet John
```

In this example, greet is the command, and John is an argument.

Arguments are often required, though they can also be optional depending on the design of the CLI. The Golly cli package provides flexible handling of both required and optional arguments.

### Basic Argument Handling

To demonstrate basic argument handling, let’s create a simple CLI application that accepts a name as an argument and greets the user.

#### Example: Greeting Command with One Argument

```go
package main

import (
    "fmt"
    "log"
    "os"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "Greeter"
    app.Usage = "A simple CLI to greet users"

    // Define the action of the app
    app.Action = func(ctx *cli.Context) error {
        if ctx.Args().Len() > 0 {
            name := ctx.Args().Get(0)  // Get the first argument
            fmt.Printf("Hello, %s!\n", name)
        } else {
            fmt.Println("Hello, World!")
        }
        return nil
    }

    if err := app.Execute(os.Args); err != nil {
        log.Fatal(err)
    }
}
```

In this Example:

- We define a single argument (the user’s name) which is passed to the greet command.
- We retrieve the argument using ctx.Args().Get(0), which gets the first positional argument.
- If no arguments are provided, a default message (“Hello, World!”) is displayed.

#### Running the Application

$ go run main.go John
Hello, John!

$ go run main.go
Hello, World!

In the first command, John is passed as an argument, and the application greets John. In the second command, no arguments are passed, so the default greeting is shown.

### Handling Multiple Arguments

The Golly cli package supports multiple arguments. Let’s extend the previous example to handle two arguments: the user’s first name and last name.

#### Example: Greeting with Multiple Arguments

```go
package main

import (
    "fmt"
    "log"
    "os"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "Greeter"
    app.Usage = "A simple CLI to greet users with full name"

    // Define the action of the app
    app.Action = func(ctx *cli.Context) error {
        if ctx.Args().Len() >= 2 {
            firstName := ctx.Args().Get(0)  // First argument
            lastName := ctx.Args().Get(1)   // Second argument
            fmt.Printf("Hello, %s %s!\n", firstName, lastName)
        } else {
            fmt.Println("Please provide both first and last name")
        }
        return nil
    }

    if err := app.Execute(os.Args); err != nil {
        log.Fatal(err)
    }
}
```

In this example:

- The application expects two arguments: the first name and the last name.
- If two arguments are provided, the application prints the full name.
- If fewer than two arguments are provided, an error message is shown.

#### Running the Application

```bash
$ go run main.go John Doe
Hello, John Doe!

$ go run main.go John
Please provide both first and last name
```

### Argument Validation

The Golly cli package allows you to validate arguments before proceeding with command execution. You can check for the presence, length, or format of arguments. Let’s modify the previous example to validate that only alphabetic characters are allowed in the arguments.

#### Example: Validating Arguments

```go
package main

import (
    "fmt"
    "log"
    "os"
    "regexp"
    "oss.nandlabs.io/golly/cli"
)

func isValidName(name string) bool {
    regex := regexp.MustCompile(`^[a-zA-Z]+$`)
    return regex.MatchString(name)
}

func main() {
    app := cli.NewApp()
    app.Name = "Greeter"
    app.Usage = "A simple CLI to greet users with validated names"

    app.Action = func(ctx *cli.Context) error {
        if ctx.Args().Len() >= 2 {
            firstName := ctx.Args().Get(0)
            lastName := ctx.Args().Get(1)

            if !isValidName(firstName) || !isValidName(lastName) {
                fmt.Println("Invalid name: Only alphabetic characters are allowed.")
                return nil
            }

            fmt.Printf("Hello, %s %s!\n", firstName, lastName)
        } else {
            fmt.Println("Please provide both first and last name")
        }
        return nil
    }

    if err := app.Execute(os.Args); err != nil {
        log.Fatal(err)
    }
}
```

In this example, the isValidName function checks if the provided arguments are valid alphabetic names. If an invalid name is provided, the application displays an error message.

### Handling Optional Arguments

Sometimes, arguments are optional. You can define default behaviors when certain arguments are not provided. Let’s modify our application to allow for an optional title (e.g., Mr., Mrs., Dr.) before the name.

#### Example: Handling Optional Arguments

```go
package main

import (
    "fmt"
    "log"
    "os"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "Greeter"
    app.Usage = "A simple CLI to greet users with optional title"

    app.Action = func(ctx *cli.Context) error {
        var title, firstName, lastName string

        if ctx.Args().Len() == 3 {
            title = ctx.Args().Get(0)
            firstName = ctx.Args().Get(1)
            lastName = ctx.Args().Get(2)
            fmt.Printf("Hello, %s %s %s!\n", title, firstName, lastName)
        } else if ctx.Args().Len() == 2 {
            firstName = ctx.Args().Get(0)
            lastName = ctx.Args().Get(1)
            fmt.Printf("Hello, %s %s!\n", firstName, lastName)
        } else {
            fmt.Println("Please provide at least a first and last name")
        }
        return nil
    }

    if err := app.Execute(os.Args); err != nil {
        log.Fatal(err)
    }
}
```

In this example:

- The application checks if a title is provided by counting the number of arguments.
- If three arguments are provided, it assumes the first argument is the title and prints the full name with the title.
- If two arguments are provided, it only prints the first and last name.

#### Running the Application

```go
$ go run main.go Dr. John Doe
Hello, Dr. John Doe!

$ go run main.go John Doe
Hello, John Doe!
```

The Golly cli package provides comprehensive and flexible argument handling, enabling developers to build powerful and user-friendly command-line tools. Whether you’re dealing with simple, required arguments or more complex, optional inputs, the cli package makes argument management easy and intuitive.

From basic retrieval to validation and optional argument handling, the package offers a range of tools to suit your application’s needs. Start building your CLI applications with confidence using Golly’s cli package and take advantage of its robust argument handling capabilities.

For more information, check out the official [Golly CLI package documentation](https://pkg.go.dev/oss.nandlabs.io/golly/cli).
