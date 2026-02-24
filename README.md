# react_native_ts

# TypeScript Basics - Complete Guide

## Table of Contents
1. [What is TypeScript?](#what-is-typescript)
2. [Basic Types](#basic-types)
3. [Functions](#functions)
4. [Interfaces and Types](#interfaces-and-types)
5. [Classes](#classes)
6. [Generics](#generics)
7. [Union and Intersection Types](#union-and-intersection)
8. [Type Assertions and Guards](#type-assertions)
9. [Utility Types](#utility-types)
10. [Best Practices](#best-practices)

---

## What is TypeScript? {#what-is-typescript}

TypeScript is JavaScript with syntax for types. It helps catch errors during development instead of at runtime.

### Why TypeScript?

```typescript
// JavaScript - No error until runtime
function greet(name) {
  return "Hello, " + name.toUppercase(); // Runtime error: toUppercase is not a function
}
greet("John");

// TypeScript - Error caught immediately
function greet(name: string): string {
  return "Hello, " + name.toUppercase(); // ❌ TypeScript error: Property 'toUppercase' does not exist
}
```

### Installation

```bash
npm install -g typescript
# or
yarn global add typescript

# Check version
tsc --version
```

---

## Basic Types {#basic-types}

### Primitive Types

```typescript
// String
let name: string = "John";
let message: string = `Hello, ${name}`;

// Number
let age: number = 30;
let price: number = 99.99;
let hex: number = 0xf00d;

// Boolean
let isActive: boolean = true;
let isCompleted: boolean = false;

// Null and Undefined
let nothing: null = null;
let notDefined: undefined = undefined;

// Any - avoid using this!
let anything: any = "could be anything";
anything = 123;
anything = true;
```

### Arrays

```typescript
// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];
let numbers: Array<number> = [1, 2, 3, 4, 5];

// Array of mixed types (not recommended)
let mixed: any[] = [1, "two", true];

// Better approach - use union types
let mixedBetter: (string | number)[] = [1, "two", 3];

// Read-only arrays
let readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4); // ❌ Error: Property 'push' does not exist
```

### Objects

```typescript
// Object type
let user: { name: string; age: number } = {
  name: "John",
  age: 30,
};

// Optional properties
let product: { 
  name: string; 
  price: number; 
  description?: string  // optional
} = {
  name: "Laptop",
  price: 999,
};

// Read-only properties
let config: {
  readonly apiUrl: string;
  timeout: number;
} = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
};
// config.apiUrl = "new url"; // ❌ Error: Cannot assign to 'apiUrl'
```

### Tuples

```typescript
// Tuple - fixed-length array with specific types
let person: [string, number] = ["John", 30];

// Access elements
let personName: string = person[0];
let personAge: number = person[1];

// Destructuring
let [name2, age2] = person;

// Optional elements
let optional: [string, number?] = ["John"];

// Rest elements
let restTuple: [string, ...number[]] = ["scores", 90, 85, 88];
```

### Enums

```typescript
// Numeric enum
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

let direction: Direction = Direction.Up;

// String enum (recommended)
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

let status: Status = Status.Active;

// Using enums
function getStatusMessage(status: Status): string {
  switch (status) {
    case Status.Active:
      return "User is active";
    case Status.Inactive:
      return "User is inactive";
    case Status.Pending:
      return "User is pending";
  }
}

// Const enum (more efficient)
const enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}
```

---

## Functions {#functions}

### Function Types

```typescript
// Function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Shorter arrow function
const divide = (a: number, b: number): number => a / b;

// Void return type (no return value)
function logMessage(message: string): void {
  console.log(message);
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// Default parameters
function createUser(name: string, age: number = 18): object {
  return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}
```

### Function Overloads

```typescript
// Function overloads
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "Yes" : "No";
  }
}

let result1 = format("hello");      // "HELLO"
let result2 = format(123.456);      // "123.46"
let result3 = format(true);         // "Yes"
```

---

## Interfaces and Types {#interfaces-and-types}

### Interfaces

```typescript
// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Using interface
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
};

// Optional properties
interface Product {
  id: number;
  name: string;
  description?: string;  // optional
  price: number;
}

// Readonly properties
interface Config {
  readonly apiKey: string;
  readonly endpoint: string;
  timeout: number;
}

// Method signatures
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// Index signatures (for dynamic properties)
interface StringMap {
  [key: string]: string;
}

const translations: StringMap = {
  hello: "Hola",
  goodbye: "Adiós",
  thanks: "Gracias",
};

// Extending interfaces
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const employee: Employee = {
  name: "John",
  age: 30,
  employeeId: "E123",
  department: "Engineering",
};
```

### Type Aliases

```typescript
// Basic type alias
type UserID = number;
type Username = string;

// Object type
type User = {
  id: UserID;
  name: Username;
  email: string;
};

// Union type
type Result = "success" | "error" | "pending";

// Function type
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;

// Intersection types
type Admin = {
  permissions: string[];
};

type User2 = {
  name: string;
  email: string;
};

type AdminUser = Admin & User2;

const admin: AdminUser = {
  name: "Admin",
  email: "admin@example.com",
  permissions: ["read", "write", "delete"],
};
```

### Interface vs Type

```typescript
// Interfaces can be extended and merged
interface Animal {
  name: string;
}

interface Animal {
  age: number;  // Declaration merging
}

const dog: Animal = {
  name: "Buddy",
  age: 5,
};

// Types cannot be merged but can use intersection
type Cat = {
  name: string;
};

// type Cat = { age: number }; // ❌ Error: Duplicate identifier

// Use intersection instead
type CatWithAge = Cat & { age: number };

// Recommendation:
// - Use interfaces for object shapes (especially public APIs)
// - Use types for unions, intersections, and complex types
```

---

## Classes {#classes}

### Basic Class

```typescript
class Person {
  // Properties
  name: string;
  age: number;
  
  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  
  // Method
  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

// Create instance
const person = new Person("John", 30);
console.log(person.greet());
```

### Access Modifiers

```typescript
class BankAccount {
  // Public (default) - accessible everywhere
  public accountNumber: string;
  
  // Private - only accessible within the class
  private balance: number;
  
  // Protected - accessible in class and subclasses
  protected createdAt: Date;
  
  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.createdAt = new Date();
  }
  
  // Public method
  getBalance(): number {
    return this.balance;
  }
  
  // Private method
  private validateAmount(amount: number): boolean {
    return amount > 0;
  }
  
  deposit(amount: number): void {
    if (this.validateAmount(amount)) {
      this.balance += amount;
    }
  }
}

const account = new BankAccount("ACC123", 1000);
console.log(account.accountNumber);  // ✓ OK
console.log(account.getBalance());   // ✓ OK
// console.log(account.balance);     // ❌ Error: Property 'balance' is private
```

### Readonly and Static

```typescript
class Config {
  // Readonly - can only be assigned in constructor
  readonly appName: string;
  
  // Static - belongs to class, not instance
  static version: string = "1.0.0";
  
  constructor(appName: string) {
    this.appName = appName;
  }
  
  // Static method
  static getVersion(): string {
    return Config.version;
  }
}

const config = new Config("MyApp");
console.log(config.appName);      // ✓ OK
// config.appName = "New";        // ❌ Error: Cannot assign to 'appName'

console.log(Config.version);      // ✓ OK - access via class
console.log(Config.getVersion()); // ✓ OK
```

### Inheritance

```typescript
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  move(distance: number): void {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  move(distance: number): void {
    console.log("Running...");
    super.move(distance);  // Call parent method
  }
  
  bark(): void {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.bark();
dog.move(10);
```

### Abstract Classes

```typescript
abstract class Shape {
  abstract getArea(): number;  // Must be implemented by subclasses
  
  // Concrete method
  describe(): string {
    return `This shape has an area of ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  
  getArea(): number {
    return this.width * this.height;
  }
}

// const shape = new Shape(); // ❌ Error: Cannot create instance of abstract class
const circle = new Circle(5);
console.log(circle.getArea());
```

### Implementing Interfaces

```typescript
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

class Document implements Printable, Saveable {
  constructor(private content: string) {}
  
  print(): void {
    console.log(this.content);
  }
  
  save(): void {
    console.log("Saving document...");
  }
}
```

---

## Generics {#generics}

### Generic Functions

```typescript
// Without generics - must create separate functions
function identityString(arg: string): string {
  return arg;
}

function identityNumber(arg: number): number {
  return arg;
}

// With generics - one function for all types
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let str = identity<string>("hello");
let num = identity<number>(42);
let bool = identity<boolean>(true);

// Type inference (TypeScript figures it out)
let auto = identity("hello");  // TypeScript knows it's string

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

let first = getFirstElement([1, 2, 3]);      // number
let firstStr = getFirstElement(["a", "b"]); // string
```

### Generic Interfaces

```typescript
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: "hello" };
let numberBox: Box<number> = { value: 42 };

// Generic interface with multiple type parameters
interface Pair<K, V> {
  key: K;
  value: V;
}

let pair: Pair<string, number> = {
  key: "age",
  value: 30,
};
```

### Generic Classes

```typescript
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  get(index: number): T | undefined {
    return this.data[index];
  }
  
  getAll(): T[] {
    return [...this.data];
  }
}

// String store
const stringStore = new DataStore<string>();
stringStore.add("hello");
stringStore.add("world");

// Number store
const numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);

// Object store
interface User {
  id: number;
  name: string;
}

const userStore = new DataStore<User>();
userStore.add({ id: 1, name: "John" });
```

### Generic Constraints

```typescript
// Constrain to objects with length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}

logLength("hello");        // ✓ OK - strings have length
logLength([1, 2, 3]);      // ✓ OK - arrays have length
// logLength(123);         // ❌ Error - numbers don't have length

// Constrain to specific type
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user = { name: "John", age: 30 };
let name = getProperty(user, "name");  // ✓ OK
// let invalid = getProperty(user, "invalid"); // ❌ Error
```

---

## Union and Intersection Types {#union-and-intersection}

### Union Types

```typescript
// Variable can be multiple types
let id: string | number;
id = "ABC123";  // ✓ OK
id = 123;       // ✓ OK
// id = true;   // ❌ Error

// Function with union parameter
function formatId(id: string | number): string {
  // Type narrowing with typeof
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return id.toString();
  }
}

// Union of literal types
type Status = "pending" | "approved" | "rejected";

function updateStatus(status: Status): void {
  console.log(`Status updated to: ${status}`);
}

updateStatus("pending");   // ✓ OK
// updateStatus("active"); // ❌ Error

// Array of union types
let mixed: (string | number)[] = [1, "two", 3, "four"];
```

### Intersection Types

```typescript
// Combine multiple types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type Staff = Person & Employee;

const staff: Staff = {
  name: "John",
  age: 30,
  employeeId: "E123",
  department: "IT",
};

// Intersection with functions
type Logger = {
  log: (message: string) => void;
};

type Storage = {
  save: (data: string) => void;
};

type LoggerWithStorage = Logger & Storage;

const service: LoggerWithStorage = {
  log: (message) => console.log(message),
  save: (data) => console.log(`Saving: ${data}`),
};
```

---

## Type Assertions and Guards {#type-assertions}

### Type Assertions

```typescript
// Type assertion (tell TypeScript you know better)
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// Alternative syntax (not recommended in React/JSX)
let strLength2: number = (<string>someValue).length;

// Use when you know more than TypeScript
const element = document.getElementById("myElement") as HTMLInputElement;
element.value = "new value";
```

### Type Guards

```typescript
// typeof guard
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// instanceof guard
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// in operator
interface Car {
  drive(): void;
}

interface Boat {
  sail(): void;
}

function move(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}

// Custom type guard
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function movePet(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```

---

## Utility Types {#utility-types}

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = { name: "John" };  // ✓ OK

// Required - makes all properties required
interface OptionalUser {
  id: number;
  name?: string;
  email?: string;
}
type RequiredUser = Required<OptionalUser>;

// Readonly - makes all properties readonly
type ReadonlyUser = Readonly<User>;
const user: ReadonlyUser = { id: 1, name: "John", email: "john@example.com", age: 30 };
// user.name = "Jane"; // ❌ Error

// Pick - select specific properties
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "John" };

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
const noEmail: UserWithoutEmail = { id: 1, name: "John", age: 30 };

// Record - create object type with specific keys
type Roles = "admin" | "user" | "guest";
type RolePermissions = Record<Roles, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

// ReturnType - get return type of function
function getUser() {
  return { id: 1, name: "John" };
}
type User3 = ReturnType<typeof getUser>;  // { id: number, name: string }

// Parameters - get function parameter types
function createUser(name: string, age: number) {}
type CreateUserParams = Parameters<typeof createUser>;  // [string, number]

// NonNullable - remove null and undefined
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;  // string

// Extract - extract types from union
type T1 = Extract<string | number | boolean, string | number>;  // string | number

// Exclude - exclude types from union
type T2 = Exclude<string | number | boolean, string>;  // number | boolean
```

---

## Best Practices {#best-practices}

### 1. Use Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true
  }
}
```

### 2. Avoid `any`

```typescript
// ❌ Bad
function processData(data: any) {
  return data.value;
}

// ✓ Good
function processData(data: { value: string }) {
  return data.value;
}

// ✓ Good - use unknown when type is truly unknown
function processUnknown(data: unknown) {
  if (typeof data === "object" && data !== null && "value" in data) {
    return (data as { value: string }).value;
  }
}
```

### 3. Use Interfaces for Objects

```typescript
// ✓ Good - clear intent
interface Product {
  id: number;
  name: string;
  price: number;
}

// ❌ Less clear
type Product2 = {
  id: number;
  name: string;
  price: number;
};
```

### 4. Use Type for Unions and Complex Types

```typescript
// ✓ Good
type Status = "pending" | "success" | "error";
type Result<T> = { data: T } | { error: string };
```

### 5. Prefer `const` Assertions

```typescript
// ❌ Type is string[]
const colors = ["red", "green", "blue"];

// ✓ Type is readonly ["red", "green", "blue"]
const colors2 = ["red", "green", "blue"] as const;

// ✓ Object is readonly
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const;
```

### 6. Use Discriminated Unions

```typescript
// ✓ Good - easy to narrow types
type Success = {
  status: "success";
  data: string;
};

type Error = {
  status: "error";
  error: string;
};

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === "success") {
    console.log(result.data);  // TypeScript knows this is Success
  } else {
    console.log(result.error); // TypeScript knows this is Error
  }
}
```

### 7. Don't Repeat Types

```typescript
// ❌ Bad - duplicated type definition
const user = { id: 1, name: "John" };
function getUser(): { id: number; name: string } {
  return user;
}

// ✓ Good - define once, use everywhere
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "John" };
function getUser(): User {
  return user;
}
```

### 8. Use Type Inference

```typescript
// ❌ Redundant
const name: string = "John";
const age: number = 30;

// ✓ Good - TypeScript infers the type
const name = "John";
const age = 30;

// But DO type function returns
function getName(): string {  // ✓ Explicit return type
  return "John";
}
```

# React Native Basics - Complete Guide

## Table of Contents
1. [What is React Native?](#what-is-react-native)
2. [Setup and Installation](#setup)
3. [Core Components](#core-components)
4. [Styling](#styling)
5. [State and Props](#state-and-props)
6. [Hooks](#hooks)
7. [Lists and Keys](#lists)
8. [User Input](#user-input)
9. [Navigation](#navigation)
10. [Networking](#networking)
11. [Platform-Specific Code](#platform-specific)
12. [Performance](#performance)

---

## What is React Native? {#what-is-react-native}

React Native lets you build mobile apps using JavaScript and React. Your code runs as **native** iOS and Android apps.

### React Native vs React Web

```jsx
// React Web
<div>
  <h1>Hello</h1>
  <button>Click me</button>
</div>

// React Native
<View>
  <Text>Hello</Text>
  <Button title="Click me" />
</View>
```

**Key Differences:**
- No HTML tags (div, span, h1) → Use React Native components (View, Text)
- No CSS files → Use StyleSheet or inline styles
- Flexbox by default
- Touch events instead of click events

---

## Setup and Installation {#setup}

### Option 1: Expo (Recommended for beginners)

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new project
expo init MyApp
cd MyApp

# Start development server
expo start
```

### Option 2: React Native CLI (More control)

```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init MyApp
cd MyApp

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Project Structure

```
MyApp/
├── App.tsx              # Main app component
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── android/             # Android native code
├── ios/                 # iOS native code
├── src/                 # Your code
│   ├── components/      # Reusable components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation setup
│   └── utils/           # Utilities
└── assets/              # Images, fonts, etc.
```

---

## Core Components {#core-components}

### View - Container Component

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      {/* Child components */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

**Like:** `<div>` in HTML

### Text - Display Text

```tsx
import { Text, StyleSheet } from 'react-native';

function MyComponent() {
  return (
    <>
      <Text style={styles.title}>Hello World</Text>
      <Text style={styles.body}>This is some text</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
});
```

**Important:** All text MUST be inside `<Text>` component!

```tsx
// ❌ Wrong
<View>Hello</View>

// ✓ Correct
<View>
  <Text>Hello</Text>
</View>
```

### Image - Display Images

```tsx
import { Image, StyleSheet } from 'react-native';

function MyComponent() {
  return (
    <>
      {/* Local image */}
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logo}
      />
      
      {/* Remote image */}
      <Image 
        source={{ uri: 'https://example.com/image.jpg' }}
        style={styles.photo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // 'contain', 'stretch', 'repeat'
  },
});
```

### Button - Basic Button

```tsx
import { Button, Alert } from 'react-native';

