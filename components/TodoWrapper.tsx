import React from "react";
import {MdDelete} from 'react-icons/md';
import { completeTodo, deleteTodo, ServerTodo } from "../API/todos";

const TodoWrapper = ({
  Task,
  Priority,
  SDeadline,
  CreatedAt,
  Status,
  Id,
}: ServerTodo) => {

  const badgeColor = Priority === "low"
  ? "bg-success"
  : Priority === "normal"
  ? "bg-warning"
  : "bg-error"

  const handleComplete = async() => {
    await completeTodo(Id as string);
  }

  const handleDelete = async() => {
    await deleteTodo(Id as string);
  }
  return (
    <div className="card w-96 bg-primary m-5 text-primary-content shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <h2>{Task}</h2>
        </div>
        <div>
          Due: {SDeadline}
          <div
            className={`px-5 py-3 mx-5 badge text-neutral ${badgeColor}`}
          >
            {Priority.toUpperCase()}
          </div>
        </div>
        <div className="card-actions justify-end">
          {Status === "pending" && <button onClick={handleComplete} className="btn btn-secondary text-secondary-content btn-sm">Completed</button>}
          <button onClick={handleDelete} className="btn btn-secondary btn-sm" ><MdDelete/></button>
        </div>
      </div>
    </div>
  );
};

export default TodoWrapper;
