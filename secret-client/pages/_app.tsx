import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import { NavBar } from '@/components/navBar';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar />

      <div style={{ marginTop: '100px', minHeight: '90vh' }}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
