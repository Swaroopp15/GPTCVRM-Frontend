import React from "react";

function InfoItem({name, value, setValue}) {
  return (
    <div className="grid grid-cols-4 gap-6 items-center">
      <label htmlFor="name" className="block text-lg font-medium text-center capitalize">
        {name.split("_").join(" ")}
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={(e) => setValue((value) => {value[name] = e.target.value; return value})}
        className="w-full px-4 py-3 col-span-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        placeholder="Academic Committee"
      />
    </div>
  );
}

export default InfoItem;
