import Observable from '../Observable';

export type Item = {
  id: string;
  description: string;
  done: boolean;
};
export default class TodoList extends Observable {
  items: Item[];
  constructor(items: Item[] = []) {
    super();
    this.items = items;
  }
  list() {
    return this.items;
  }
  create(description: string): Item {
    const item: Item = {
      id: this.getId(),
      description,
      done: false,
    };
    this.items.push(item);
    this.notify('create', item);
    return item;
  }
  getItem(id: string): Item | null {
    const [item] = this.items.filter(({ id: todo }) => todo == id);
    return item || null;
  }
  private getIndex(id: string): number | null {
    const item = this.getItem(id);
    return item ? this.items.indexOf(item) : null;
  }
  private getItemIndex(id: Item): number {
    return this.items.indexOf(id);
  }
  private getId(): string {
    return Math.random().toString().substring(2, 6);
  }

  toggle(id: string): void {
    const index = this.getIndex(id);
    if (index != null && index >= 0) {
      this.items[index].done = !this.getItem(id)!.done;
      this.notify('update', this.items[index]);
    }
  }
  remove(id: string): void {
    this.items = this.items.filter((item) => item.id != id);
    this.notify('delete', id);
  }
}
