import React, { useContext, useState } from 'react'
import { Context } from '../../../../../Context/Context';
import { updateCommittees } from '../../../../functions/committees';

function UpdateCommittee() {
  const { committees } = useContext(Context);
    const [selectedCommittee, setSelectedCommittee] = useState();
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    return (
      <div className="my-5">
        <div className="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-white dark:bg-gray-800 border-emerald-500 rounded-md">
          <div className="my-3">
            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Add Member to Committee
            </h1>
            <form onSubmit={(event) => { event.preventDefault(); updateCommittees(selectedCommittee, name , about) }} className="my-4" >
              <div className="my-2">
                <label htmlFor="committee" className="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300" >
                  Committee:
                </label>
                <select name="committee" id="committee" onChange={(event) => setSelectedCommittee(event.target.value)} className="block w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 bg-gray-50" aria-placeholder="Select Committee" >
                  <option value={null}>Select Committee</option>
                  {committees.length > 0 ? (
                    committees.map((item) => ( <option key={item.id} value={item.id}> {item.name} </option>
                    ))
                  ) : (
                    <option value="">No Committees Available</option>
                  )}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Committee Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Academic Committee"
              onInput={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-2">
              Committee Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="about"
              name="about"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              placeholder="Describe the committee's purpose and responsibilities..."
              onInput={(event) => setAbout(event.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Save Committee
          </button>
        </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default UpdateCommittee