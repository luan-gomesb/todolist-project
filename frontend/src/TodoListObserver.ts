import TodoList, { Item } from './entities/Todolist';
import { TodolistEvent } from './Observable';

export default class TodoListObserver {
  constructor(
    readonly event: TodolistEvent,
    readonly callback: (event: TodolistEvent, item: Item) => void,
  ) {}
}
