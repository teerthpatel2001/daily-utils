import { collection, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FormEvent, useLayoutEffect, useState } from "react";
import Database from "../API/database";
import { createNewTodo, ServerTodo } from "../API/todos";
import TodoWrapper from "../components/TodoWrapper";

const Todo = () => {

  const date = new Date();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [todos, setTodos] = useState([]);
  const today = `${date.getFullYear()}-${date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0'+(date.getMonth()+1)}-${date.getDate()}`

  // * Creating new todo
  const handleSubmit = async(event:FormEvent) =>{
    const form = document.getElementById('my-todo-form') as HTMLFormElement;
    event.preventDefault();
    

    const task = form.task.value;
    const priority = form.priority.value;
    const deadline = form.deadline.value === "" ? new Date() : form.deadline.value;
    
    

    setLoading(true)
    const success = await createNewTodo({task, priority, deadline});
    setLoading(false)
    if(success)
    {
      document.getElementById("new-todo-modal")?.click();
      form.reset();
    }
    
    
  }

  // * Creating Channel for todos
  useLayoutEffect(() => {
    const userId = localStorage.getItem("userId");
    if(!userId){
      router.replace("Login");
      return
    }
    const userRef = doc(Database, "Users", userId as string);
    onSnapshot(collection(userRef, "Todos") , (data) => {
      // @ts-ignore
      setTodos(data.docs.map((item) => {
        const {Task, Priority, Deadline, CreatedAt, Status} = item.data() as ServerTodo;
        return{
          Task,
          Priority,
          Deadline,
          CreatedAt,
          Status,
          Id: item.id
        }

      }))
      setFetching(false);
    })
  }, [])

  // todo: Toggling Completed Div
  const toggleCompleted = () => {
    document.getElementById("completed-div")?.classList.toggle("hidden")
  }

  return (
    <div className="h-full w-full overflow-hidden flex flex-col items-center justify-between">
      {/* //! Todo Header start */}
      <div className="w-full h-11 flex items-center px-5">
        <label
          htmlFor="new-todo-modal"
          className="btn btn-primary btn-sm modal-button"
        >
          new todo
        </label>
        <label className="btn btn-sm btn-secondary mx-5" onClick={toggleCompleted} >completed todos</label>
      </div>
      {/* //! Todo Header End */}

      {/* //* MOdal  start */}
      <input type="checkbox" id="new-todo-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-base-300 text-base-content">
          <label
            htmlFor="new-todo-modal"
            onClick={() => (document.getElementById('my-todo-form') as HTMLFormElement).reset()}
            className="btn btn-primary btn-sm btn-circle absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="text-lg text-primary mb-2 font-bold">Add New Todo</h3>
          {/* //* MOdal content start */}
          <form id="my-todo-form" onSubmit={(event) => handleSubmit(event)} >
            <div className="input-group my-5">
              <span className="bg-primary text-primary-content">Task</span>
              <input
                type="text"
                id="task-inp"
                name="task"
                required
                className="input input-primary w-full text-base-content"
                placeholder="Submit DE Report"
              />
            </div>
            <div className="input-group">
              <span className="bg-primary text-primary-content">Priority</span>
              <div className="w-full ml-5 flex justify-between">
                <label htmlFor="low" className="text-success">
                  Low
                </label>
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  required
                  className="radio radio-primary mx-3 text-base-content"
                />
                <label htmlFor="low" className="text-warning">
                  Normal
                </label>
                <input
                  type="radio"
                  name="priority"
                  value='normal'
                  required
                  defaultChecked
                  className="radio radio-primary mx-3 text-base-content"
                />
                <label htmlFor="low" className="text-error">
                  Urgent
                </label>
                <input
                  type="radio"
                  name="priority"
                  value='urgent'
                  className="radio radio-primary  ml-3 text-base-content"
                />
              </div>
            </div>
            <div className="input-group my-5">
              <span className="bg-primary text-primary-content">Deadline</span>
              <input type="date" name="deadline" id="" className="input input-primary w-full" min={today} />
            </div>
            <input type="submit" value="Create TODO" className={`btn w-full btn-primary ${loading && "loading"}`} />
          </form>
          {/* //* MOdal content End */}

        </div>
      </div>
      {/* //* MOdal  End */}

      {/* //todo: Todo Display Start */}
      {!fetching ? (<div className="h-full w-full flex flex-col lg:flex-row">

      <div className="h-full w-full overflow-x-hidden overflow-y-auto flex items-start flex-wrap justify-around">
        {
          todos.map((item:ServerTodo, index) =>{
            return item.Status === "pending" && <TodoWrapper {...item} SDeadline={new Date(item.Deadline).toLocaleDateString()} key={index} />
          })
        }
      </div>
      <div className="w-full lg:w-1/2  h-full overflow-y-hidden hidden" id="completed-div">
        <h1 className="w-96 h-min text-2xl text-primary font-bold ml-5" >COMPLETED</h1>
        <div className=" h-full w-full overflow-x-hidden overflow-y-auto">

        {
          todos.filter((item:ServerTodo) => item.Status !== "pending").length ? todos.map((item:ServerTodo, index) =>{
            return item.Status !== "pending" && <TodoWrapper {...item} SDeadline={new Date(item.Deadline).toLocaleDateString()} key={index} />
          }) : <label className="w-96 ml-5 mt-5 text-secondary text-xl">Nothing Here...</label>
        }
        </div>
      </div>
        </div>): (
          <div className="h-full w-full grid place-items-center">
            <h1 className="btn btn-ghost select-none loading text-base-content">Fetching Data</h1>
          </div>
        )}
      {/* //todo: Todo Display End */}
    </div>
  );
};

export default Todo;
