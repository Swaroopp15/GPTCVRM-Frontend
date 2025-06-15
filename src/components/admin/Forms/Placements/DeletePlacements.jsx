import React, { useContext, useEffect, useState } from 'react'
import { deletePlacement, getPlacements, getPlacementYears } from '../../../../functions/placements';
import { Context } from '../../../../../Context/Context';
import Selector from '../../../utility/YearSelector';

function DeletePlacements() {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedYear, setSelectedYear] = useState()
  const [selectedResult, setSelectedResult] = useState('');
  const [years, setYears] = useState([])
  const [placements, setPlacements] = useState(null)
  const { departmentNames } = useContext(Context)
  useEffect(() => {
    getPlacementYears(selectedDepartment)
      .then((data) => {
        setYears(data);
      });
  }, [selectedDepartment])
  useEffect(() => {
    if (!selectedYear & !selectedDepartment) return ;
    getPlacements(selectedDepartment, selectedYear).then((data) => {
      if (data) {
        setPlacements(data);
      }
    }
    );
  }, [selectedYear, selectedDepartment])
  const handleSubmit = () => {
    if (!selectedResult) {
      alert("Please select a result to delete");
      return;
    }
    deletePlacement(selectedResult)
      .then((data) => {
        if (data) {
          alert("Placement record deleted successfully");
          setSelectedResult('');
          setPlacements(placements.filter((placement) => placement.id !== selectedResult));
        }
      })
      .catch((error) => {
        console.error("Error deleting placement:", error);
        alert("Error deleting placement record");
      });
  }
 

  return (
     <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Result Record</h3>
      </div>
      
      <form onSubmit={(event) => {event.preventDefault(); handleSubmit()}} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label htmlFor="depo_code" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                name="depo_code"
                id="depo_code"
                required
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              >
                <option value="">Select Department</option>
                {departmentNames.map((item) => (
                  <option key={item.depo_code} value={item.depo_code}>
                    {item.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="admission_year" className="block text-sm font-medium text-gray-700 mb-2">
                Admission Year
              </label>
              <select
                name="admission_year"
                id="admission_year"
                required
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              >
                <option value="" disabled selected>Select Admission Year</option>
                {years && years.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                Student pin
              </label>
              <select
                name="pin"
                id="pin"
                required
                onChange={(e) => setSelectedResult(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              >
                <option value="" disabled selected>Select Student pin</option>
                {placements && placements.map((student, index) => (
                  <option key={index} value={student.id}>{student.pin}</option>
                ))}
              </select>
            </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="reset"
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

export default DeletePlacements