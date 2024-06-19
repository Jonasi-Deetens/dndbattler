import { ReactNode, createContext, useEffect, useReducer } from 'react';
import {
  login as authLogin,
  logout as authLogout,
  register as authRegister
} from '../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
}

type AuthAction =
  | { type: 'LOGIN_SUCCESS' }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'LOADING' };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false
      };
    case 'LOADING':
      return { ...state, isLoading: true };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOADING' });
    try {
      await authLogin({ email, password });
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAILURE'
      });
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    dispatch({ type: 'LOADING' });
    try {
      await authRegister({ username, email, password, confirmPassword });
      dispatch({ type: 'LOGIN_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      if (err instanceof Error) throw new Error(err.message);
    }
  };

  const logout = () => {
    authLogout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
