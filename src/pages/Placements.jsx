import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import { getPlacements, getPlacementYears } from "../functions/placements";

const PlacementRecord = ({ placement }) => {
  return (
    <tr>
      <td class="py-3 px-6 border border-gray-300">{placement.name}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.student_pin}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.depo_code?.toUpperCase()}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.company}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.role}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.package}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.year}</td>
    </tr>
  );
};


function Placements() {
  const [query, setQuery] = useSearchParams();
  const depo_code = query.get("depo_code");
  const placementYear = query.get("year");
  const [year, setYear] = useState(placementYear);
  const [years, setYears] = useState([]);
  const { departmentNames } = useContext(Context);
  const [selectedDepartment, setSelectedDepartment] = useState(depo_code);
  const [placements, setPlacements] = useState();

  useEffect(() => {
    if (!selectedDepartment & !year) return;
    getPlacements(selectedDepartment, year).then((data) => setPlacements(data));
  }, [depo_code, year]);

  useEffect(() => {
    getPlacementYears(selectedDepartment).then((data)=>{setYears(data)});
  }, [selectedDepartment]);
  return (
    <section class="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
       <div className="flex justify-start gap-5 px-10">
        <select
          className="w-[250px] border border-black rounded"
          onChange={(event) => setSelectedDepartment(event.target.value)}
          value={selectedDepartment}
        >
          <option value={null}>Select Department</option>
          {departmentNames.map((department, index) => (
            <option value={department.depo_code} key={index}>
              {department.department_name}
            </option>
          ))}
        </select>
          <Selector
            className={"border border-black rounded"}
            values={years}
            setValue={setYear}
          />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-red-700 text-white">
              <th class="py-3 px-6 border border-gray-300">Student Name </th>
              <th class="py-3 px-6 border border-gray-300">Pin</th>
              <th class="py-3 px-6 border border-gray-300">Department</th>
              <th class="py-3 px-6 border border-gray-300">Company</th>
              <th class="py-3 px-6 border border-gray-300">Role</th>
              <th class="py-3 px-6 border border-gray-300">Package</th>
              <th class="py-3 px-6 border border-gray-300">year</th>
            </tr>
          </thead>
          <tbody>
            {placements ? placements?.map((placement) => {
              return <PlacementRecord placement={placement} />;
            }) : (
              <tr>
                <td class="py-3 px-6 border border-gray-300" colSpan={7}>
                  No placements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Placements;
