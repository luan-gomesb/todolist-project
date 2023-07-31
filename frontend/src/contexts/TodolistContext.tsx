import { createContext, useState } from "react"
import useTodoListHook, { useTodoListResponse } from "../presenters/useTodoListHook";
import TodolistService from "../Services/TodolistAPI";
import TodoList, { Item } from "../../pages/api/todos/Todolist";
import TodoListObserver from "../TodoListObserver";

type Props = {
    children?: React.ReactNode;
    service: TodoList
}

const TodolistContext = createContext<useTodoListResponse | null>(null);

const TodolistProvider = ({ children, service }: Props) => {
    const [todos, todosDispatch] = useTodoListHook(service);
    return <TodolistContext.Provider value={[todos, todosDispatch]}>{children}</TodolistContext.Provider>
}

export { TodolistContext, TodolistProvider }