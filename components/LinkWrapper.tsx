import React from "react";
import { deleteSingleLink, ServerLink } from "../API/linkshort";
import {RiFileCopy2Line, RiShareCircleFill} from 'react-icons/ri';
import { MdDelete } from "react-icons/md";

const LinkWrapper = ({ Long, Short, CreatedAt, Id }: ServerLink) => {

    const handleDelete = async() => {
        await deleteSingleLink(Id);
    }

    const popout = () => {
        window.open(Short, "_blank");
    }
    
    const copy = () => {
        navigator.clipboard.writeText(Short);
    }

  return (
    <div className="card w-96 bg-primary m-5 text-primary-content shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <h2>{Short}</h2>
        </div>
        <div>
          {Long}
        </div>
        <div className="card-actions justify-end">
            <button
            onClick={copy}
              className="btn btn-secondary text-secondary-content btn-sm"
            >
              <RiFileCopy2Line/>
            </button>
            <button
            onClick={popout}
              className="btn btn-secondary text-secondary-content btn-sm"
            >
              <RiShareCircleFill/>
            </button>
          <button onClick={handleDelete} className="btn btn-secondary btn-sm">
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkWrapper;
