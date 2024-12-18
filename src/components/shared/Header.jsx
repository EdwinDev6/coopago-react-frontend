/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaUserCircle } from "react-icons/fa";
import { MdMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import useAuth from "../../hooks/useAuth";

export default function Header({ toggleSidebar, isOpen }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const { auth } = useAuth();
  useEffect(() => {
    setUsername(auth.user.nombre_usuario);
  }, []);

  return (
    <div className="bg-neutral-900 h-12 px-4 flex items-center border-b border-gray-200 justify-between overflow-hidden">
      <button
        className="text-white text-2xl md:hidden border border-gray-400 rounded-md p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={toggleSidebar}
      >
        <MdMenuOpen />
      </button>

      <div className="flex items-center ml-auto flex-shrink-0">
        <span className="text-base md:text-lg truncate text-white">
          {username}
        </span>
        <Menu as="div" className="relative ml-2">
          <div>
            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <div className="h-10 w-10 rounded-full flex items-center justify-center">
                <FaUserCircle className="h-10 w-10 text-white" />
              </div>
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
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      navigate("/profile");
                      if (isOpen) toggleSidebar();
                    }}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-white cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      navigate("/settings");
                      if (isOpen) toggleSidebar();
                    }}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-white cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-white cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Sign out
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
