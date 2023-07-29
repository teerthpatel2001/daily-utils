import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import SVG404 from '../components/404SVG';

const Error = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="h-1/2 w-1/3">
        <SVG404 style={{color: 'hsl(var(--p) / var(--tw-text-opacity))'}} height='100%' width='100%'  />
      </div>
      <Link href="/" ><a className="btn btn-ghost" ><MdArrowBack/>&nbsp;Back to homepage</a></Link>
    </div>
  );
};

export default Error;
