import React, { createContext, useEffect, useState } from 'react'
import getCollegeInfo from '../src/functions/getCollegeInfo';

export const Context = createContext(null);

function ContextProvider(params) {
  const [college, setCollege] = useState({});
  const [departmentNames, setDepartmentNames] = useState([]);
  const [committees, setCommittees] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const collegeData = await getCollegeInfo();      
      setCollege(collegeData.college);
      setCommittees(collegeData.committees);
      setDepartmentNames(collegeData.departments);
    }
    getData();
  }, []);
  return (
    <Context.Provider value={{ college, setCollege, departmentNames, setDepartmentNames, committees, setCommittees }}>
    {params.children}
  </Context.Provider>
  )
}

export default ContextProvider;