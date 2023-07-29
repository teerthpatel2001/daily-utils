import axios from "axios";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import Database from "./database";


export interface ClientLink{
    Long: string;
    Short: string;
    CreatedAt: Long;
}

export interface ServerLink{
    Long: string;
    Short: string;
    Id: string;
    CreatedAt: Long;
}

export const shortLink = async(long:string) => {
    const url = `https://api.upto.site/short`;
    const body = {
        long: long,
    }
    const Short = await axios.post(url, body).then((res:any) => res.data.shortUrl).catch(() => false)
    if(!Short) return false;

    const userId = localStorage.getItem("userId") as string ;
    const userRef = doc(Database, "Users", userId);

    const linkId = await addDoc(collection(userRef, "Links"), {Long: long, Short: Short, CreatedAt: new Date().getTime()}).then(res => res.id).catch(() => false);
    return linkId;
}

// ! 
export const deleteSingleLink = async(id:string) =>{
    
    const userId = localStorage.getItem("userId") as string ;
    const userRef = doc(Database, "Users", userId);
    const result = await deleteDoc(doc(userRef, "Links", id)).then(res => true).catch(err => false)
    return result;
    }