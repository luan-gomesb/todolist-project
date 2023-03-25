import { textSpanEnd } from 'typescript';
import TodoList from '../entities/Todolist';

describe('Todo list unit test', () => {
  let sut: TodoList;
  beforeEach(() => {
    sut = new TodoList();
  });
  test('should return items as list', () => {
    const list = sut.list();
    expect(list).toHaveLength(0);
  });

  test('should create an item and return itself', () => {
    const description = 'new item';
    const newitem = sut.create(description);
    expect(sut.list()).toHaveLength(1);
    expect(newitem.id).toBeTruthy();
  });

  test('should get Item by Id', () => {
    const myItem = sut.create('myitem');
    const newItem = sut.getItem(myItem.id);
    expect(myItem).toBe(newItem);
  });

  test('should toggle item done status', () => {
    sut.create('test item 0');
    let newItem = sut.create('test item');
    sut.create('test item 2');
    sut.toggle(newItem.id);
    expect(sut.getItem(newItem.id)!.done).toBe(true);
  });

  test('should remove an item', () => {
    sut.create('first item');
    const { id } = sut.create('teste item');
    expect(sut.list()).toHaveLength(2);
    sut.remove(id);
    expect(sut.list()).toHaveLength(1);
  });
});
