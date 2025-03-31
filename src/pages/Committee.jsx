import React, { createContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import DepartmentDetails from "../components/Departments/DepartmentDetails";
import CommitteeDetails from "../components/Committees/CommitteeDetails";
import CommitteeMembers from "../components/Committees/CommitteeMembers";

function Committee() {
  const { id } = useParams();
  const [committee, setCommittee] = useState();
  useEffect(() => {
    const getCommitteeData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND +`committee/info/${id}`
        );
        const data = await response.json();  
        setCommittee(data[0]);
      } catch (error) {
        console.log("Error at fetching departments details : ", error);
      }
    };
    getCommitteeData();
  }, [id]);
  return (
    <section className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <CommitteeDetails committee={committee} />
      <div className="bg-gray-100 font-sans flex items-center justify-center">
        <div className="p-8">
          <div className=" mx-auto">
            <CommitteeMembers faculty={committee?.members} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Committee;