function MyComponent() {
  const handlePress = () => {
    Alert.alert('Button pressed!');
  };
  
  return (
    <Button 
      title="Click Me"
      onPress={handlePress}
      color="#007AFF"
    />
  );
}
```

### TouchableOpacity - Custom Buttons

```tsx
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function CustomButton() {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={() => console.log('Pressed')}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Press Me</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
```

### ScrollView - Scrollable Container

```tsx
import { ScrollView, Text } from 'react-native';

function MyComponent() {
  return (
    <ScrollView>
      <Text>Lots of content here...</Text>
      <Text>That requires scrolling...</Text>
      {/* More content */}
    </ScrollView>
  );
}
```

### SafeAreaView - Handle Notches

```tsx
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text>Content avoids notches and home indicator</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
});
```

---

## Styling {#styling}

### StyleSheet API

```tsx
import { View, Text, StyleSheet } from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
```

### Inline Styles (Not Recommended)

```tsx
<View style={{ flex: 1, backgroundColor: 'blue' }}>
  <Text style={{ fontSize: 20, color: 'white' }}>Hello</Text>
</View>
```

### Multiple Styles

```tsx
const styles = StyleSheet.create({
  base: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});

// Combine styles
<Text style={[styles.base, styles.bold]}>Bold Text</Text>

