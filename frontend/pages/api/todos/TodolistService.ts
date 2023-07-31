import TodoList, { Todolist } from "./Todolist";

//singleton memory list
export default class TodolistService {
    private static todoList: Todolist;
    private constructor() {
        TodolistService.todoList = TodoList();
        TodolistService.todoList.create("lets the next backend");
        TodolistService.todoList.create("with some fake taks");
        TodolistService.todoList.create("will be useful to test");
    }
    static getInstance(): Todolist {
        if (!TodolistService.todoList) {
            new TodolistService();
        }
        return TodolistService.todoList;
    }
}