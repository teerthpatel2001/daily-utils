import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Database from "./database";

export interface ClientTodo {
    task : string;
    priority: string;
    deadline: string;
}

export interface ServerTodo {
    Task : string;
    Priority: string;
    Deadline: number;
    SDeadline: string;
    CreatedAt: number;
    Status: string;
    Id?: string;
}

export const createNewTodo = async({task, priority, deadline}:ClientTodo) => {
    const userId = localStorage.getItem("userId") as string;
    const userRef = doc(Database, "Users", userId)
    
    const result = await addDoc(collection(userRef, "Todos"), {Task: task, Priority: priority, Deadline: new Date(deadline).getTime(), CreatedAt: new Date().getTime(), Status: "pending"}).then(() => true).catch(() => false);
    return result;
}

export const completeTodo = async(todoId:string) =>{
    const userId = localStorage.getItem("userId") as string;
    const userRef = doc(Database, "Users", userId)

    const result = await updateDoc(doc(userRef, "Todos", todoId), {Status: "completed"}).then(() => true).catch(() => false);
    return result;
}

export const deleteTodo = async(todoId:string) =>{
    const userId = localStorage.getItem("userId") as string;
    const userRef = doc(Database, "Users", userId)

    const result = await deleteDoc(doc(userRef, "Todos", todoId)).then(() => true).catch(() => false);
    return result;
}