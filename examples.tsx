// ========================================
// Practical TypeScript + React Native Examples
// ========================================

// ====================
// 1. Type-Safe Component with Props
// ====================

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Define prop types
interface UserCardProps {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;  // Optional
  onPress?: (id: number) => void;  // Optional callback
}

// Type-safe component
function UserCard({ id, name, email, isActive = true, onPress }: UserCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress?.(id)}
      disabled={!onPress}
    >
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={[
        styles.badge,
        isActive ? styles.badgeActive : styles.badgeInactive
      ]}>
        <Text style={styles.badgeText}>
          {isActive ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeActive: {
    backgroundColor: '#10B981',
  },
  badgeInactive: {
    backgroundColor: '#EF4444',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// ====================
// 2. Type-Safe State Management
// ====================

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function UserListScreen() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://api.example.com/users');
      const data: ApiResponse<User[]> = await response.json();
      
      setUsers(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUserPress = (id: number) => {
    console.log('User pressed:', id);
    // Navigate to user detail
  };
  
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUsers}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UserCard {...item} onPress={handleUserPress} />
      )}
    />
  );
}

// ====================
// 3. Form with Validation
// ====================

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function SignUpScreen() {
  const [formData, setFormData] = React.useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validate()) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('https://api.example.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      if (response.ok) {
        // Success - navigate to next screen
        console.log('Sign up successful');
      } else {
        throw new Error('Sign up failed');
      }
    } catch (err) {
      setErrors({ email: 'Sign up failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => updateField('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isSubmitting}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => updateField('password', text)}
        secureTextEntry
        editable={!isSubmitting}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => updateField('confirmPassword', text)}
        secureTextEntry
        editable={!isSubmitting}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}
      
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ====================
// 4. Custom Hook with TypeScript
// ====================

interface UseApiOptions {
  autoFetch?: boolean;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function useApi<T>(
  url: string, 
  options: UseApiOptions = {}
): UseApiReturn<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  React.useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData();
    }
  }, [fetchData, options.autoFetch]);
  
  return { data, loading, error, refetch: fetchData };
}

// Usage
function ProductList() {
  const { data, loading, error, refetch } = useApi<Product[]>(
    'https://api.example.com/products'
  );
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={refetch}
      refreshing={loading}
    />
  );
}

// ====================
// 5. Context with TypeScript
// ====================

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    const response = await fetch('https://api.example.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    setUser(data.user);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value: AuthContextValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function ProfileScreen() {
  const { user, logout } = useAuth();
  
  return (
    <View>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

// ====================
// 6. Discriminated Unions for State
// ====================

type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function DataComponent() {
  const [state, setState] = React.useState<LoadingState<User[]>>({
    status: 'idle',
  });
  
  const loadData = async () => {
    setState({ status: 'loading' });
    
    try {
      const response = await fetch('https://api.example.com/users');
      const data = await response.json();
      setState({ status: 'success', data });
    } catch (error) {
      setState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };
  
  // TypeScript knows exactly what properties are available
  switch (state.status) {
    case 'idle':
      return <Button title="Load Data" onPress={loadData} />;
      
    case 'loading':
      return <ActivityIndicator />;
      
    case 'success':
      return (
        <FlatList
          data={state.data}  // TypeScript knows this exists
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      );
      
    case 'error':
      return (
        <View>
          <Text>{state.error}</Text>  {/* TypeScript knows this exists */}
          <Button title="Retry" onPress={loadData} />
        </View>
      );
  }
}

// ====================
// 7. Type-Safe Navigation
// ====================

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: number };
  Settings: undefined;
};

// Type-safe screen component
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

function ProfileScreen({ route, navigation }: ProfileScreenProps) {
  const { userId } = route.params;  // TypeScript knows this is a number
  
  return (
    <View>
      <Text>User ID: {userId}</Text>
      <Button 
        title="Go Home" 
        onPress={() => navigation.navigate('Home')}  // Type-safe
      />
    </View>
  );
}

// ====================
// 8. Generic List Component
// ====================

interface ListItem {
  id: string | number;
}

interface GenericListProps<T extends ListItem> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  onItemPress?: (item: T) => void;
  emptyMessage?: string;
}

function GenericList<T extends ListItem>({
  data,
  renderItem,
  onItemPress,
  emptyMessage = 'No items found',
}: GenericListProps<T>) {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>{emptyMessage}</Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onItemPress?.(item)}>
          {renderItem(item)}
        </TouchableOpacity>
      )}
    />
  );
}

// Usage with full type safety
interface Product extends ListItem {
  name: string;
  price: number;
}

function ProductListScreen() {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
  ];
  
  return (
    <GenericList
      data={products}
      renderItem={(product) => (
        <View>
          <Text>{product.name}</Text>
          <Text>${product.price}</Text>
        </View>
      )}
      onItemPress={(product) => {
        console.log('Selected:', product.name);  // Fully typed!
      }}
    />
  );
}

// ====================
// 9. Utility Functions with Generics
// ====================

// Type-safe array grouping
function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Usage
interface Transaction {
  id: number;
  category: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: 1, category: 'Food', amount: 50 },
  { id: 2, category: 'Transport', amount: 20 },
  { id: 3, category: 'Food', amount: 30 },
];

const grouped = groupBy(transactions, 'category');
// Result: { Food: [...], Transport: [...] }

// ====================
// 10. Type-Safe AsyncStorage
// ====================

class TypedStorage {
  static async set<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  }
  
  static async get<T>(key: string): Promise<T | null> {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  }
  
  static async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

// Usage
interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

// Fully typed!
await TypedStorage.set<Settings>('settings', {
  theme: 'dark',
  notifications: true,
});

const settings = await TypedStorage.get<Settings>('settings');
if (settings) {
  console.log(settings.theme);  // TypeScript knows this exists
}
