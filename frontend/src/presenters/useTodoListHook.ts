import { useReducer, useRef, useState } from 'react';
import TodoList, { Item } from '../entities/Todolist';
import TodoListObserver from '../TodoListObserver';

export type TodoActions = 'create' | 'toggle' | 'remove';
export type TodolistDispatch = (action: TodoActions, payload: any) => void;
export type useTodoListResponse = [Item[], TodolistDispatch];

export default function useTodoListHook(
  todolist: TodoList,
): useTodoListResponse {
  // const todolist = useRef(initialTodoList);
  const [todos, setTodos] = useState<Item[]>([...todolist.items]);

  const dispatch = (action: TodoActions, payload: any) => {
    switch (action) {
      case 'create':
        todolist.create(payload.description);
        setTodos([...todolist.items]);
        break;
      case 'toggle':
        todolist.toggle(payload.id);
        setTodos([...todolist.items]);
        break;
      case 'remove':
        todolist.remove(payload.id);
        setTodos([...todolist.items]);
        break;
    }
  };

  return [todos, dispatch];
}
