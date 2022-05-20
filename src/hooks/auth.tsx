import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLoggingIn: boolean;
  user: User | null;
}

type AuthProviderProps = {
  children: ReactNode
}

const USER_COLLECTION = '@pizzaapp:users';

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Warning',
        'Email or password field not filled in');
    }

    setIsLoggingIn(true);

    auth().signInWithEmailAndPassword(email, password)
      .then(account => {
        firestore()
          .collection('users')
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            const { name, isAdmin } = profile.data() as User;
            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                isAdmin
              }

              await AsyncStorage
                .setItem(USER_COLLECTION, JSON.stringify(userData));
              setUser(userData);
            }
          }).catch(() => {
            Alert.alert('Login', 'Something went try wrong, try again later')
          })
      }).catch(err => {
        const { code } = err;

        if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
          return Alert.alert('Login ', 'E-mail or password invalid');
        } else {
          return Alert.alert('Login',
            'Something went wrong, try again later');
        }
      }).finally(() => setIsLoggingIn(false));
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function loadUserStorageData() {
    setIsLoggingIn(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLoggingIn(false);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Reset password', 'E-mail field is empty')
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Reset password',
        'We\'ve sent you an email to reset the password'))
      .catch(err => {
        Alert.alert('Reset password', 'Something went wrong, try again later')
      })
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      forgotPassword,
      isLoggingIn,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
