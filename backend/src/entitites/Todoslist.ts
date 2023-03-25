import TodoRepository from "../infra/TodoRepository";

export interface Item  {
  id?: string;
  description: string;
  done: boolean;
};
export default class Todolist {
  todos: Item[];
  constructor(private repository:TodoRepository) {
    this.todos = [];
  }
  async getTodos(): Item[] {
    return await this.repository.list();
    // return this.todos;
  }
  addItem(item: Item) {
    if (!item.id) {
      item.id = this.createId();
    }
    this.todos.push(item);
  }
  private createId(): string {
    return Math.random().toString().substring(2, 6);
  }
  remove(id: string) {
    this.todos = this.todos.filter((item) => item.id != id);
  }
  toggle(item: Item) {
    this.todos = this.todos.map((todo) => {
      const done = todo.id == item.id ? !todo.done : todo.done;
      return { ...todo, done };
    });
  }
  getStatus(): number {
    const dones = this.todos.filter(({ done }) => done).length;
    return Math.round((dones / this.todos.length) * 100);
  }
  size(): number {
    return this.todos.length;
  }
}
