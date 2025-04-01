import React, { useEffect, useState } from "react";

const Admission = ({addmission, index}) => {

const admissions = addmission?.admissions.map((branch, index) => {
        return (<tr class="hover:bg-gray-100">
          { index === 0 &&  <td class="py-3 px-6 border border-gray-300" rowSpan={addmission.admissions.length} >{addmission.year}</td>}
          <td class="py-3 px-6 border border-gray-300">{branch.depo_code}</td>
          <td class="py-3 px-6 border border-gray-300">{branch.allocated}</td>
          <td class="py-3 px-6 border border-gray-300">{branch.intake}</td>
        </tr>)
      })
    return (
      <>
      {admissions}
      </>
    )
};

function Admissions() {
  const [admissions, setAdmissions] = useState();
  useEffect(() => {
    const getAdmissions = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + "admissions");
        const data = await response.json();
        console.log("Admissions : ", data);
        
        setAdmissions(data);
      } catch (error) {
        console.log("Error in fetching admissions : ", error);
      }
    };
    getAdmissions();
  }, []);
  return (
    <section class="py-16 px-6 text-center">
      <h2 class="text-4xl font-bold text-red-700">Yearly Seat Allocation</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-red-700 text-white">
              <th class="py-3 px-6 border border-gray-300">Year</th>
              <th class="py-3 px-6 border border-gray-300">Branch</th>
              <th class="py-3 px-6 border border-gray-300">Seats Allocated</th>
              <th class="py-3 px-6 border border-gray-300">Seats Filled</th>
            </tr>
          </thead>
          <tbody>
            {admissions &&
              admissions.map((admission, index) => (
                <Admission addmission={admission} index={index} />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Admissions;
