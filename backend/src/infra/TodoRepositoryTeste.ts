import TodoRepository, { ItemFind } from "./TodoRepository";
import mongoose,{isObjectIdOrHexString, Model, Schema, Types} from 'mongoose'
import { Item } from '../entitites/Todoslist';

export default class TodoRepositoryPrisma implements TodoRepository {
    
    list : Item[]
    constructor() {
       this.list = []; 
         
    }

    async findById(id: string): Promise<Item|null> {
        return this.list[id]
    }

    async list(): Promise<Item[]> {
       return this.list; 
    }
    async save(item:Item): Promise<Item> {
        const todoItem = new this.todoModel(item);
        return await todoItem.save();
    }
    async update(item: Item): Promise<boolean> {
        const ret =  await this.todoModel.updateOne({_id:item.id},{done:item.done});
        return ret.acknowledged;
    }
    async find(param: ItemFind): Promise<Item[]> {
        return await this.todoModel.find(param);
    }
    async remove(id: string): Promise<boolean> {
        // const response =  await this.todoModel.findByIdAndDelete(id);
        const response =  await this.todoModel.deleteOne({_id:id});
        return response.acknowledged;
    }
    async close(){
        mongoose.connection.close();
    }

}
