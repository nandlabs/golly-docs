---
title: Collections
weight: 3
---

The `collections` package provides a comprehensive set of generic data structures for Go, including Stack, Queue, List, Set, and synchronized versions of each. These implementations leverage Go's generics to provide type-safe and easy-to-use collection types.

## Features

- **Type Safety**: Leverages Go's generics for compile-time type checking
- **Multiple Implementations**: Different implementations for different use cases (e.g., ArrayList, LinkedList)
- **Thread Safety**: Synchronized versions for concurrent access
- **Consistent API**: Common interface for different collection types
- **Comprehensive Collection Types**: Support for Stack, Queue, List, and Set abstractions

## Core Interfaces

### Collection Interface

The `Collection` interface is the base interface for all collection types and provides common methods:

- `Add(elem T) error`: Adds an element to the collection
- `AddAll(coll Collection[T]) error`: Adds all elements from another collection
- `Clear()`: Removes all elements from the collection
- `Contains(elem T) bool`: Checks if an element is in the collection
- `IsEmpty() bool`: Returns true if the collection is empty
- `Remove(elem T) bool`: Removes an element from the collection
- `Size() int`: Returns the number of elements in the collection

## Collection Types

### Stack

A Last-In-First-Out (LIFO) data structure with the following key operations:

- `Push(elem T)`: Adds an element to the top of the stack
- `Pop() T`: Removes and returns the top element
- `Peek() T`: Returns the top element without removing it

### Queue

A First-In-First-Out (FIFO) data structure with the following key operations:

- `Enqueue(elem T)`: Adds an element to the end of the queue
- `Dequeue() T`: Removes and returns the first element
- `Front() T`: Returns the first element without removing it

### List

An ordered collection that supports indexed access with the following key operations:

- `Get(index int) T`: Returns the element at the specified index
- `Set(index int, elem T)`: Replaces the element at the specified index
- `Add(elem T)`: Adds an element to the end of the list
- `Insert(index int, elem T)`: Inserts an element at the specified index
- `Remove(elem T)`: Removes the first occurrence of the specified element
- `RemoveAt(index int) T`: Removes the element at the specified index

### Set

A collection of unique elements with the following key operations:

- `Add(elem T)`: Adds an element to the set if it's not already present
- `Contains(elem T) bool`: Checks if the set contains the specified element
- `Remove(elem T) bool`: Removes the specified element from the set

## Implementation Variants

### ArrayList

An implementation of the List interface using a dynamic array, offering fast random access but potentially slower insertions and deletions in the middle.

### LinkedList

An implementation of the List interface using a doubly-linked list, offering fast insertions and deletions but potentially slower random access.

### HashSet

An implementation of the Set interface using a hash table, offering fast additions, removals, and lookups.

### Synchronized Collections

Thread-safe versions of all collection types, providing safe concurrent access through synchronization.

## Usage Examples

### Stack Example

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/collections"
)

func main() {
    stack := collections.NewStack[int]()
    stack.Push(1)
    stack.Push(2)
    stack.Push(3)

    fmt.Println(stack.Pop())   // Output: 3
    fmt.Println(stack.Peek())  // Output: 2
    fmt.Println(stack.Size())  // Output: 2
}
```

### Queue Example

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/collections"
)

func main() {
    queue := collections.NewArrayQueue[string]()
    queue.Enqueue("first")
    queue.Enqueue("second")
    queue.Enqueue("third")

    fmt.Println(queue.Dequeue())  // Output: first
    fmt.Println(queue.Front())    // Output: second
    fmt.Println(queue.Size())     // Output: 2
}
```

### List Example

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/collections"
)

func main() {
    list := collections.NewArrayList[int]()
    list.Add(10)
    list.Add(20)
    list.Add(30)

    list.Insert(1, 15)  // Insert 15 at index 1

    for i := 0; i < list.Size(); i++ {
        fmt.Printf("%d ", list.Get(i))
    }
    // Output: 10 15 20 30
}
```

### Set Example

```go
package main

import (
    "fmt"
    "oss.nandlabs.io/golly/collections"
)

func main() {
    set := collections.NewHashSet[string]()

    set.Add("apple")
    set.Add("banana")
    set.Add("apple")  // Duplicate, won't be added

    fmt.Println("Set contains apple:", set.Contains("apple"))  // Output: true
    fmt.Println("Set size:", set.Size())  // Output: 2

    // Iterate through set elements
    iterator := set.Iterator()
    for iterator.HasNext() {
        fmt.Println(iterator.Next())
    }
}
```

### Thread-Safe Collection Example

```go
package main

import (
    "fmt"
    "sync"
    "oss.nandlabs.io/golly/collections"
)

func main() {
    syncList := collections.NewSyncedArrayList[int]()

    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(val int) {
            defer wg.Done()
            syncList.Add(val)
        }(i)
    }

    wg.Wait()
    fmt.Println("List size:", syncList.Size())  // Output: List size: 10
}
```

## Installation

```bash
go get oss.nandlabs.io/golly/collections
```
