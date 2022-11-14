import { Item } from '../entitites/Todoslist';
import TodoRepositoryMongoDB from '../infra/TodoRepositoryMongoDB';
describe.skip('Testing mongo db operations',() =>{
    afterAll(()=>{
        repository.close();
    })
        const repository =  new TodoRepositoryMongoDB();
    test('should insert a item', async() =>{
        const item : Item = {
           description:"Todos teste description",
           done:false
        } 
        const ret = await repository.save(item)
        expect(ret.id).toBeDefined();
    })

    test(' list todos on repository',async () => {
        const ret :Item[] = await repository.list()
        expect(ret.length).toBeGreaterThan(0);
        console.log(ret[0].id)
        expect(ret[0].id).toBeDefined();
    });
    test('update todolist item done status',async() => {
        const item:Item = {
            description:'item tha will be done',
            done:false
        }
        const newItem = await repository.save(item);
        expect(newItem.id).toBeDefined();
        const updatedItem = await repository.update({...newItem,done:true});
        expect(updatedItem).toBe(true);
    })
    test('find todolist filterer',async () => {
      const desc = 'item tha will be done';
      const sameDesc = (i:Item) => i.description == desc;
      const sameStatus = (i:Item) => i.description == desc;
      const findDone = await repository.find({done:true});
      expect(findDone.length).toBeGreaterThan(0)
      expect(findDone.every(sameStatus)).toBe(true);
      const findById = await repository.find({description:desc});
      expect(findById.every(sameDesc)).toBe(true);
    });
    test(' get todoItem by id',async() => {
        const item:Item = { description:'item tha will be done', done:false }
        const newItem = await repository.save(item);
        const findbyidItem = await repository.findById(newItem.id!.toString());
        expect(findbyidItem).toBeDefined();
        expect(findbyidItem?.description).toBe(item.description);
        
    })
})