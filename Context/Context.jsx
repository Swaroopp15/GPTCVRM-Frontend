import React, { createContext, useEffect, useState } from 'react'
import getCollegeInfo from '../src/functions/getCollegeInfo';

export const Context = createContext(null);

function ContextProvider(params) {
  const [college, setCollege] = useState({});
  const [departmentNames, setDepartmentNames] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [collegeImages, setCollegeImages] = useState([]);
  const [homeLabs, setHomeLabs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const collegeData = await getCollegeInfo();      
      setCollege(collegeData.college);
      setCommittees(collegeData.committees);
      setDepartmentNames(collegeData.departments);
      setCollegeImages(collegeData.images);
      setHomeLabs(collegeData.homeLabs)
    }
    getData();
  }, []);
  return (
    <Context.Provider value={{ college, setCollege, departmentNames, setDepartmentNames, committees, setCommittees, collegeImages, homeLabs }}>
    {params.children}
  </Context.Provider>
  )
}

export default ContextProvider;