// Conditional styles
<Text style={[
  styles.base,
  isActive && styles.bold,  // Only apply if isActive is true
]}>
  Text
</Text>
```

### Flexbox Layout

```tsx
import { View, StyleSheet } from 'react-native';

function FlexExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <View style={styles.box3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',      // 'row' or 'column' (default)
    justifyContent: 'center',  // 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'
    alignItems: 'center',      // 'flex-start', 'flex-end', 'center', 'stretch'
  },
  box1: {
    flex: 1,              // Takes 1 part of available space
    backgroundColor: 'red',
    height: 100,
  },
  box2: {
    flex: 2,              // Takes 2 parts of available space
    backgroundColor: 'green',
    height: 100,
  },
  box3: {
    flex: 1,
    backgroundColor: 'blue',
    height: 100,
  },
});
```

### Common Style Properties

```tsx
const styles = StyleSheet.create({
  box: {
    // Layout
    flex: 1,
    width: 100,
    height: 100,
    margin: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 20,
    paddingTop: 10,
    
    // Border
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    borderTopLeftRadius: 4,
    
    // Background
    backgroundColor: '#fff',
    
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    // Elevation (Android)
    elevation: 5,
    
    // Position
    position: 'absolute',  // or 'relative'
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});
```

---

## State and Props {#state-and-props}

### Props - Pass Data to Components

```tsx
interface GreetingProps {
  name: string;
  age?: number;  // Optional
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <View>
      <Text>Hello, {name}!</Text>
      {age && <Text>You are {age} years old</Text>}
    </View>
  );
}

