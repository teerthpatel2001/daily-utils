import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { resetPassword } from "../API/user";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const reset = async (e:FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    document.getElementsByTagName("form")[0].reset();
    setLoading(false);
  };

  return (
    <form className="h-full w-full" onSubmit={(e) => reset(e)} >
      <div className="h-full w-full grid place-items-center">
        <div className=" h-2/5 w-96  flex flex-col justify-evenly items-center">
          {/* //! Logo */}

          <div className="w-11/12 flex justify-end">
            <span className="text-3xl font-semibold text-base-content">
              Reset
            </span>
            <span className="text-3xl font-semibold text-primary">
              Password
            </span>
          </div>

          {/*//! Email Input */}
          <div className="form-control w-11/12 ">
            <label className="input-group ">
              <span>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="email"
                id="userEmail"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@somewhere.com"
                required
                className="input input-bordered w-11/12"
                value={email}
              />
            </label>
          </div>

          {/* //! Login Button */}
          <button
            className={`btn btn-primary w-11/12 ${loading && "loading"}`}
            type="submit"
          >
            Send Link
          </button>
          <Link href="Login" ><a className="btn btn-sm btn-ghost place-self-end mr-3 text-primary"><MdArrowBack className="mr-2" />Login</a></Link>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
