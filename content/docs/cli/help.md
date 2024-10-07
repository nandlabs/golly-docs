---
title: Help Generation
draft: false
weight: 5
prev: /docs/cli/flags
next: /docs/cli/multiple-commands
---

When developing command-line applications, it's crucial to provide clear, helpful, and accessible information to users about how the application works. This is where **help text** comes into play. The Golly `cli` package makes it easy to automatically generate help messages for both commands and flags, ensuring that your users can quickly learn how to use the CLI.

In this blog post, we will explore in detail how help text is handled by the Golly `cli` package, covering both global and command-specific help messages. We’ll also provide examples of customizing help text to ensure your CLI is user-friendly.

In Golly's `cli` package, help text is automatically generated for every defined command and flag. However, it’s also customizable, allowing you to modify or enhance the default messages based on your application’s specific needs.

## Automatically Generated Help Text

By default, Golly's `cli` package generates help text for your application and its commands. Every command and subcommand will have a help message that displays the command’s name, usage, and available flags. Let’s look at a basic example of an automatically generated help message.

### Example: Default Help Text

```go
package main

import (
    "fmt"
    "os"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "MyApp"
    app.Usage = "This is a sample application."

    app.Action = func(ctx *cli.Context) error {
        fmt.Println("Hello, World!")
        return nil
    }

    if err := app.Execute(os.Args); err != nil {
        fmt.Println(err)
    }
}
```

### Generated Help Text

Running the above code with the --help flag automatically generates and displays the following help message:

```bash
$ go run main.go --help
NAME:
   MyApp - This is a sample application.

USAGE:
   MyApp [global options] command [command options] [arguments...]

GLOBAL OPTIONS:
   --help, -h  show help
```

As shown, the Golly cli package creates a simple help text that includes the application name, usage, and a list of available global options. The --help and -h flags are automatically added by the package.

## Customizing Help Text

In many cases, you may want to customize the default help text to provide more detailed information or better describe your application’s functionality. The Golly cli package allows you to customize various parts of the help text, including:

- The application’s general help text (for the entire CLI)
- Help messages for individual commands
- Help messages for flags

## Application’s Help Text

You can customize the main help text of your application by modifying the app.UsageText field and adding more details to app.Description.

### Example: Customizing Application Help Text

```go
package main

import (
    "fmt"
    "os"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "MyApp"
    app.Usage = "A versatile CLI for managing tasks."
    app.UsageText = "myapp [global options] command [command options] [arguments...]"
    app.Description = "This application allows you to manage tasks efficiently using a simple command-line interface."

    app.Action = func(ctx *cli.Context) error {
        fmt.Println("Task Manager CLI")
        return nil
    }

    if err := app.Execute(os.Args); err != nil {
        fmt.Println(err)
    }
}
```

### Output

Running the above code with the --help flag will now display the customized help message:

```bash
$ go run main.go --help
NAME:
   MyApp - A versatile CLI for managing tasks.

USAGE:
   myapp [global options] command [command options] [arguments...]

DESCRIPTION:
   This application allows you to manage tasks efficiently using a simple command-line interface.

GLOBAL OPTIONS:
   --help, -h  show help
```

In this example, we customized the UsageText and added a more descriptive Description to better explain the purpose of the application.

## Command-Specific Help Text

Each command in the CLI can also have its own help text, making it easier for users to understand what each command does. You can customize command help text by defining the Usage, UsageText, and Description fields for each command.

### Example: Customizing Command Help Text

```go
package main

import (
    "fmt"
    "os"
    "oss.nandlabs.io/golly/cli"
)

func main() {
    app := cli.NewApp()
    app.Name = "MyApp"
    app.Usage = "A versatile CLI for managing tasks."

    app.Commands = []*cli.Command{
        {
            Name:        "add",
            Usage:       "Add a new task",
            UsageText:   "myapp add [task name]",
            Description: "Use this command to add a new task to the task list.",
            Action: func(ctx *cli.Context) error {
                fmt.Println("Task added!")
                return nil
            },
        },
    }

    if err := app.Execute(os.Args); err != nil {
        fmt.Println(err)
    }
}
```

### Output

Running the --help flag on a specific command will display the following help message:

```go
$ go run main.go add --help
NAME:
   add - Add a new task

USAGE:
   myapp add [task name]

DESCRIPTION:
   Use this command to add a new task to the task list.
```

Here, we customized the add command to provide a description, usage pattern, and additional details about what the command does.

## Customizing Flag Help Text

Flags are another critical aspect of CLI help messages. Each flag automatically generates a help message based on its name, aliases, and usage description. You can customize the help text for flags to make them more informative.

### Example: Customizing Flag Help Text

```go
package main

import (
"fmt"
"os"
"oss.nandlabs.io/golly/cli"
)

func main() {
app := cli.NewApp()
app.Name = "MyApp"
app.Usage = "A versatile CLI for managing tasks."

    app.Commands = []*cli.Command{
        {
            Name:  "add",
            Usage: "Add a new task",
            Flags: []cli.Flag{
                &cli.StringFlag{
                    Name:    "priority",
                    Aliases: []string{"p"},
                    Usage:   "Set the priority for the task (e.g., high, medium, low)",
                },
            },
            Action: func(ctx *cli.Context) error {
                priority := ctx.String("priority")
                if priority != "" {
                    fmt.Printf("Task added with priority: %s\n", priority)
                } else {
                    fmt.Println("Task added!")
                }
                return nil
            },
        },
    }

    if err := app.Execute(os.Args); err != nil {
        fmt.Println(err)
    }

}
```

### Output

Running the --help flag on the add command will display the help message for the flag as well:

```bash
$ go run main.go add --help
NAME:
add - Add a new task

USAGE:
myapp add [command options] [arguments...]

COMMAND OPTIONS:
--priority value, -p value Set the priority for the task (e.g., high, medium, low)
```

In this example, we defined a flag called priority and provided a custom usage description to explain how users can use the flag.

## Final Thoughts

Help text is a critical part of building user-friendly CLI applications. The Golly cli package offers powerful features for generating and customizing help messages for both global commands and specific subcommands. By leveraging these tools, you can ensure that your users are well-informed and can easily navigate the features of your CLI application.

Whether you’re using the default help generation or customizing each section, the Golly cli package ensures that help messages are clear, concise, and accessible.

For more information, check out the official [Golly CLI package documentation](https://pkg.go.dev/oss.nandlabs.io/golly/cli).
