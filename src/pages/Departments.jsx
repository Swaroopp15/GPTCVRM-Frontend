import React, { useContext, useEffect } from "react";
import DepartmentCard from "../components/Departments/DepartmentCard";
import fetchDepartments from "../functions/fetchDepartments";
import { Context } from "../../Context/Context";

function Departments() {
  const { departmentNames } = useContext(Context);
  return (
    <section class="py-16 px-4 sm:px-6 md:px-8 text-center bg-gray-200">
      <h2 class="text-3xl sm:text-4xl font-bold text-red-700">
        Departments We Offer
      </h2>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {departmentNames && departmentNames.map((department, index) => {
          return <DepartmentCard key={index} name={department.department_name} link={"/department/" + department.depo_code} />;
        })}
      </div>
    </section>
  );
}

export default Departments;
