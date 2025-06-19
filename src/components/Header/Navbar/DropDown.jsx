import React, { useState, useRef, useEffect } from "react";
import Drop from "../../../assets/icons/Drop";
import { Link } from "react-router";

function DropDown({ name, values, link, all, mobile = false, currentPath, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  let closeTimeout = null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, []);

  const handleToggle = () => {
    if (mobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!mobile) {
      setIsOpen(true);
      if (closeTimeout) clearTimeout(closeTimeout);
    }
  };

  const handleMouseLeave = () => {
    if (!mobile) {
      closeTimeout = setTimeout(() => {
        setIsOpen(false);
      }, 300); 
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${mobile ? 'w-full' : 'group'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`transition-all duration-300 flex flex-row capitalize items-center px-3 py-2 rounded-lg text-sm md:text-[15px] font-medium ${
          mobile ? 'w-full justify-between' : ''
        } ${
          isActive
            ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-md'
            : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
        }`}
        onClick={handleToggle}
      >
        <span>{name}</span>
        <Drop
          className={`ml-1 transform ${isOpen ? 'rotate-180' : ''} transition-transform ${
            isActive ? 'text-white' : 'text-gray-500'
          }`}
        />
      </button>

      {(isOpen || (!mobile && isOpen)) && (
        <div
          className={`${mobile ? 'w-full pl-4 mt-1' : 'absolute left-0 mt-1 w-56'}`}
          onMouseEnter={() => !mobile && clearTimeout(closeTimeout)}
          onMouseLeave={() => !mobile && handleMouseLeave()}
        >
          <ul className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            {all && (
              <li className="py-2 px-4 hover:bg-gray-50 transition-colors duration-200">
                <Link
                  to={all}
                  className={`block text-sm ${
                    currentPath === all
                      ? 'text-red-600 font-medium'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  All {name}
                </Link>
              </li>
            )}
            {values &&
              values.map((value, index) => (
                <li
                  key={index}
                  className="py-2 px-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Link
                    to={link ? `${link}${value.code}` : value.path || `/${value.toLowerCase()}`}
                    className={`block text-sm ${
                      currentPath === (link ? `${link}${value.code}` : value.path || `/${value.toLowerCase()}`)
                        ? 'text-red-600 font-medium'
                        : 'text-gray-700 hover:text-red-600'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {value.name || value}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;