import TodoRepository, { ItemFind } from "./TodoRepository";
import mongoose,{isObjectIdOrHexString, Model, Schema, Types} from 'mongoose'
import { Item } from '../entitites/Todoslist';

export default class TodoRepositoryMongoDB implements TodoRepository {
    todoScheme:Schema<Item>;
    todoModel:Model<Item>;

    constructor() {
        mongoose.connect('mongodb://localhost:27017/todolistdb');
         this.todoScheme = new Schema<Item>({
            description: { type: String, required: true },
            done: { type: Boolean, required: true },
        });

        this.todoModel = mongoose.model<Item>('todos', this.todoScheme);
    }
    async findById(id: string): Promise<Item|null> {
        return await this.todoModel.findById(id).exec();
    }
    async list(): Promise<any> {
        return await this.todoModel.find()
    }
    async save(item:Item): Promise<Item> {
        const todoItem = new this.todoModel(item);
        return await todoItem.save();
    }
    async update(item: Item): Promise<boolean> {
        const ret =  await this.todoModel.updateOne(item,{done:item.done});
        return ret.acknowledged;
    }
    async find(param: ItemFind): Promise<Item[]> {
        return this.todoModel.find(param);
    }
    async close(){
        mongoose.connection.close();
    }

}