import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import TodoList from "../src/entities/Todolist";
import useTodoListHook from "../src/presenters/useTodoListHook";
import TodoListObserver from "../src/TodoListObserver";
import styles from "../styles/Home.module.css";
type Item = {
	id: string;
	description: string;
	done: boolean;
};
type homeProps = {
	data: Item[];
};

export default function Home(props: homeProps) {
	const apiURl = process.env.NEXT_PUBLIC_API;
	const [todo, setTodo] = useState<string>("");
	const todolist = useRef(new TodoList(props.data as Item[]));
	const [todos, todosDispatch] = useTodoListHook(todolist.current);
	useEffect(() => {
		todolist.current.register(
			new TodoListObserver("update", async (event: string, item: Item) => {
				console.log(JSON.stringify(item));
				var response = await axios.put(apiURl + "/todos", item);
				console.log(response);
			})
		);
		todolist.current.register(
			new TodoListObserver("delete", async (event: string, { id }: Item) => {
				if (!id) return false;
				var response = await axios.delete(apiURl + `/todos/${id}`);
				console.log(response);
			})
		);
		todolist.current.register(
			new TodoListObserver("create", async (event: string, item: Item) => {
				const { id, description, done } = item;
				var response = await axios.post(apiURl + `/todos/`, {
					description,
					done,
				});
				let responseId = response.data.id;
				todosDispatch("updateId", { id, newid: responseId });
				console.log(response);
			})
		);
	}, []);

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") {
			const description = e.currentTarget.value;
			if (!description) return;
			todosDispatch("create", { description });
			setTodo("");
		}
	};

	const handleToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		const id = e.currentTarget.dataset.key!;
		todosDispatch("toggle", { id });
	};

	const handleDelete = (e: React.FormEvent<HTMLSpanElement>) => {
		const id = e.currentTarget.dataset.key;
		console.log(id);
		todosDispatch("remove", { id });
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Todolist</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<h1 className={styles.title}>TodoList</h1>
			<main className={styles.main}>
				<div>
					<input
						type="text"
						name="todo"
						id="todo"
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
						onKeyUp={handleEnter}
					/>
				</div>
				<div>
					<hr />
				</div>
				<div className="todo-list-view">
					{todos.map((item) => (
						<div key={item.id} className={item.done ? styles.itemdone : ""}>
							<div>
								<span data-key={item.id} onClick={handleToggle}>
									{item.description}
								</span>{" "}
								-{" "}
								<span
									onClick={handleDelete}
									data-key={item.id}
									style={{ display: "inline-block" }}
								>
									X
								</span>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	// console.log(process.env.NEXT_PUBLICAPI);
	const response = await fetch("http://backend:4000/todos");
	const todos: Item[] = await response.json();
	console.log("backend:", todos);
	return {
		props: {
			data: todos,
		},
	};
};