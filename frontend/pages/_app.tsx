import { TodolistProvider } from '../src/contexts/TodolistContext'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<TodolistProvider> <Component {...pageProps} /> </TodolistProvider>)
}
