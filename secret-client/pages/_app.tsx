import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { NavBar } from '@/components/navBar';
import React from 'react';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from '../dev';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar />
      <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
        <Component {...pageProps} />
      </DevSupport>
    </Provider>
  );
}
