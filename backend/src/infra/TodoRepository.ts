import { Item } from '../entitites/Todoslist';
export type ItemFind = {
   id?:string
   description?:string
   done?:boolean 
}
export default interface TodoRepository{
    save(item:Item):Promise<Item>
    update(item:Item):Promise<boolean>
    remove(id:string):Promise<boolean>
    list():Promise<Item[]>
    find(param:ItemFind):Promise<Item[]>
    findById(id:string):Promise<Item|null>
}
