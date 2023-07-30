import Observable from "../Observable";

export type Item = {
	id: string;
	description: string;
	done: boolean;
};
export default function TodoList2(items: Item[] = [], observer?:Observable){
	console.log(observer);

	const getItem = (id: string): Item | null => {
		const [item] = items.filter(({ id: todo }) => todo == id);
		return item || null;
	}
	 const getIndex = (id: string): number | null => {
		const item = getItem(id);
		return item ? items.indexOf(item) : null;
	}
	 const getItemIndex = (id: Item): number  =>{
		return items.indexOf(id);
	}
	 const getId = () :  string => {
		return Math.random().toString().substring(2, 6);
	}

	const list = () : Item[] => {
		return  items
	}
	const create = (description: string): Item => {
		const item: Item = {
			id: getId(),
			description,
			done: true,
		};
		items.push(item);
		observer?.notify("create", item);
		return item;
	}

	const toggle = (id: string): Item | null  => {
		let target = null;
		items = items.map(item => {
			if(item.id == id) {
				target = {...item, done: !item.done};
				return  target
			} 
			return item; });
			if(target){
			observer?.notify("update", target);
			}
		return target;
	}

	const remove = (id: string): void => {
		const removedItem = getItem(id);
		items = items.filter((item) => item.id != id);
		observer?.notify("delete", removedItem);
	}
	const updateId = (id: string, newid: string): boolean => {
		let item = getItem(id);
		if (!item) {
			return false;
		}
		item.id = newid;
		return true;
	}
	return {list, create, toggle,remove,updateId }
}
