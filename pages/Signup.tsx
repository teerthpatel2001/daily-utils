import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useLayoutEffect, useState } from "react";
import { userSignup } from "../API/user";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const user = localStorage.getItem("userId");
    if (user) {
      router.replace("/");
    }
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ! disabling typecheck because form has values from input names which is dynamic #False_Alarm.

    //@ts-ignore
    const userName = e.target.userName.value;
    //@ts-ignore
    const userEmail = e.target.userEmail.value;
    //@ts-ignore
    const userPassword = e.target.userPassword.value;

    setLoading(true);
    const success = await userSignup({ userName, userEmail, userPassword });
    setLoading(false);

    if (success) {
      router.push("Login");
    } else {
      alert("User With This Email, Already Exist!");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="h-full w-full">
      <div className="h-full w-full grid place-items-center">
        <div className=" h-3/5 w-96  flex flex-col justify-evenly items-center ">
          {/* //! Logo */}

          <div className="w-11/12 flex justify-end">
            <span className="text-3xl font-semibold text-base-content">
              Sign
            </span>
            <span className="text-3xl font-semibold text-primary">up</span>
          </div>

          {/*//! Name Input */}
          <div className="form-control w-11/12 ">
            <label className="input-group ">
              <span>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="text"
                name="userName"
                placeholder="Someone User"
                className="input input-bordered w-11/12"
                required
              />
            </label>
          </div>

          {/*//! Email Input */}
          <div className="form-control w-11/12 ">
            <label className="input-group ">
              <span>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="email"
                name="userEmail"
                placeholder="someone@somewhere.com"
                className="input input-bordered w-11/12"
                required
              />
            </label>
          </div>

          {/* //! Password Input */}
          <div className="form-control w-11/12 ">
            <label className="input-group ">
              <span>Password</span>
              <input
                type="password"
                name="userPassword"
                placeholder="P@55W0RD"
                className="input input-bordered w-11/12"
                required
              />
            </label>
          </div>

          {/* //! Login Button */}
          <button
            className={`btn btn-primary w-11/12 ${loading && "loading"} `}
            type="submit"
          >
            Signup
          </button>

          {/* //! Signup redirect */}
          <div className="flex w-11/12 justify-between items-center select-none">
            <span className="btn btn-xs btn-ghost">
              <Link href="ForgotPassword">
                <a className="text-primary">forgot password</a>
              </Link>
            </span>
            <span className="text-xs">
              Already have an Account?&nbsp;
              <Link href="Login">
                <a className="text-primary">Login</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signup;
