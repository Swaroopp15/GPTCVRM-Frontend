import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../../Context/Context'
import Selector from '../../../utility/YearSelector'
import { deleteResults, getAvailableYears, getResults } from '../../../../functions/results'

function DeleteResults() {
  const { departmentNames } = useContext(Context)

  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [selectedResult, setSelectedResult] = useState('')
  const [years, setYears] = useState([])
  const [results, setResults] = useState([])

  // Fetch years based on department
  useEffect(() => {
    if (!selectedDepartment) return
    getAvailableYears(selectedDepartment)
      .then((data) => {
        setYears(data)
        setSelectedYear(null)
        setResults([])
        setSelectedResult('')
      })
      .catch((error) => {
        console.error('Error fetching years:', error)
        setYears([])
      })
  }, [selectedDepartment])

  // Fetch results based on department and year
  useEffect(() => {
    if (!selectedYear || !selectedDepartment) return
    getResults(selectedYear, selectedDepartment)
      .then((data) => {
        setResults(data)
        setSelectedResult('')
        console.log('Results fetched:', data)
      })
      .catch((error) => {
        console.error('Error fetching results:', error)
        setResults([])
      })
  }, [selectedYear, selectedDepartment])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedResult) {
      alert('Please select a result to delete.')
      return
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this result?')
    if (!confirmDelete) return

    try {
      await deleteResults(selectedResult)
      alert('Result deleted successfully.')

      // Refresh result list
      const updatedResults = await getResults(selectedYear, selectedDepartment)
      setResults(updatedResults)
      setSelectedResult('')
    } catch (error) {
      console.error('Error deleting result:', error)
      alert('Failed to delete result.')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Result Record</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Department Select */}
          <div>
            <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
              Department<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="depo_code"
              id="depo_code"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              onChange={(event) => {
                const dep = event.currentTarget.value
                setSelectedDepartment(dep)
              }}
            >
              <option value="">Select Department</option>
              {departmentNames.length > 0 ? (
                departmentNames.map((item, index) => (
                  <option key={index} value={item.depo_code}>
                    {item.department_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No Departments Available
                </option>
              )}
            </select>
          </div>

          {/* Year Selector */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Year<span className="text-red-500 ml-1">*</span>
            </label>
            <Selector
              values={years}
              setValue={setSelectedYear}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
            />
          </div>

          {/* Result Selector */}
          {results.length > 0 && (
            <div className="md:col-span-2">
              <label htmlFor="resultPin" className="block text-sm font-medium text-gray-700 mb-2">
                Result Record (by PIN)<span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="resultPin"
                value={selectedResult}
                onChange={(event) => setSelectedResult(event.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              >
                <option value="">Select Pin</option>
                {results.map((result) => (
                  <option key={result.id} value={result.student_id}>
                    {result.pin} - [{result.name}]
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
            onClick={() => {
              setSelectedDepartment(null)
              setSelectedYear(null)
              setSelectedResult('')
              setYears([])
              setResults([])
            }}
            className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 transform hover:-translate-y-0.5"
          >
            Delete Result Record
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteResults
