import React, { useContext } from 'react'
import { Context } from '../../../../../Context/Context';

function departmentSelector({ name, setValue }) {
  const {departmentNames} = useContext(Context);
  if (!departmentNames || departmentNames.length === 0) {
    return <p>No departmentNames available</p>
  }
  return (
    <select name={name} onChange={(event) => setValue(event.currentTarget.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <option value="" disabled selected>Select a department</option>
      {departmentNames.map((department, index) => (
        <option key={index} value={department.depo_code}>
          {department.department_name}
        </option>
      ))}
    </select>
  )
}

export default departmentSelector