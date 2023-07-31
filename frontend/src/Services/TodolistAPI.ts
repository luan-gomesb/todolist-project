import TodoList, { Item } from "../../pages/api/todos/Todolist";

export interface HttpService {
    get: (endpoint: string) => Promise<any>;
    post: (endpoint: string, data: any) => Promise<any>;
    put: (endpoint: string, data: any) => Promise<any>;
    delete: (endpoint: string) => Promise<any>;
}

export type TodolistAPIResponse = {
    list: () => Promise<any>;
    create: (item: Item) => Promise<any>;
    update: (item: Item) => Promise<any>;
    remove: (id: string) => Promise<any>;
}

export default function TodolistAPI(apiUrl: string, httpService: HttpService): TodolistAPIResponse {

    const list = async () => {
        const response = await httpService.get(`${apiUrl}/todos/`);
        return response.data;
    }

    const create = async (item: Item) => {
        const { description, done } = item;
        const response = await httpService.post(`${apiUrl}/todos/`, {
            description,
            done,
        });
        return response.data;
    }

    const update = async (item: Item) => {
        var response = await httpService.put(`${apiUrl}/todos/`, item);
        var updatedItem = await response.json();
        console.log(updatedItem);
        return updatedItem;
    }

    const remove = async (id: string): Promise<any> => {
        if (id)
            var response = await httpService.delete(`${apiUrl}/todos/${id}`);
        console.log(response);
        return response.json();
    }
    return { list, create, update, remove }
}

