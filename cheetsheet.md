# TypeScript + React Native Cheat Sheet

## TypeScript Quick Reference

### Basic Types
```typescript
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 42];
```

### Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email?: string;  // optional
  readonly createdAt: Date;  // readonly
}
```

### Type Aliases
```typescript
type ID = string | number;
type Status = "pending" | "approved" | "rejected";
type Callback = (value: string) => void;
```

### Functions
```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}

const add = (a: number, b: number): number => a + b;
```

### Generics
```typescript
function identity<T>(arg: T): T {
  return arg;
}

interface Box<T> {
  value: T;
}
```

### Utility Types
```typescript
Partial<User>        // All properties optional
Required<User>       // All properties required
Readonly<User>       // All properties readonly
Pick<User, "id">     // Select specific properties
Omit<User, "email">  // Exclude properties
```

---

## React Native Quick Reference

### Core Components
```tsx
import { View, Text, Image, Button, TouchableOpacity, 
         ScrollView, FlatList, TextInput } from 'react-native';

<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
  <Image source={require('./logo.png')} />
  <Button title="Click" onPress={() => {}} />
</View>
```

### Styling
```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
```

### State
```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
```

### Effects
```tsx
useEffect(() => {
  // Runs on mount
  fetchData();
}, []);

useEffect(() => {
  // Runs when count changes
  console.log(count);
}, [count]);
```

### Lists
```tsx
<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
/>
```

### Forms
```tsx
<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Enter text"
  style={styles.input}
/>
```

---

## TypeScript + React Native Patterns

### Type-Safe Props
```tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

function CustomButton({ title, onPress, disabled }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

### Type-Safe State
```tsx
interface FormData {
  email: string;
  password: string;
}

const [form, setForm] = useState<FormData>({
  email: '',
  password: '',
});

const updateField = <K extends keyof FormData>(
  field: K,
  value: FormData[K]
) => {
  setForm(prev => ({ ...prev, [field]: value }));
};
```

### Custom Hooks
```tsx
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
}
```

### Context
```tsx
interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

### Navigation Types
```tsx
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: number };
};

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

function ProfileScreen({ route, navigation }: ProfileProps) {
  const { userId } = route.params;
  // ...
}
```

---

## Common Patterns

### API Call Pattern
```tsx
const [state, setState] = useState<{
  data: User[] | null;
  loading: boolean;
  error: string | null;
}>({ data: null, loading: false, error: null });

const fetchUsers = async () => {
  try {
    setState(prev => ({ ...prev, loading: true, error: null }));
    const response = await fetch('/api/users');
    const data = await response.json();
    setState({ data, loading: false, error: null });
  } catch (error) {
    setState(prev => ({ 
      ...prev, 
      loading: false, 
      error: error.message 
    }));
  }
};
```

### Form Validation Pattern
```tsx
interface FormErrors {
  email?: string;
  password?: string;
}

const validate = (): boolean => {
  const errors: FormErrors = {};
  
  if (!email) errors.email = 'Required';
  if (!password) errors.password = 'Required';
  
  setErrors(errors);
  return Object.keys(errors).length === 0;
};
```

### Conditional Rendering
```tsx
{loading && <ActivityIndicator />}
{error && <Text>{error}</Text>}
{data && <FlatList data={data} ... />}
```

---

## Performance Tips

### Memo
```tsx
const MemoizedComponent = React.memo(MyComponent);
```

### useCallback
```tsx
const handlePress = useCallback(() => {
  // handler code
}, [dependencies]);
```

### useMemo
```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

### FlatList Optimization
```tsx
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/>
```

---

## Debugging

### Console Logging
```tsx
console.log('Debug:', value);
console.warn('Warning:', message);
console.error('Error:', error);
```

### React Native Debugger
```bash
# Enable debug menu
# iOS: Cmd+D
# Android: Cmd+M (Mac) or Ctrl+M (Windows/Linux)
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

---

## Common Mistakes to Avoid

### ❌ Don't
```tsx
// Inline styles on every render
<View style={{ flex: 1 }} />

// Any type
const data: any = fetchData();

// Missing keys in lists
{items.map(item => <Text>{item.name}</Text>)}

// Text outside Text component
<View>Hello</View>
```

### ✓ Do
```tsx
// StyleSheet
<View style={styles.container} />

// Proper typing
const data: User[] = await fetchData();

// Keys in lists
{items.map(item => <Text key={item.id}>{item.name}</Text>)}

// Text in Text component
<View><Text>Hello</Text></View>
```

---

## Useful Resources

- **TypeScript**: https://www.typescriptlang.org/docs/
- **React Native**: https://reactnative.dev/docs/getting-started
- **React Navigation**: https://reactnavigation.org/
- **React Native Directory**: https://reactnative.directory/

---

## Quick Commands

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Clear cache
npm start -- --reset-cache

# Type check
npx tsc --noEmit

# Lint
npm run lint
```
