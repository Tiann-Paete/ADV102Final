import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../Context/AuthContext'; 
import { BookProvider } from '../Context/BookContext'; 
import '../styles/globals.css'; 

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <BookProvider>
        <Component {...pageProps} />
      </BookProvider>
    </AuthProvider>
  );
};

export default MyApp;
