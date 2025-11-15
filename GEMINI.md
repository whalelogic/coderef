# CodeRef programming reference website. 


> code reference .html files are located in public/reference/<language>/<topic>
> main .html pages are in public/

1. Create catergories for programming languages and their language-specific syntax.
2. Cover functions, methods, structs, objects, traits, classes, modules, variables, exception handling, errors, generator functions, special methods, built-in methods, and more. 

3. Create a 'built-in' catergory for each language
Make sure each page has a master list of all built-in methods, funcs and types and interfaces/traits. 

4. Ensure Go has a page that demonstrates standard library implementations for commonly used packages like strings, slices, maps, and more. Also use sync, net, net/http, io, buffer, json, and anything else you can think of. This will be Go's 'built-in' page that also contains a list of Go keywords. 

5. All pages must have in-depth content, code examples, insights/tips/best practices and context between code blocks with explanations about the code. **See example below**. 

### Other notes and things to consider.

- Ensure you don't put light gray text on a light gray or white background. 
- There is a mistake on public/references/javascript/variables.html in the first section with this text: 'The Three Keywords: var, let, and const' ### The user can't see these code-styled keyword as it's light gray on a light gray background. It should be darkened.
- Don't write any cookie-cutter code. This is a production grade website. 
- Ensure you don't make silly mistakes and think ahead given the project context. 
- Prism.js doesn't seem to have any effect on code blocks. They're all black and white. FIX.


## Example html file --> references/go/variables.go 

```go
Variables in Go

Go is a statically typed language, meaning variable types are determined at compile time. This provides type safety and helps catch errors early. Understanding Go's variable system is fundamental to writing efficient, maintainable code.
Variable Declaration Basics

In Go, there are multiple ways to declare variables, each suited for different scenarios. The var keyword is the most explicit form and can be used at both package and function level.

package main

import "fmt"

// Package-level variable (accessible throughout the package)
var globalCounter int = 0

func main() {
    // Basic variable declaration with explicit type
    var name string
    name = "Gopher"
    fmt.Println("Hello,", name)

    // Declaration with initialization (type inference)
    var age = 25  // Go infers this is an int
    fmt.Println("Age:", age)

    // Multiple variables of same type
    var x, y, z int = 1, 2, 3
    fmt.Println("Coordinates:", x, y, z)

    // Multiple variables of different types
    var (
        username string = "admin"
        isActive bool   = true
        loginCount int  = 42
    )
    fmt.Printf("User: %s, Active: %v, Logins: %d\n", 
        username, isActive, loginCount)
}

Key Insight: When you declare a variable without initializing it, Go automatically assigns it a zero value. For numeric types, this is 0; for booleans, it's false; for strings, it's "" (empty string); and for pointers, slices, maps, channels, functions, and interfaces, it's nil.
Short Variable Declaration

Inside functions, Go offers a shorthand syntax using := which combines declaration and initialization. This is the most common way to declare variables in Go code because it's concise and lets the compiler infer the type.

func processData() {
    // Short declaration - type inferred from right side
    language := "Go"           // string
    version := 1.21            // float64 (default for decimals)
    isStable := true           // bool
    users := 1_000_000         // int (underscores improve readability)

    fmt.Printf("%s v%.2f, Stable: %v, Users: %d\n", 
        language, version, isStable, users)

    // Multiple assignment
    firstName, lastName := "John", "Doe"
    fmt.Printf("Name: %s %s\n", firstName, lastName)

    // Reassignment with existing variables (at least one must be new)
    firstName, age := "Jane", 30  // firstName reused, age is new
    fmt.Printf("Updated: %s, Age: %d\n", firstName, age)
}

Important Limitations: The := operator can only be used inside functions. At package level, you must use the var keyword. Also, when using := with multiple variables, at least one variable on the left side must be newly declared.
Type Inference vs Explicit Types

Go's type inference is powerful but sometimes you need explicit types for clarity, precision, or to match specific interfaces. Understanding when to use each approach is crucial.

func demonstrateTypes() {
    // Type inference - Go chooses default types
    defaultInt := 42        // int (not int32 or int64)
    defaultFloat := 3.14    // float64 (not float32)
    defaultComplex := 1 + 2i // complex128

    fmt.Printf("Default int type: %T\n", defaultInt)       // int
    fmt.Printf("Default float type: %T\n", defaultFloat)   // float64
    fmt.Printf("Default complex type: %T\n", defaultComplex) // complex128

    // Explicit types for precision or compatibility
    var smallInt int8 = 127              // Range: -128 to 127
    var largeInt int64 = 9223372036854775807  // Much larger range
    var precise float32 = 3.14159       // Less memory than float64
    var userID uint = 12345             // Only positive numbers

    // Explicit type needed when default doesn't match requirements
    var bytes []byte = []byte("Hello")  // Commonly used for binary data
    var char rune = 'A'                 // Single Unicode character

    fmt.Printf("Small int: %d (type: %T)\n", smallInt, smallInt)
    fmt.Printf("Large int: %d (type: %T)\n", largeInt, largeInt)
    fmt.Printf("Precise float: %.5f (type: %T)\n", precise, precise)
    fmt.Printf("User ID: %d (type: %T)\n", userID, userID)
    fmt.Printf("Character: %c (Unicode: %d)\n", char, char)
}

Best Practice: Use type inference (with :=) for local variables when the type is obvious from context. Use explicit types when you need a specific size (like int32), when interfacing with external systems, or when the type might not be immediately clear to readers.
Constants

Constants in Go are immutable values defined at compile time. They're more efficient than variables because their values are known before the program runs, allowing the compiler to optimize their usage. ```