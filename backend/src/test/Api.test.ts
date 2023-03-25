import axios from "axios";
import { Item } from "../entitites/Todoslist";

describe('teste api /todos endpoint', ()=> {
    const baseURL = "http://localhost:4000";
    const EP = "/todos";
    const api = axios.create({baseURL});

    test('get /todos to list todos',async () => {
        const response = await api.get(EP);
        const items = await response.data;
        expect(items).toBeDefined();
    });
    test('post /todos -  inset a todo item', async () =>{
        const item:Item = {description:"api item insert",done:false};
        const response = await api.post(EP,item)
       const newItem:Item = await response.data;
        expect(newItem).toBeDefined();
        console.log(newItem);
        expect(newItem.id).toBeDefined();
    })
    test('put /todos - update the status done of an item', async () =>{
        const item:Item = {description:"Insert item and update the status",done:false};
        const response = await api.post(EP,item)
        const newItem : Item =await response.data; 
        expect(newItem).toBeDefined();
        const updateResponse =  await api.put(EP,{...newItem,done:true});
        const updatedItem: Item = await updateResponse.data;
        expect(updatedItem).toBeDefined();
        expect(updatedItem.id).toBe(newItem.id);
        expect(updatedItem.done).toBe(true);
    })
    test('delete /todos/:id -  remove an item rom database',async () => {
        const item:Item = {description:"Insert item and update the status",done:false};
        const response = await api.post(EP,item)
        const newItem : Item =await response.data; 
        expect(newItem).toBeDefined();
        const deleteResponse = await api.delete(`${EP}/${newItem.id}`);
        const data = await deleteResponse.data;
        expect(data).toBeDefined();
        const { removed } = data;
        expect(removed).toBe(true);
        
    })
})