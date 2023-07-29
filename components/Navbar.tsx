import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isShared, setIsShared] = useState(true);
  const router = useRouter();

  // ! Activate Clinet Data Populating
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [router.pathname]);

  useLayoutEffect(() => {
    if (window.location.pathname.indexOf("shared") === -1) setIsShared(false);
    const theme = localStorage.getItem("data-theme");
    if (theme && theme === "synthwave") document.getElementById("theme-changer")?.classList.add("swap-active");
  }, [])


  const logout = () => {
    localStorage.removeItem("userId");
    router.push("Login");
  };

  const getHome = () => {
    // @ts-ignore
    window.location = "/";
  }

  const toggleMode = () => {
    const element = document.getElementsByTagName('html')[0];
    const changer = document.getElementById("theme-changer");


    if (element.getAttribute("data-theme") === "synthwave") {
      element.setAttribute("data-theme", "night")
      localStorage.setItem("data-theme", "night")
      changer?.classList.remove("swap-active")
    }
    else {
      element.setAttribute("data-theme", "synthwave")
      localStorage.setItem("data-theme", "synthwave")
      changer?.classList.add("swap-active")
    }

  }

  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start ">
        {!isShared && <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {!isShared && <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="Notes">
                <a className={`${router.pathname.indexOf('Notes') !== -1 && 'bg-primary text-base-100 rounded-lg'}`} >Notes</a>
              </Link>
            </li>
            <li>
              <Link href="Todo">
                <a className={`${router.pathname.indexOf('Todo') !== -1 && 'bg-primary text-base-100 rounded-lg'}`} >To-Do</a>
              </Link>
            </li>
            <li>
              <Link href="Linkshort">
                <a className={`${router.pathname.indexOf('Linkshort') !== -1 && 'bg-primary text-base-100 rounded-lg'}`} >LinkShort</a>
              </Link>
            </li>
          </ul>}
        </div>}
        <h1 className="normal-case text-3xl font-bold">
          <span className="text-primary">Daily</span>
          <span className="text-base-content">Utils</span>
        </h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        {!isShared && <ul className="menu menu-horizontal p-0  ">
          <li >
            <Link href="Notes">
              <a className={` ${router.pathname.indexOf('Notes') !== -1 && 'bg-primary text-base-100 rounded-lg'}`} >Notes</a>
            </Link>
          </li>
          <li>
            <Link href="Todo">
              <a className={` ml-2 mr-2 ${router.pathname.indexOf('Todo') !== -1 && 'bg-primary text-base-100 rounded-lg'}`} >To-Do</a>
            </Link>
          </li>
          <li>
            <Link href="Linkshort">
              <a className={`${router.pathname.indexOf('Linkshort') !== -1 && 'bg-primary text-base-100 rounded-lg'}`} >LinkShort</a>
            </Link>
          </li>
        </ul>}
      </div>
      <div className="navbar-end">
        <div onClick={toggleMode} id="theme-changer" className="swap  swap-rotate">
          <div className="swap-on"><MdLightMode className="h-5 w-5" /></div>
          <div className="swap-off"><MdDarkMode className="h-5 w-5" /></div>
        </div>
        <div className="dropdown dropdown-end" id="test1" >
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <FaRegUserCircle className="h-5 w-5" />
          </label>
          {!isShared ? <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href='/' >
                <a>Homepage</a>
              </Link>
            </li>
            {isLogin ? (
              <li>
                <button onClick={logout}>
                  Logout
                  <HiOutlineLogout />
                </button>
              </li>
            ) : (
              <li>
                <Link href="Login">
                  <a>
                    Login
                    <HiOutlineLogin />
                  </a>
                </Link>
              </li>
            )}
          </ul> : <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={getHome} >Get Access</button>
            </li>
          </ul>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

