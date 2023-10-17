import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";
import profile from "../assets/profile.jpg"

const inside_nav = [
  {
    path: "/main-quiz",
    display: "Main Quiz",
  },
  {
    path: "/infant_quiz",
    display: "Infant Eyecare Quiz",
  },
  {
    path: "/test-home",
    display: "Eye Checkup Tests for Adults",
  },
  {
    path: "/games",
    display: "Games for Kids",
  },
];

const inside_nav2 = [
  {
    path: "/ayurvedic",
    display: "Ayurvedic Eyecare",
  },
  {
    path: "/infant_eye_care",
    display: "Infant Eye care",
  },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();

    Swal.fire({
      icon: "success",
      title: "Loged Out",
      text: "Logged Out Successfully",
    });

    navigate("/login");
  };

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="flex justify-around w-full py-4 bg-gray-50 sticky top-0 z-[999]">
      <div className="flex items-center">
        <h3 className="text-2xl font-extrabold text-[#004AAD]">
          <Link to="/">EyeZen</Link>
        </h3>
      </div>
      {/* <!-- left header section --> */}
      <div className="items-center hidden space-x-5 md:flex">
        <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
            Tests and Games
            <ChevronDownIcon
                className="-mr-1 mt-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {inside_nav.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                        <Link
                            className={classNames(
                                active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                "block px-4 py-2 text-sm"
                            )}
                            to={item.path}
                        >
                          {item.display}
                        </Link>
                    )}
                  </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
              Eye Care Sections
              <ChevronDownIcon
                className="-mr-1 mt-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {inside_nav2.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        to={item.path}
                      >
                        {item.display}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Link to="/doctorcontact">Doctor Contact</Link>
      </div>
      {/* <!-- right header section --> */}
      <div className="items-center space-x-3 hidden md:flex">
        {user ? (
          <>
            <button className=""></button>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  {/* {user.name} */}
                  <img class="h-8 w-8 rounded-full" src={profile} alt=""></img>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <h2 className="block px-4 py-2 text-sm text-[#41A4FF]">
                      {user.name}
                    </h2>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                          to="/profile"
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        ) : (
          <div className="items-center space-x-3 hidden md:flex">
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-white font-bold bg-[#004AAD] text-center hover:bg-blue-500 cursor-pointer rounded-md"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-white font-bold bg-gray-800 text-center hover:bg-gray-600 cursor-pointer rounded-md"
              >
                Sign up
              </Link>
            </>
          </div>
        )}
      </div>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
                <AiOutlineClose size={20} style={{ color: "black" }} />

        ) : (
            <AiOutlineMenu size={20} style={{ color: "black" }} />
        )}
      </div>

      <div
          className={
            !nav
                ? "fixed left-[-100%] top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 md:hidden"
                : "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray bg-white ease-in-out duration-500 md:hidden"
          }
      >
        <h1 className="text-2xl font-bold m-8 text-[#004AAD]">EyeZen</h1>
        <ul className="p-4 mt-20">
          <li className="p-4 border-b border-gray-600">
            <Link
                to="/"
                onClick={() => {
                  setNav(false);
                }}
                spy={true}
                smooth={true}
                duration={500}
            >
              Home
            </Link>
          </li>

          <li className="p-4 border-b border-gray-600">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
                  Tests and Games
                  <ChevronDownIcon
                      className="-mr-1 mt-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {inside_nav.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                              <Link
                                  onClick={() => {
                                    setNav(false);
                                  }}
                                  spy={true}
                                  smooth={true}
                                  duration={500}
                                  className={classNames(
                                      active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                  )}
                                  to={item.path}
                              >
                                {item.display}
                              </Link>
                          )}
                        </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
          <li className="p-4 border-b border-gray-600">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2">
                  Eye Care Sections
                  <ChevronDownIcon
                      className="-mr-1 mt-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {inside_nav2.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                              <Link
                                  onClick={() => {
                                    setNav(false);
                                  }}
                                  spy={true}
                                  smooth={true}
                                  duration={500}
                                  className={classNames(
                                      active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                  )}
                                  to={item.path}
                              >
                                {item.display}
                              </Link>
                          )}
                        </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
          <li className="p-4 border-b border-gray-600">
            {user ? (
                <>
                  <button className=""></button>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        {/* {user.name} */}
                        <img class="h-8 w-8 rounded-full" src={profile} alt=""></img>
                      </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <h2 className="block px-4 py-2 text-sm text-[#41A4FF]">
                            {user.name}
                          </h2>
                          <Menu.Item>
                            {({ active }) => (
                                <Link
                                    onClick={() => {
                                      setNav(false);
                                    }}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                    to="/profile"
                                >
                                  Profile
                                </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full px-4 py-2 text-left text-sm"
                                    )}
                                >
                                  Sign out
                                </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
            ) : (
                <div className="items-center space-x-3 hidden md:flex">
                  <>
                    <Link
                        to="/login"
                        className="px-4 py-2 text-white font-bold bg-[#004AAD] text-center hover:bg-blue-500 cursor-pointer rounded-md"
                    >
                      Sign in
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 text-white font-bold bg-gray-800 text-center hover:bg-gray-600 cursor-pointer rounded-md"
                    >
                      Sign up
                    </Link>
                  </>
                </div>
            )}
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default Navbar;
