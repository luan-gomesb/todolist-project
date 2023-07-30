import { useReducer, useRef, useState } from "react";
import axios from "axios";
import TodoList, { Item } from "../entities/Todolist";
import TodoListObserver from "../TodoListObserver";
import TodoList2 from "../entities/Todolist2";
import Observable from "../Observable";

export type TodoActions = "create" | "toggle" | "remove" | "updateId";
export type TodolistDispatch = (action: TodoActions, payload: any) => void;
export type useTodoListResponse = [Item[], TodolistDispatch];

export default function useTodoListHook(): useTodoListResponse {
	// const todolist = useRef(initialTodoList);
	const observableTodo = (itens?:Item[]) => TodoList2(itens,registerEvents()); 
	 let todolist = observableTodo();
	const [itens, setTodos] = useState<Item[]>([]);
	// registerEvents(todolist);
	const dispatch = (action: TodoActions, payload: any) => {
		todolist = observableTodo(itens);
		switch (action) {
			case "create":
				todolist.create(payload.description);
				setTodos(todolist.list());
				break;
			case "toggle":
				todolist.toggle(payload.id);
				setTodos(todolist.list());
				break;
			case "remove":
				todolist.remove(payload.id);
				setTodos(todolist.list());
				break;
			case "updateId":
				todolist.updateId(payload.id, payload.newid);
				// setTodos([...todolist.items]);
				setTodos(todolist.list());
				break;
			default:
				break;
		}
	};
	return [itens, dispatch];
}
function registerEvents(){
	const apiURl = process.env.NEXT_PUBLIC_API;
		const todolistObserver: Observable = new Observable();
		todolistObserver.register(
			new TodoListObserver("update", async (event: string, item: Item) => {
				console.log(JSON.stringify(item));
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
				let responseId = response.data.id;
				// todolist.updateId(id,responseId);
				console.log(response);
			})
		);
		return todolistObserver;
}
