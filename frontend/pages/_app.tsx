import { TodolistProvider } from '../src/contexts/TodolistContext'
import 'bootstrap/dist/css/bootstrap.css';
// import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TodoList from './api/todos/Todolist';

export default function App({ Component, pageProps }: AppProps) {
  const todolist = TodoList([]);
  return (<TodolistProvider service={todolist}> <Component {...pageProps} /> </TodolistProvider>)
}