// Usage
function App() {
  return (
    <>
      <Greeting name="John" age={30} />
      <Greeting name="Jane" />
    </>
  );
}
```

### State - Component Memory

```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)} 
      />
      <Button 
        title="Decrement" 
        onPress={() => setCount(count - 1)} 
      />
    </View>
  );
}
```

### Multiple State Variables

```tsx
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Submit form
    await submitData({ name, email });
    setIsSubmitting(false);
  };
  
  return (
    <View>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Button 
        title={isSubmitting ? "Submitting..." : "Submit"}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
}
```

### State with Objects

```tsx
interface User {
  name: string;
  email: string;
  age: number;
}

function UserProfile() {
  const [user, setUser] = useState<User>({
    name: 'John',
    email: 'john@example.com',
    age: 30,
  });
  
  const updateName = (newName: string) => {
    setUser(prevUser => ({
      ...prevUser,      // Keep other properties
      name: newName,    // Update only name
    }));
  };
  
  return (
    <View>
      <Text>{user.name}</Text>
      <Button title="Change Name" onPress={() => updateName('Jane')} />
    </View>
  );
}
```

---

## Hooks {#hooks}

### useState - State Management

```tsx
const [value, setValue] = useState(initialValue);
```

### useEffect - Side Effects

```tsx
import { useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  
  // Runs once on mount
  useEffect(() => {
    fetchData();
  }, []);  // Empty dependency array
  
  // Runs when `id` changes
  useEffect(() => {
    fetchUser(id);
  }, [id]);
  
  // Cleanup function
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
    
    // Cleanup on unmount
    return () => {
      clearInterval(timer);
    };
  }, []);
}
```

### useRef - Reference Values

```tsx
import { useRef } from 'react';
import { TextInput } from 'react-native';

