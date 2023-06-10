import React, { useState, useEffect } from "react";

import { AiOutlineClose } from "react-icons/ai";
import {
  //   FaDiscord,
  FaTwitter,
  FaInstagram,
  //   FaTelegram,
  //   FaReddit,
  FaYoutube,
} from "react-icons/fa";

// import { BiMenu } from "react-icons/bi";

// import { HiMailOpen, HiMenu } from "react-icons/hi";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  //navbar text change
  const [text, setText] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    switch (currentPath) {
      case "/":
        setText("Paetau Ondrej & Kristofer Brody");
        break;
      case "/collectorfond":
        setText("BrodyPaetau Collector Fund");
        break;
      default:
        setText("Paetau Ondrej & Kristofer Brody");
    }
  }, [location]);

  return (
    <div className="px-2 font-sans text-white">
      {/* This is navbar */}
      <div className="container my-3 flex items-center justify-between">
        <div
          onClick={handleNav}
          className="cursor-pointer text-2xl text-[#ddd]"
        >
          ☰
        </div>

        <h1>
          <a
            href="https://brodypaetau.com"
            id="logo"
            className="letter-spacing-[0.2rem] block font-wanted uppercase text-[#ddd] max-md:hidden md:text-[3.2rem]"
          >
            {text}
          </a>
        </h1>

        <ul className="flex items-center justify-center gap-2">
          <li className="rounded-full bg-[#ddd] p-1 text-xl text-black">
            <FaYoutube className="" />
          </li>
          <li className="rounded-full bg-[#ddd] p-1 text-xl text-black">
            <FaInstagram />
          </li>
          <li className="rounded-full bg-[#ddd] p-1 text-xl text-black">
            <FaTwitter />
          </li>
        </ul>

        <div
          className={
            nav
              ? "fixed left-0 top-0 z-50 w-full bg-[#FFF200] text-base duration-500 ease-in-out"
              : "fixed left-0 top-[-100%] w-full duration-500  ease-in "
          }
        >
          <div>
            <div className="flex justify-between px-4 py-6">
              <div onClick={handleNav} className="cursor-pointer text-black">
                <AiOutlineClose size={28} />
              </div>
              <ul className="flex items-center justify-center gap-2">
                <li className="rounded-full bg-black p-1 text-xl text-[#ddd]">
                  <FaYoutube className="" />
                </li>
                <li className="rounded-full bg-black p-1 text-xl text-[#ddd]">
                  <FaInstagram />
                </li>
                <li className="rounded-full bg-black p-1 text-xl text-[#ddd]">
                  <FaTwitter />
                </li>
              </ul>
            </div>
            {/* grid px-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 */}
            <nav className="container grid gap-1.5 pb-16 pt-16 text-[30px] font-bold text-black md:grid-cols-4">
              <a className="" rel="noreferrer" href="http://brodypaetau.com/">
                Home
              </a>
              <div className=" cursor-not-allowed">Search</div>

              <a
                className=""
                rel="noreferrer"
                href="https://old.brodypaetau.com/"
                target="_blank"
              >
                Old Website
              </a>

              <div></div>

              <a
                className=""
                rel="noreferrer"
                href="https://brodypaetau.com/category/about"
              >
                About
              </a>
              <a
                className=""
                rel="noreferrer"
                href="https://brodypaetau.com/category/newsletters"
              >
                Newsletters
              </a>

              <NavLink className="" to="/mint" onClick={handleNav}>
                Mint
              </NavLink>
              <div></div>

              <a
                className=""
                rel="noreferrer"
                href="https://brodypaetau.com/category/publications"
                target="_blank"
              >
                Publications
              </a>
              <NavLink className="" to="/collectorfond" onClick={handleNav}>
                Collector Fund
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <h1>
        <a
          href="https://brodypaetau.com"
          id="logo"
          className="letter-spacing-[0.2rem] block text-center font-wanted text-4xl uppercase text-[#ddd] md:hidden"
        >
          {text}
        </a>
      </h1>
    </div>
  );
};

export default Navbar;
