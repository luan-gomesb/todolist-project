import axios from "axios";
import TodolistAPI from "../Services/TodolistAPI";

export default function useTodoListApi() {
    const service = TodolistAPI("http://localhost:3000/api", axios);
    return service;
}