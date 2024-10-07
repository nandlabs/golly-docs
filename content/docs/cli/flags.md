---
title: Flags
draft: false
weight: 3
prev: /docs/cli/multiple-commands
next: /docs/cli/arguments
---

In the `cli` package of Golly, flag handling plays a crucial role in making command-line interfaces more dynamic and flexible. Flags allow users to pass specific options to commands, enabling greater customization and control over the behavior of CLI applications.

## What Are Flags?

Flags are options or settings passed to commands in a CLI application. They can modify the behavior of a command by providing additional information, such as a file path, a mode, or other configurations. Flags can be global—affecting the entire application—or specific to a particular command. The Golly `cli` package simplifies the management of flags by providing an intuitive API to define and handle them.

## Global Flags vs. Command-Level Flags

- **Global Flags**: These are flags that apply to the entire application. They can be used with any command or subcommand and typically configure global settings that are relevant to all commands.
- **Command-Level Flags**: These flags apply only to specific commands. They are used to modify the behavior of an individual command without affecting other commands in the CLI.

Let's look at how both types of flags work in practice.

## Setting Up Flags in Golly

To start using flags in your CLI application, you'll need to define them using the `Flags` field in either the `App` structure for global flags or the `Command` structure for command-specific flags. Below, we will cover both cases with detailed examples.

### Global Flags

Global flags are defined at the application level, meaning they can be used with any command in the CLI. Let’s create a simple application with global flags for a project directory and a profile file.

```go
package main

import (
	"fmt"
	"os"
	"oss.nandlabs.io/golly/cli"
)

func main() {
	app := &cli.App{
		Name:    "Project Manager",
		Version: "v1.0.0",
		Usage:   "A simple project management CLI",
		Flags: []cli.Flag{
			{
				Name:    "project-dir",
				Aliases: []string{"pd"},
				Usage:   "Specify the project directory",
				Default: ".",
			},
			{
				Name:    "profile-file",
				Aliases: []string{"pf"},
				Usage:   "Specify the profile file",
				Default: "default.profile",
			},
		},
		Action: func(ctx *cli.Context) error {
			fmt.Printf("Project Directory: %s\n", ctx.GetFlag("project-dir"))
			fmt.Printf("Profile File: %s\n", ctx.GetFlag("profile-file"))
			return nil
		},
	}

	if err := app.Execute(os.Args); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```

#### How It Works

In this example:

- Two global flags are defined: project-dir and profile-file.
- These flags can be used in any command within the application.

#### Running the Application

```bash
$ go run main.go --project-dir="/myproject" --profile-file="dev.profile"
```

Output:

```bash
Project Directory: /myproject
Profile File: dev.profile
```

In this case, the global flags configure the project directory and profile file used across all commands.

### Command-Level Flags

Command-level flags are tied to specific commands. Let’s say we want to build a command that requires different configurations, like specifying the environment (--env) and enabling verbose logging (--verbose).

```go
package main

import (
	"fmt"
	"os"
	"oss.nandlabs.io/golly/cli"
)

func main() {
	app := &cli.App{
		Name:    "Project Manager",
		Version: "v1.0.0",
		Usage:   "A simple project management CLI",
		Commands: []*cli.Command{
			{
				Name:  "deploy",
				Usage: "Deploy the project",
				Flags: []cli.Flag{
					{
						Name:    "env",
						Aliases: []string{"e"},
						Usage:   "Specify the environment (e.g., prod, dev)",
					},
					{
						Name:    "verbose",
						Aliases: []string{"v"},
						Usage:   "Enable verbose logging",
					},
				},
				Action: func(ctx *cli.Context) error {
					env := ctx.GetFlag("env")
					verbose := ctx.GetFlag("verbose")
					if verbose != nil {
						fmt.Println("Verbose logging enabled.")
					}
					fmt.Printf("Deploying in %s environment.\n", env)
					return nil
				},
			},
		},
	}

	if err := app.Execute(os.Args); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```

#### How It Works

- We define a command deploy that has two flags: env (for specifying the environment) and verbose (to enable verbose logging).
- These flags only apply to the deploy command and cannot be used with other commands.

#### Running the Command

```bash
$ go run main.go deploy --env=prod --verbose
```

Output:

```bash
Verbose logging enabled.
Deploying in prod environment.
```

## Final Thoughts

Here, the deploy command uses the env and verbose flags to configure the deployment.

It’s possible to combine both global and command-specific flags in a single CLI. Global flags apply to all commands, while command-level flags only apply to specific commands.

For more information, check out the official [Golly CLI package documentation](https://pkg.go.dev/oss.nandlabs.io/golly/cli).
