import React, { useContext, useEffect, useState } from "react";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import ResultRecord from "../components/Results/ResultRecord";
import { getAvailableYears } from "../functions/results";

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching years:", error);
    return [];
  }
};

function Results() {
  const [year, setYear] = useState(null);
  const [years, setYears] = useState();
  const { departmentNames } = useContext(Context);
  const [department, setDepartment] = useState(null);
  const [results, setResults] = useState(null);
  useEffect(() => {
    getAvailableYears(department)
      .then((data) => {
        setYears(data);
      });
  }, [department]);
  useEffect(() => {
    if (year && department) {
      const url =
        import.meta.env.VITE_BACKEND +
        "results/get-results?year=" +
        year +
        "&depo_code=" +
        department;
      getData(url).then((data) => {
        setResults(data);
      });
    }
  }, [year, department]);
  return (
    <section className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold text-red-700 text-center mb-5">Results </h2>
      <div className="flex justify-start gap-5 px-10">
        <select
          className="w-[250px] border border-black rounded"
          onChange={(event) => setDepartment(event.target.value)}
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
      {year && department ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="py-3 px-6 border border-gray-300">
                  Application Id
                </th>
                <th className="py-3 px-6 border border-gray-300">
                  Student Name{" "}
                </th>
                <th className="py-3 px-6 border border-gray-300">Pin</th>
                <th className="py-3 px-6 border border-gray-300">Year</th>
                <th className="py-3 px-6 border border-gray-300">Department</th>
                <th className="py-3 px-6 border border-gray-300">Percentage</th>
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
                    className="py-3 px-6 border border-gray-300 text-center text-lg"
                    colSpan={6}
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-3 px-6 mt-5 text-center text-lg">
          Please Select Year and Department.
        </div>
      )}
    </section>
  );
}

export default Results;