function MyComponent() {
  const inputRef = useRef<TextInput>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <>
      <TextInput ref={inputRef} />
      <Button title="Focus" onPress={focusInput} />
    </>
  );
}
```

### useCallback - Memoize Functions

```tsx
import { useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  // Only recreated when dependencies change
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);  // No dependencies = never recreated
  
  return <Child onIncrement={handleIncrement} />;
}
```

### useMemo - Memoize Values

```tsx
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  // Only recalculate when items change
  const total = useMemo(() => {
    console.log('Calculating total...');
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  return <Text>Total: ${total}</Text>;
}
```

### Custom Hooks

```tsx
// hooks/useFetch.ts
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function MyComponent() {
  const { data, loading, error } = useFetch<User[]>('/api/users');
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  
  return (
    <View>
      {data?.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```

---

## Lists and Keys {#lists}

### FlatList - Efficient Lists

```tsx
import { FlatList, Text, View } from 'react-native';

interface Item {
  id: string;
  title: string;
}

function MyList() {
  const data: Item[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
  ];
  
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
  
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}
```

### SectionList - Grouped Lists

```tsx
import { SectionList, Text, View } from 'react-native';

function GroupedList() {
  const sections = [
    {
      title: 'Fruits',
      data: ['Apple', 'Banana', 'Orange'],
    },
    {
      title: 'Vegetables',
      data: ['Carrot', 'Lettuce', 'Tomato'],
    },
  ];
  
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
    />
  );
}
```

### Performance Optimization

```tsx
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  
  // Performance props
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  
  // Pull to refresh
  refreshing={isRefreshing}
  onRefresh={handleRefresh}
  
  // Infinite scroll
  onEndReached={loadMore}
  onEndReachedThreshold={0.5}
  
  // Empty state
  ListEmptyComponent={<Text>No items found</Text>}
  
  // Header/Footer
  ListHeaderComponent={<Text>Header</Text>}
  ListFooterComponent={<Text>Footer</Text>}
/>
```

---

## User Input {#user-input}

### TextInput - Text Entry

```tsx
import { TextInput, View, StyleSheet } from 'react-native';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});
```

### Switch - Toggle

```tsx
import { Switch, View, Text } from 'react-native';

function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <View>
      <Text>Enable Notifications</Text>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
}
```

### Pressable - Better Touch Handling

```tsx
import { Pressable, Text } from 'react-native';

