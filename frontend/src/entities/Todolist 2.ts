import Observable from "../Observable";

export type Item = {
    id?: string | null;
    description: string;
    done: boolean;
};
export type Todolist = {
    list: () => Item[];
    load: (newItens: Item[]) => Item[];
    create: (item: Item) => Item;
    toggle: (id: string) => Item | null;
    remove: (id: string) => void;
    updateId: (id: string, newid: string) => boolean;
}
export default function TodoList(itens: Item[] = [], observer?: Observable) {

    const getIndex = (id: string): number | null => {
        const item = getItem(id);
        return item ? itens.indexOf(item) : null;
    }

    const getItemIndex = (id: Item): number => {
        return itens.indexOf(id);
    }
    const getId = (): string => {
        return Math.random().toString().substring(2, 6);
    }

    const getItem = (id: string): Item | null => {
        const [item] = itens.filter(({ id: todo }) => todo == id);
        return item || null;
    }

    const list = (): Item[] => {
        return itens.concat([]);
    }
    const load = (newItens: Item[]) => {
        itens = [...itens, ...newItens];
        return [...itens];
    }
    const create = (item: Item): Item => {
        itens.push(item);
        return item;
    }

    const toggle = (id: string): Item | null => {
        let target = null;
        itens = itens.map(item => {
            if (item.id == id) {
                target = { ...item, done: !item.done };
                return target
            }
            return item;
        });
        if (target) {
            observer?.notify("update", target);
        }
        return target;
    }

    const remove = (id: string): void => {
        const removedItem = getItem(id);
        itens = itens.filter((item) => item.id != id);
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
    return { list, load, create, toggle, remove, updateId }
}
