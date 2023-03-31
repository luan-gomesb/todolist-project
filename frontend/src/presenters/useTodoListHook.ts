import { useReducer, useRef, useState } from "react";
import axios from "axios";
import TodoList, { Item } from "../entities/Todolist";
import TodoListObserver from "../TodoListObserver";

export type TodoActions = "create" | "toggle" | "remove" | "updateId";
export type TodolistDispatch = (action: TodoActions, payload: any) => void;
export type useTodoListResponse = [Item[], TodolistDispatch];

export default function useTodoListHook(
	todolist: TodoList
): useTodoListResponse {
	// const todolist = useRef(initialTodoList);
	const [todos, setTodos] = useState<Item[]>([...todolist.items]);

	registerEvents(todolist);
	const dispatch = (action: TodoActions, payload: any) => {
		switch (action) {
			case "create":
				todolist.create(payload.description);
				setTodos([...todolist.items]);
				break;
			case "toggle":
				todolist.toggle(payload.id);
				setTodos([...todolist.items]);
				break;
			case "remove":
				todolist.remove(payload.id);
				setTodos([...todolist.items]);
				break;
			case "updateId":
				todolist.updateId(payload.id, payload.newid);
				setTodos([...todolist.items]);
				break;
			default:
				break;
		}
	};
	return [todos, dispatch];
}
function registerEvents(todolist:TodoList){
	const apiURl = process.env.NEXT_PUBLIC_API;
		todolist.register(
			new TodoListObserver("update", async (event: string, item: Item) => {
				console.log(JSON.stringify(item));
				var response = await axios.put(apiURl + "/todos", item);
				console.log(response);
			})
		);
		todolist.register(
			new TodoListObserver("delete", async (event: string, { id }: Item) => {
				if (!id) return false;
				var response = await axios.delete(apiURl + `/todos/${id}`);
				console.log(response);
			})
		);
		todolist.register(
			new TodoListObserver("create", async (event: string, item: Item) => {
				const { id, description, done } = item;
				var response = await axios.post(apiURl + `/todos/`, {
					description,
					done,
				});
				let responseId = response.data.id;
				todolist.updateId(id,responseId);
				console.log(response);
			})
		);
}
