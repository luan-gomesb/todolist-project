import { createContext } from "react"
import useTodoListHook, { useTodoListResponse } from "../presenters/useTodoListHook";

type Props = {
    children?: React.ReactNode;
}

const TodolistContext = createContext<useTodoListResponse | null>(null);
const TodolistProvider = ({ children }: Props) => {
    const [todos, todosDispatch] = useTodoListHook();
    return <TodolistContext.Provider value={[todos, todosDispatch]}>{children}</TodolistContext.Provider>
}
export { TodolistContext, TodolistProvider }