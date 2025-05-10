import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../../Context/Context'
import Selector from '../../../utility/YearSelector'
import { deleteResults, getAvailableYears, getResults } from '../../../../functions/results'

function DeleteResults() {
  const { departmentNames } = useContext(Context)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedYear, setSelectedYear] = useState()
  const [selectedResult, setSelectedResult] = useState('');
  const [years, setYears] = useState([])
  const [results, setResults] = useState(null)
  useEffect(() => {
    getAvailableYears(selectedDepartment)
      .then((data) => {
        setYears(data);
      });
  }, [selectedDepartment])
  
  useEffect(() => {
    if (!selectedYear & !selectedDepartment) return ;
    getResults(selectedYear, selectedDepartment).then((data) => {
      if (data) {
        setResults(data);
      }
    }
    );
  }, [selectedYear, selectedDepartment])
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Result Record</h3>
      </div>
      
      <form onSubmit={(event) => {event.preventDefault(); deleteResults(selectedPin)}} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
              Department
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="depo_code"
              id="depo_code"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              onChange={(event) => {
                setSelectedDepartment(event.currentTarget.value);} // Reset year when department changes
              }
            >
              <option value="">Select Department</option>
              {departmentNames.length > 0 ? (
                departmentNames.map((item) => (
                  <option key={item.depo_code} value={item.depo_code}>
                    {item.department_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>No Departments Available</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Year
              <span className="text-red-500 ml-1">*</span>
            </label>
         <Selector values={years} setValue={setSelectedYear} className={"w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"} />
          </div>

         {results ? (
          <select name="" id="" onChange={(event) => setSelectedResult(event.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200">
            <option value="">Select Pin</option>
            {results.map((result) => (
              <option key={result.pin} value={result.id}>
                {result.pin}  {`- [${result.name}]`}
              </option>
            ))}
          </select>
         ) : <div />}
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
            Delete Result Record
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteResults