import Link from "next/link";
import React, { FormEvent, useLayoutEffect, useState } from "react";
import { userLogin } from "../API/user";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const user = localStorage.getItem("userId");
    if (user) {
      router.replace("/");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ! disabling typecheck because form has values from input names which is dynamic #FalseAlarm.

    //@ts-ignore
    const userEmail = e.target.userEmail.value;
    //@ts-ignore
    const userPassword = e.target.userPassword.value;

    setLoading(true);
    const success = await userLogin({ userEmail, userPassword });
    setLoading(false);

    if (success) {
      router.push("/");
    }
    // else{
    //     alert("Invalid Email/Password!");
    // }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="h-full w-full">
      <div className="h-full w-full grid place-items-center">
        <div className=" h-1/2 w-96  flex flex-col justify-evenly items-center">
          {/* //! Logo */}

          <div className="w-11/12 flex justify-end">
            <span className="text-3xl font-semibold text-base-content">
              Log
            </span>
            <span className="text-3xl font-semibold text-primary">in</span>
          </div>

          {/*//! Email Input */}
          <div className="form-control w-11/12 ">
            <label className="input-group ">
              <span>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <input
                type="email"
                id="userEmail"
                placeholder="someone@somewhere.com"
                className="input input-bordered w-11/12"
                required
                name="userEmail"
              />
            </label>
          </div>

          {/* //! Password Input */}
          <div className="form-control w-11/12 ">
            <label className="input-group ">
              <span>Password</span>
              <input
                type="password"
                id="userPassword"
                required
                name="userPassword"
                placeholder="P@55W0RD"
                className="input input-bordered w-11/12"
              />
            </label>
          </div>

          {/* //! Login Button */}
          <button
            className={`btn btn-primary w-11/12 ${loading && "loading"}`}
            type="submit"
          >
            Login
          </button>

          {/* //! Signup redirect */}
          <div className="flex w-11/12 justify-between text-sm select-none">
            <span className="btn btn-xs btn-ghost ">
              <Link href="ForgotPassword">
                <a className="text-primary">forgot password</a>
              </Link>
            </span>
            <span>
              Don&apos;t have an Account?&nbsp;
              <Link href="Signup">
                <a className="text-primary ">Signup</a>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
