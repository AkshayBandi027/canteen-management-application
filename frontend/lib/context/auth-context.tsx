import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

// ... (AuthContextProps remains the same) ...

type AuthContextProps = {
  authState: {
    token: string | null;
    authenticated: boolean;
    error: string | null; 
    loading: boolean; 
  },
  onRegister: (username: string, email: string, password: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean;
    error: string | null; // Add error state
    loading: boolean; // Add loading state
  }>({
    token: null,
    authenticated: false,
    error: null,
    loading: true, // Set loading to true initially
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setAuthState({
            token,
            authenticated: true,
            error: null,
            loading: false, // Set loading to false after successful load
          });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          setAuthState({
            token: null,
            authenticated: false,
            error: null,
            loading: false, // Set loading to false if no token
          });
        }
      } catch (error) {
        setAuthState({
          token: null,
          authenticated: false,
          error: "Error loading user data", // Set error message
          loading: false,
        });
      }
    };

    loadUser();
  }, []);

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    // Add Input Validation here

    setAuthState({ ...authState, loading: true, error: null }); // Show loading

    try {
      const response = await axios.post(
        //Use HTTPS here: `https://your-backend-url/api/auth/signup`
        `http://localhost:3000/api/auth/signup`,
        { username, email, password }
      );
      return response.data;
    } catch (error: any) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response?.data?.message || "Registration failed", //Set user friendly error message
      });
      throw error; // Re-throw the error to be handled by calling component
    }
  };


  const loginUser = async (email: string, password: string) => {
    setAuthState({ ...authState, loading: true, error: null }); 

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        { email, password }
      );

      setAuthState({
        token: response.data.token,
        authenticated: true,
        error: null,
        loading: false,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync("token", response.data.token);

      return response.data;
    } catch (error: any) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.response?.data?.message || "Login failed", 
      });
      throw error;
    }
  };

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("token");
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
      error: null,
      loading: false,
    });
  };

  const value = {
    authState,
    onRegister: registerUser,
    onLogin: loginUser,
    onLogout: logoutUser,
    isLoading: authState.loading, //Expose loading state to useAuth
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);