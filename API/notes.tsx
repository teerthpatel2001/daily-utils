import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import database from "./database";


export interface Note {
    noteTitle: string;
    noteDescription: string;
    noteTag: string;
}

export interface ServerNote {
    Title: string;
    Description: string;
    Tag: string;
    Id: string;
  }
  
  
  
  // !
  export const createNewNote = async({noteTitle, noteDescription, noteTag}:Note) => {
    
    const userId = localStorage.getItem("userId") as string ;
    const userRef = doc(database, "Users", userId);
    
    const noteId = await addDoc(collection(userRef, "Notes"), {Title: noteTitle, Description: noteDescription, Tag: noteTag}).then(res => res.id).catch(err => false);
    
    return noteId;
  }
  
  // ! 
  export const deleteSingleNote = async(id:string) =>{
    
  const userId = localStorage.getItem("userId") as string ;
  const userRef = doc(database, "Users", userId);
  const result = await deleteDoc(doc(userRef, "Notes", id)).then(res => true).catch(err => false)
  return result;
  }


// !
export const shareNote = async(data:ServerNote) => {
    const result = await setDoc(doc(database, "SharedNotes", data.Id as string), data).then(() => true).catch(() => false);
    return result;
  }

// !
export const getAvailableLanguages = () => {
    const lan = [
        {
          "code": "en",
          "name": "English"
        },
        {
          "code": "ar",
          "name": "Arabic"
        },
        {
          "code": "az",
          "name": "Azerbaijani"
        },
        {
          "code": "cs",
          "name": "Czech"
        },
        {
          "code": "nl",
          "name": "Dutch"
        },
        {
          "code": "fi",
          "name": "Finnish"
        },
        {
          "code": "fr",
          "name": "French"
        },
        {
          "code": "de",
          "name": "German"
        },
        {
          "code": "hi",
          "name": "Hindi"
        },
        {
          "code": "hu",
          "name": "Hungarian"
        },
        {
          "code": "id",
          "name": "Indonesian"
        },
        {
          "code": "ga",
          "name": "Irish"
        },
        {
          "code": "gu",
          "name": "Gujrati"
        },
        {
          "code": "it",
          "name": "Italian"
        },
        {
          "code": "ja",
          "name": "Japanese"
        },
        {
          "code": "ko",
          "name": "Korean"
        },
        {
          "code": "pl",
          "name": "Polish"
        },
        {
          "code": "pt",
          "name": "Portuguese"
        },
        {
          "code": "ru",
          "name": "Russian"
        },
        {
          "code": "es",
          "name": "Spanish"
        },
        {
          "code": "sv",
          "name": "Swedish"
        },
        {
          "code": "tr",
          "name": "Turkish"
        },
        {
          "code": "uk",
          "name": "Ukranian"
        },
        {
          "code": "vi",
          "name": "Vietnamese"
        }
      ];

      return lan;
}