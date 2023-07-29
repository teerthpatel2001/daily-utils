import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useLayoutEffect, useState } from "react";
import { createNewNote, Note, ServerNote } from "../API/notes";
import database, { Auth } from "../API/database";
import NoteWrapper from "../components/NoteWrapper";

const Notes = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notes, setNotes] = useState([]);
  const [displayNotes, setDisplayNotes] = useState(notes);
  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    if (!localStorage.getItem("userId")) {
      router.replace("Login");
      return;
    }

    const userId = localStorage.getItem("userId") as string;
    const userRef = doc(database, "Users", userId);

    onSnapshot(collection(userRef, "Notes"), (data) => {
            
      //@ts-ignore
      setNotes(data.docs.map((item) => {
        return{
          ...item.data(),
          Id: item.id
        };
      }));
      setFetching(false);
    });    
  }, []);

  const createNote = async (event: FormEvent) => {
    event.preventDefault();

    //@ts-ignore
    const noteTitle = event.target.noteTitle.value;
    //@ts-ignore
    const noteDescription = event.target.noteDescription.value;
    //@ts-ignore
    const noteTag = event.target.noteTag.value === "" ? "default" : event.target.noteTag.value;

    setLoading(true);
    const noteId = await createNewNote({ noteTitle, noteDescription, noteTag });
    setLoading(false);
    if (noteId) {
      document.getElementById("new-note-modal")?.click();
      //@ts-ignore
      document.getElementById("new-note-form").reset();
    }
  };

  // todo : filtering search
  useEffect(() => {    
    setDisplayNotes(notes);
  }, [notes])
  useEffect(() => {
    if(search === '')
    {
      setDisplayNotes(notes);
    }else{
      setDisplayNotes(notes.filter((item:ServerNote) => {
        return item.Description.indexOf(search) !== -1 || item.Title.indexOf(search) !== -1 || item.Tag.indexOf(search) !== -1
      }))
    }
  }, [search])

  return (
    <>
      <div className="h-full w-full flex flex-col overflow-x-hidden overflow-y-auto ">
        {/* //! Modal Start */}
        <form onSubmit={(e) => createNote(e)} id="new-note-form">
          <input type="checkbox" id="new-note-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="new-note-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold">Add New Note</h3>
              {/* //todo: New note content start */}

              <div className="form-control w-full mt-4">
                <label className="input-group ">
                  <span>Title</span>
                  <input
                    type="text"
                    name="noteTitle"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>

              <div className="form-control w-full mt-4">
                <label className="input-group ">
                  <span>Description</span>
                  <textarea
                    name="noteDescription"
                    placeholder="Sample text"
                    className="textarea textarea-bordered resize-none w-full"
                    required
                  />
                </label>
              </div>

              <div className="form-control w-full mt-4">
                <label className="input-group ">
                  <span>Tag</span>
                  <input
                    type="text"
                    name="noteTag"
                    placeholder="College"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <button
                className={`btn btn-primary w-full mt-4 ${
                  loading && "loading"
                }`}
                type="submit"
              >
                Create Note
              </button>

              {/* //todo: New note content end */}
            </div>
          </div>
        </form>
        {/* //! Modal End */}

        {/* //? Notes Header start*/}
        <div className="w-full h-12 justify-between  flex items-center px-2">
          <label
            htmlFor="new-note-modal"
            className="btn btn-primary btn-sm modal-button"
          >
            New Note
          </label>
          <input type="text" className="input input-primary input-sm" placeholder="Search Note" onChange={e => setSearch(e.target.value)} />
        </div>
        {/* //? Notes Header end*/}

        {/* //todo: Notes Body Start */}

        {!fetching ? (
          <div className="h-full w-full overflow-x-hidden mt-5 overflow-y-auto flex flex-wrap lg:justify-start justify-center" >
          {displayNotes.map((element:ServerNote) => {
            return (
              <NoteWrapper {...element} key={element.Id} />
            );
          })}
          </div>
        ) : (
          <div className="h-full w-full grid place-items-center">
            <h1 className="btn btn-ghost select-none loading text-base-content">Fetching Data</h1>
          </div>
        )}

        {/* //todo: Notes Body End */}
      </div>
    </>
  );
};

export default Notes;