function CustomButton() {
  return (
    <Pressable
      onPress={() => console.log('Pressed')}
      onLongPress={() => console.log('Long pressed')}
      onPressIn={() => console.log('Press started')}
      onPressOut={() => console.log('Press ended')}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      {({ pressed }) => (
        <Text style={styles.text}>
          {pressed ? 'Pressed!' : 'Press Me'}
        </Text>
      )}
    </Pressable>
  );
}
```

---

## Networking {#networking}

### Fetch API

```tsx
// GET request
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// POST request
async function createUser(user: User) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
```

### Using in Components

```tsx
function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <Button title="Retry" onPress={loadUsers} />
      </View>
    );
  }
  
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={item => item.id}
    />
  );
}
```

---

## Platform-Specific Code {#platform-specific}

### Platform Module

```tsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  text: {
    fontSize: Platform.select({
      ios: 16,
      android: 14,
      default: 14,
    }),
  },
});

// In code
if (Platform.OS === 'ios') {
  // iOS-specific code
} else {
  // Android-specific code
}

// Version check
if (Platform.Version > 28) {
  // Android API level > 28
}
```

### Platform-Specific Files

```
MyComponent.ios.tsx  // Used on iOS
MyComponent.android.tsx  // Used on Android
MyComponent.tsx  // Fallback
```

---

## Performance {#performance}

### Optimize Re-renders

```tsx
import React, { memo } from 'react';

// Only re-renders if props change
const ExpensiveComponent = memo(({ data }) => {
  console.log('Rendering ExpensiveComponent');
  return <Text>{data}</Text>;
});
```

### Avoid Inline Functions

```tsx
// ❌ Bad - creates new function on every render
<Button onPress={() => handlePress(id)} />

// ✓ Good - stable reference
const handlePress = useCallback(() => {
  // handle press
}, [id]);

<Button onPress={handlePress} />
```

### Use FlatList for Large Lists

```tsx
// ❌ Bad - renders all items
<ScrollView>
  {data.map(item => <Item key={item.id} {...item} />)}
</ScrollView>

// ✓ Good - only renders visible items
<FlatList
  data={data}
  renderItem={({ item }) => <Item {...item} />}
  keyExtractor={item => item.id}
/>
```

