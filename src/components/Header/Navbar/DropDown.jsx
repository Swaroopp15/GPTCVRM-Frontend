import React from "react";
import Drop from "../../../assets/icons/Drop";
import { Link } from "react-router";

function DropDown({ name, values, link }) {
  return (
    <div className="relative group">
    <button type="button" className="overflow-hidden flex flex-row capitalize">
      <span>{name}</span><Drop />
    </button>
    <ul className="absolute w-56 divide-y z-20 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg hidden group-hover:block">
      {
       values && values.map((value, index) => 
      <li className="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" key={index}>
        <Link to={link+ value.code} className="block truncate">{value.name}</Link>
      </li>
      )}

    </ul>
  </div>
  );
}

export default DropDown;
