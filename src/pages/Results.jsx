import React, { useContext, useEffect, useState } from "react";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import objectToArray from "../functions/objectsToArray";
import { data } from "react-router";

const ResultRecord = ({ result }) => {
  return (
    <tr>
      <td class="py-3 px-6 border border-gray-300">{result.application_id}</td>
      <td class="py-3 px-6 border border-gray-300">{result.name}</td>
      <td class="py-3 px-6 border border-gray-300">{result.pin}</td>
      <td class="py-3 px-6 border border-gray-300">{result.year}</td>
      <td class="py-3 px-6 border border-gray-300">{result.depo_code}</td>
      <td class="py-3 px-6 border border-gray-300">{result.percentage}</td>
    </tr>
  );
};

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching years:", error);
    return [];
  }
};

function Results() {
  const [year, setYear] = useState();
  const [years, setYears] = useState();
  const { departmentNames } = useContext(Context);
  const [department, setDepartment] = useState();
  const [results, setResults] = useState(null);
  const url = import.meta.env.VITE_BACKEND + "results/get-years";
  useEffect(() => {
    getData(url)
      .then((data) => {
        return data.map((year) => {
          return year.year;
        });
      })
      .then((data) => {
        setYears(data);
      });
  }, []);
  useEffect(() => {
    if (year && department) {
      const url = import.meta.env.VITE_BACKEND + "results/get-results?year=" + year + "&depo_code=" + department;
      getData(url).then((data) => {
        setResults(data);
      });
    }
  }, [year, department]);
  return (
    <section class="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-4xl font-bold text-red-700 text-center">Results </h2>
      <Selector values={years} setValue={setYear} />
      <select onChange={(event) => setDepartment(event.target.value)} >
        <option value={null}>Select Department</option>
        {departmentNames.map((department) => (
          <option value={department.depo_code}>
            {department.department_name}
          </option>
        ))}
      </select>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
        <table class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-red-700 text-white">
              <th class="py-3 px-6 border border-gray-300">Application Id</th>
              <th class="py-3 px-6 border border-gray-300">Student Name </th>
              <th class="py-3 px-6 border border-gray-300">Pin</th>
              <th class="py-3 px-6 border border-gray-300">Year</th>
              <th class="py-3 px-6 border border-gray-300">Department</th>
              <th class="py-3 px-6 border border-gray-300">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results ? (
              results?.map((result) => {
                return <ResultRecord result={result} />;
              })
            ) : (
              <tr>
                <td
                  class="py-3 px-6 border border-gray-300 text-center text-lg"
                  colSpan={6}
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Results;
