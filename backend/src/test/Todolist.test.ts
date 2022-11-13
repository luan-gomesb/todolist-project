import { setTextRange, tokenToString } from 'typescript';
import Todolist, { Item } from '../Todoslist';
const getItem = (description: string): Item => {
  return { description, done: false } as Item;
};
describe('test Todoslist Entity', () => {
  test('should create a todolist and add 1 item', () => {
    const todlist = new Todolist();
    expect(todlist.size()).toBe(0);
    todlist.addItem(getItem('Teste item'));
    expect(todlist.size()).toBe(1);
  });
  test('should create return all itens', () => {
    const todolist = new Todolist();
    todolist.addItem(getItem('first item'));
    todolist.addItem(getItem('second item'));
    expect(todolist.getTodos()).toHaveLength(2);
  });
  test('should be able to delete an item', () => {
    const todolist = new Todolist();
    todolist.addItem(getItem('first'));
    todolist.addItem(getItem('second'));
    todolist.addItem(getItem('third'));
    const list = todolist.getTodos();
    expect(list).toHaveLength(3);
    const item = list[0];
    todolist.remove(item.id!);
    expect(todolist.getTodos()).toHaveLength(2);
  });
  test('should be able to toggle done status of an item', () => {
    const todos = new Todolist();
    todos.addItem(getItem('first item'));
    expect(todos.getStatus()).toBe(0);
    const item = todos.getTodos()[0];
    todos.toggle(item);
    const item2 = todos.getTodos()[0];
    expect(item2.done).toBe(true);
  });
  test('should update status of list', () => {
    const todos = new Todolist();
    todos.addItem(getItem('fisrt'));
    expect(todos.getStatus()).toBe(0);
    todos.addItem(getItem('second'));
    const item = todos.getTodos()[0];
    todos.toggle(item);
    expect(todos.getStatus()).toBe(50);
    const sec = todos.getTodos()[1];
    todos.toggle(sec);
    expect(todos.getStatus()).toBe(100);
  });
});
