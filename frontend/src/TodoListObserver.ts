import TodoList, { Item } from '../pages/api/todos/Todolist';
import { TodolistEvent } from './Observable';

export default class TodoListObserver {
  constructor(
    readonly event: TodolistEvent,
    readonly callback: (event: TodolistEvent, item: Item) => void,
  ) { }
}
