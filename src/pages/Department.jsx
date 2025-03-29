import React, { createContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import DepartmentDetails from "../components/Departments/DepartmentDetails";

export const DepartmentContext = createContext(null);

function Department() {
  const { depo_code } = useParams();
  const [department, setDepartment] = useState();
  useEffect(() => {
    const getDepartmentData = async () => {
      const response = await fetch(
        `http://localhost:3000/departments/${depo_code}`
      );
      const data = await response.json();
      setDepartment(data);
    };
    getDepartmentData();
  }, [depo_code]);
  return (
    <section className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <DepartmentDetails department={department} />
      <div className="bg-gray-100 font-sans flex items-center justify-center">
        <div className="p-8">
          <div className=" mx-auto">
            <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
              <Link
                to={"faculty"}
                className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
              >
                Faculty
              </Link>
              <Link
                to={"labs"}
                className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
              >
                Labs
              </Link>
              <Link
                to={"placements"}
                className="flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300"
              >
                Placements
              </Link>
            </div>
            <DepartmentContext.Provider value={depo_code}>
              <Outlet />
            </DepartmentContext.Provider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Department;
