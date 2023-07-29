import type { NextPage } from "next";
import Link from "next/link";
import LinksSVG from "../components/LinksSVG";
import NotesSVG from "../components/NotesSVG";
import TodosSVG from "../components/TodosSVG";

const Home: NextPage = () => {
  return (
    <div className="overflow-x-hidden overflow-y-auto h-full w-full flex flex-col ">


      <div className="h-full min-h-full w-full">
        <div className="h-full w-full  grid lg:grid-cols-2 place-items-center">

          <div className="c1-left h-full w-full pl-9 flex flex-col justify-center items-start ">
            <h1 className="text-5xl text-primary font-bold">Notes</h1>
            <h3 className="text-2xl text-base-content btn btn-sm btn-ghost btn-disabled p-0 ">Features</h3>
            <ul className="list-disc list-inside">
              <li className="list-item text-xl">Save Note With <span className="text-primary" >Title</span>, <span className="text-primary">Description</span> & <span className="text-primary">Tag</span></li>
              <li className="list-item text-xl">Access Notes <span className="text-primary">Anywhere</span>, <span className="text-primary">Anytime</span>, <span className="text-primary">Any Device</span></li>
              <li className="list-item text-xl">Share Your Notes To <span className="text-primary">Anyone</span> With One Click</li>
              <li className="list-item text-xl"><span className="text-primary">Translate</span> Your Note To Different Languages In Snap</li>
            </ul>
            <Link href="Notes" ><a className="btn btn-primary btn-sm my-3" >get started</a></Link>
          </div>

          <div className="c1-right hidden lg:block h-full">
            <NotesSVG className="text-primary object-cover h-full w-[98%]" />
          </div>
        </div>
      </div>


      <div className="h-full min-h-full w-full">
        <div className="h-full w-full grid lg:grid-cols-2 place-items-center">

          <div className="c1-left h-full w-full hidden lg:block ">
            <TodosSVG className="text-primary object-cover h-full w-[98%]" />
          </div>

          <div className="c1-right h-full w-full pl-9 flex flex-col justify-center items-start ">
          <h1 className="text-5xl text-primary font-bold">To-Do</h1>
            <h3 className="text-2xl text-base-content btn btn-sm btn-ghost btn-disabled p-0 ">Features</h3>
            <ul className="list-disc list-inside">
              <li className="list-item text-xl">Create To-Do With <span className="text-primary" >Task</span>, <span className="text-primary">Priority</span> & <span className="text-primary">Deadline</span></li>
              <li className="list-item text-xl">Mark Your Tasks <span className="text-primary">Completed</span> After It&apos;s Done.</li>
              <li className="list-item text-xl"><span className="text-primary">Elegant</span>, <span className="text-primary">Easy To Use</span> UI</li>
            </ul>
            <Link href="Todo" ><a className="btn btn-primary btn-sm my-3" >get started</a></Link>
          </div>
        </div>
      </div>


      <div className="h-full min-h-full max-h-full w-full">
        <div className="h-full w-full  grid lg:grid-cols-2 place-items-center">

          <div className="c1-left h-full w-full pl-9 flex flex-col justify-center items-start ">
            <h1 className="text-5xl text-primary font-bold">Link Short</h1>
            <h3 className="text-2xl text-base-content btn btn-sm btn-ghost btn-disabled p-0 ">Features</h3>
            <ul className="list-disc list-inside">
              <li className="list-item text-xl">Convert <span className="text-primary" >Lengthy</span>, <span className="text-primary">Hard To Read</span> URLs Into <span className="text-primary">Short </span>Link</li>
              <li className="list-item text-xl">Shorted Links are Persistant & Accessible Upto <span className="text-primary">1 Year</span></li>
              <li className="list-item text-xl"><span className="text-primary">Protect</span> Your Links With <span className="text-primary">D-DOS Protection</span></li>
              <li className="list-item text-xl"><span className="text-primary">No Ads</span>, <span className="text-primary">Clean UI</span></li>
            </ul>
            <Link href="Linkshort" ><a className="btn btn-primary btn-sm my-3" >get started</a></Link>
          </div>

          <div className="c1-right hidden lg:block h-full">
            <LinksSVG className="text-primary object-cover h-[90%] w-[98%]" />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
