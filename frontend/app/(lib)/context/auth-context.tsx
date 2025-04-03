import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextProps = {
  authState?: {
    token: string | null;
    authenticated: boolean;
  };
  OnRegister?: (
    username: string,
    email: string,
    password: string
  ) => Promise<any>;
  OnLogin?: (email: string, password: string) => Promise<any>;
  OnLogout?: () => Promise<any>;
};

export const AuthContext = createContext<AuthContextProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
  }>({
    token: null,
    authenticated: false,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };

    loadUser();
  }, []);

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        {
          username,
          email,
          password,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;

      await SecureStore.setItemAsync('token', response.data.token);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync('token');

    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: registerUser,
    onLogin: loginUser,
    onLogout: logoutUser,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
