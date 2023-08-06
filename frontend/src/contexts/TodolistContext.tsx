import { createContext, useState } from "react"
import { Todolist } from "../entities/Todolist 2";
import useTodoListHook, { useTodoListResponse } from "../presenters/useTodoListHook";
import TodolistService from "../Services/TodolistAPI";
import TodoListObserver from "../TodoListObserver";

type Props = {
    children?: React.ReactNode;
    service: Todolist
}

const TodolistContext = createContext<useTodoListResponse | null>(null);

const TodolistProvider = ({ children, service }: Props) => {
    const [todos, todosDispatch] = useTodoListHook(service);
    return <TodolistContext.Provider value={[todos, todosDispatch]}>{children}</TodolistContext.Provider>
}

export { TodolistContext, TodolistProvider }
