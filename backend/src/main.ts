import express, { Request, Response } from 'express';
import Todolist, { Item } from './Todoslist';
const app = express();
app.use(express.json());

const todos = new Todolist();
const initialTodos: Item[] = [
  { description: 'build todolist', done: false },
  { description: 'build todolist persistence', done: false },
  { description: 'refactor todo list', done: false },
];
initialTodos.forEach((item) => todos.addItem(item));

app.get('/todos', (req: Request, res: Response) => {
  res.json(todos.getTodos());
});
app.post('/todos', (req: Request, res: Response) => {
  const item = req.body;
  todos.addItem(item);
  res.status(200).send();
});
app.put('/todos', (req: Request, res: Response) => {
  const item = req.body;
  todos.toggle(item);
  res.status(200).send();
});

app.delete('/todos/${id}', (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    todos.remove(id);
  }
  res.status(200).send();
});
app.listen(4000);
