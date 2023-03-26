import TodoList from "../../../src/entities/Todolist";

//singleton memory list
export default class TodolistService {
    private static todoList: TodoList;
    private constructor() {
        TodolistService.todoList = new TodoList();
        TodolistService.todoList.create("lets the next backend");
        TodolistService.todoList.create("with some fake taks");
        TodolistService.todoList.create("will be useful to test");
    }
    static getInstance(): TodoList {
        if (!TodolistService.todoList) {
            new TodolistService();
        }
        return TodolistService.todoList;
    }
}