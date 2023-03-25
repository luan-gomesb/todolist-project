import express, { NextFunction, Request, Response } from 'express';
import Todolist, { Item } from './entitites/Todoslist';
import TodoRepositoryMongoDB from './infra/TodoRepositoryMongoDB';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())

const repository = new TodoRepositoryMongoDB();
const logger = (req: Request, res: Response,next:NextFunction) => {
  console.log('url:',req.url);
  console.log('method:',req.method);
  console.log('params:',req.params);
  console.log('body:',req.body);
  console.log("----\n")
  // console.log('headers',req.headers);
  next();
}

//httpServe -> constroller->casodeuso -> repositorio -> banco

app.get('/todos',logger, async (req: Request, res: Response,) => {
  const getall = await repository.list();
  res.json(getall);
});

app.post('/todos',logger, async (req: Request, res: Response) => {
  const {description,done} = req.body;

  const newItem  = await repository.save({description,done})
  
  const reponseItem:Item = {id:newItem.id?.toString(),description:newItem.description,done:newItem.done}
  res.status(200).json(reponseItem);
});

app.put('/todos',logger,async (req: Request, res: Response) => {
  const {id,description,done} = req.body;
  const item:Item = {id,description,done};
  const response = await repository.update(item)
  if(response){
  res.status(200).json(item);
  }else{
    res.status(500).send();
  }
});

app.delete('/todos/:id',logger,async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    const removedResponse = await repository.remove(id);
    res.json({removed:removedResponse})
  }
});

app.listen(4000);
