import { useReducer, useRef, useState } from "react";
import TodoList, { Item, Todolist } from "../../pages/api/todos/Todolist";

export type TodoActions = "create" | "toggle" | "remove" | "updateId" | "load";
export type TodolistDispatch = (action: TodoActions, payload: any) => void;
export type useTodoListResponse = [Item[], TodolistDispatch];

export default function useTodoListHook(service: Todolist): useTodoListResponse {
    // const todolist = useRef(initialTodoList);
    const [itens, setItens] = useState<Item[]>([]);

    // registerEvents(todolist);
    const dispatch = async (action: TodoActions, payload: any) => {
        switch (action) {
            case "create":
                console.log('payload', payload)
                service.create(payload.item);
                break;
            case "toggle":
                service.toggle(payload.id);
                break;
            case "remove":
                service.remove(payload.id);
                break;
            case "updateId":
                service.updateId(payload.id, payload.newid);
                break;
            case "load":
                service.load(payload.items);
                break;
            default:
                break;
        }
        console.log(service.list());
        setItens(() => service.list());
    };
    return [itens, dispatch];
}
