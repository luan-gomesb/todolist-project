import TodoListObserver from './TodoListObserver';

export default class Observable {
  private observers: TodoListObserver[];
  constructor() {
    this.observers = [];
  }
  register(observer: TodoListObserver) {
    this.observers.push(observer);
  }
  notify(event: TodolistEvent, args: any) {
    for (const observer of this.observers) {
      if (observer.event == event) {
        observer.callback(event, args);
      }
    }
  }
}
export type TodolistEvent = 'create' | 'update' | 'delete';
