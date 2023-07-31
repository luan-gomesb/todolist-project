
import type { NextApiRequest, NextApiResponse } from 'next'
import { Item } from './Todolist';
import TodolistService from './TodolistService';

const tdList = TodolistService.getInstance();
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | null | Item[] | Item>
) {
    let id = req.query.id as string
    if (req.method == "GET") {
        let item = tdList.getItem(id)
        res.status(200).json(item);
    }
    if (req.method == "DELETE") {
        tdList.remove(id)
        res.status(200).send('true')
    }

}