// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import TodoList, { Item } from '../../../src/entities/Todolist';
import TodolistService from './TodolistService';

const tdList = TodolistService.getInstance();
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[] | Item | null>
) {
  if (req.method == "GET") {
    res.status(200).json(tdList.list())
  }
  if (req.method == "POST") {
    let { description } = req.body;
    let item = tdList.create(description);
    res.status(200).json(item);
  }

  if (req.method == "PUT") {
    let { id } = req.body;

    let item = tdList.toggle(id)

    res.status(200).send(item);
  }
}
