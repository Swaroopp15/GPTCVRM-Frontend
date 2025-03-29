import React from "react";
import Drop from "../../../assets/icons/Drop";

function DropDown({ name, values }) {
  return (
    <div class="relative group">
    <button type="button" class="overflow-hidden flex flex-row capitalize">
      <span>{name}</span><Drop />
    </button>
    <ul class="absolute w-56 divide-y z-20 divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg hidden group-hover:block">
      {
       values && values.map((value, index) => 
      <li class="py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer" key={index}>
        <a href="#" class="block truncate">{value}</a>
      </li>
      )}

    </ul>
  </div>
  );
}

export default DropDown;
