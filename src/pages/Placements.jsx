import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import getPlacements from "../functions/getPlacements";

const PlacementRecord = ({placement}) => {
  return (
    <tr>
      <td class="py-3 px-6 border border-gray-300">{placement.name}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.student_pin}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.company}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.role}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.package}</td>
      <td class="py-3 px-6 border border-gray-300">{placement.year}</td>
    </tr>
  );
};

function Placements() {
  const [query, setQuery] = useSearchParams();
  const [placements, setPlacements] = useState();
  const depo_code = query.get("depo_code");
  const year = query.get("year");
  useEffect(() => {
    getPlacements(depo_code, year).then((data) => setPlacements(data));
  }, [depo_code, year]);
  return (
    <section class="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-4xl font-bold text-red-700 text-center">Placements </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-red-700 text-white">
              <th class="py-3 px-6 border border-gray-300">Student Name </th>
              <th class="py-3 px-6 border border-gray-300">Pin</th>
              <th class="py-3 px-6 border border-gray-300">Company</th>
              <th class="py-3 px-6 border border-gray-300">Role</th>
              <th class="py-3 px-6 border border-gray-300">Package</th>
              <th class="py-3 px-6 border border-gray-300">year</th>
            </tr>
          </thead>
          <tbody>
            {placements?.map((placement) => {
              return <PlacementRecord placement={placement} />;
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Placements;
