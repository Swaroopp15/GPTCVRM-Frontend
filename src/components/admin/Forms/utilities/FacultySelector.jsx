function FacultySelector({facultyList, setValue}) {  
  return (
    <select  onChange={(event) => setValue(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
      <option value="" disabled selected>Select a Faculty</option>
      {facultyList.map((faculty, index) => (
        <option key={index} value={faculty.faculty_id}>
          {faculty.faculty_name} - {faculty.faculty_role} - {faculty.email}
        </option>
      ))}
    </select>
  )
}

export default FacultySelector