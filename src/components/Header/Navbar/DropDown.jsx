import React, { useState } from "react";
import Drop from "../../../assets/icons/Drop";
import { Link } from "react-router";

function DropDown({ name, values, link,all, mobile = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${mobile ? 'w-full' : 'group'}`}>
      <button
        type="button"
        className={`overflow-hidden flex flex-row capitalize items-center ${mobile ? 'w-full justify-between py-2' : ''}`}
        onClick={() => mobile && setIsOpen(!isOpen)}
        onMouseEnter={() => !mobile && setIsOpen(true)}
        onMouseLeave={() => !mobile && setIsOpen(false)}
      >
        <span>{name}</span>
        <Drop className={`transform ${isOpen ? 'rotate-180' : ''} transition-transform`} />
      </button>

      {(isOpen || !mobile) && (
        <ul className={`${mobile ? 'w-full pl-4' : 'absolute w-56'} divide-y z-20 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${mobile ? 'block' : 'hidden group-hover:block'}`}>
          {all? (
            <li
              className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              <Link
                to={all}
                className="block truncate"
              >
                All {name}
              </Link>
            </li>
          ) : null}
          {values && values.map((value, index) => (
            <li
              key={index}
              className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              <Link
                to={link ? `${link}${value.code}` : `/${value.toLowerCase()}`}
                className="block truncate"
              >
                {value.name || value}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;