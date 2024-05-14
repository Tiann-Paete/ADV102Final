import React, { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError, UserCredential, User } from "firebase/auth";
import { useRouter } from "next/router";
import { firebaseApp } from "../Firebase/firebaseConfig";
import Swal from 'sweetalert2';

interface IUser {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User | null; 
  createUser: (user: IUser) => Promise<UserCredential>;
  signInUser: (user: IUser) => Promise<UserCredential>;
  authError: string | null;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Initialize user state
  const [authError, setAuthError] = useState<string | null>(null);
  const authInstance = getAuth(firebaseApp);
  const router = useRouter();

  const createUser = async (user: IUser) => {
    return new Promise<UserCredential>((resolve, reject) => {
      createUserWithEmailAndPassword(authInstance, user.email, user.password)
        .then(userCredential => {
          setAuthError(null);
          setUser(userCredential.user); // Set user after successful creation
          resolve(userCredential);
        })
        .catch(error => {
          handleAuthError(error as AuthError);
          reject(error);
        });
    });
  };

  const signInUser = async (user: IUser) => {
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithEmailAndPassword(authInstance, user.email, user.password)
        .then(userCredential => {
          setAuthError(null);
          setUser(userCredential.user); // Set user after successful sign-in
          router.push("/home"); // Redirect to home page
          resolve(userCredential);
        })
        .catch(error => {
          handleAuthError(error as AuthError);
          reject(error);
        });
    });
  };

  const handleAuthError = (error: AuthError) => {
    let errorMessage = "An error occurred";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Proceed to Login.";
      Swal.fire({
        icon: 'error',
        title: 'Account Already Registered',
        text: errorMessage,
        confirmButtonColor: "#0b5394",
        confirmButtonText: 'OK'
      }).then(() => {
        router.push("/");
      });
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Weak password";
    } else {
      errorMessage = error.message;
    }
    setAuthError(errorMessage);
  };

  const value: IAuthContext = {
    user, // Include user in context value
    createUser,
    signInUser,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
