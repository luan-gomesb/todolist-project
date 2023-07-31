import { useReducer, useRef, useState } from "react";
import axios from "axios";
import TodoList, { Item } from "../../pages/api/todos/Todolist";
import TodoListObserver from "../TodoListObserver";
import TodoList2 from "../../pages/api/todos/Todolist";
import Observable from "../Observable";
import { create } from "domain";

export type TodoActions = "create" | "toggle" | "remove" | "updateId";
export type TodolistDispatch = (action: TodoActions, payload: any) => void;
export type useTodoListResponse = [Item[], TodolistDispatch];

export default function useFunctionList(): useTodoListResponse {
    // const todolist = useRef(initialTodoList);
    const [itens, setItens] = useState<Item[]>([]);
    const observableTodo = (itens?: Item[]) => TodoList2(itens, registerEvents());

    // registerEvents(todolist);
    const dispatch = (action: TodoActions, payload: any) => {
        let todolist = observableTodo([...itens])
        switch (action) {
            case "create":
                todolist.create(payload.description);
                break;
            case "toggle":
                todolist.toggle(payload.id);
                break;
            case "remove":
                todolist.remove(payload.id);
                break;
            case "updateId":
                todolist.updateId(payload.id, payload.newid);
                break;
            default:
                break;
        }

        setItens(() => todolist.list());
    };
    return [itens, dispatch];
}
function registerEvents() {
    const apiURl = process.env.NEXT_PUBLIC_API;
    const todolistObserver: Observable = new Observable();
    todolistObserver.register(
        new TodoListObserver("update", async (event: string, item: Item) => {
            var response = await axios.put(apiURl + "/todos", item);
            console.log(response);
        })
    );
    todolistObserver.register(
        new TodoListObserver("delete", async (event: string, { id }: Item) => {
            if (!id) return false;
            var response = await axios.delete(apiURl + `/todos/${id}`);
            console.log(response);
        })
    );
    todolistObserver.register(
        new TodoListObserver("create", async (event: string, item: Item) => {
            const { id, description, done } = item;
            var response = await axios.post(apiURl + `/todos/`, {
                description,
                done,
            });
            console.log(" create");
            let responseId = response.data.id;
            // dispatch("updateId", {id,newId: responseId});
            console.log(response);
        })
    );
    return todolistObserver;
}
