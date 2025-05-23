import React, { useContext, useEffect, useState } from "react";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import ResultRecord from "../components/Results/ResultRecord";
import { getAvailableYears } from "../functions/results";
import Footer from "../pages/Footer";
import { BiSearch } from "react-icons/bi";
import { data } from "react-router";

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching results:", error);
    return [];
  }
};

function Results() {
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([]);
  const { departmentNames } = useContext(Context);
  const [department, setDepartment] = useState(null);
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const searchUrl = import.meta.env.VITE_BACKEND + "results/search?query="+query;
  let timeoutId;
  useEffect(() => {
    if (department) {
      getAvailableYears(department).then((data) => setYears(data));
    }
  }, [department]);

  useEffect(() => {
    if (year && department) {
      const url =
        import.meta.env.VITE_BACKEND +
        `results/get-results?year=${year}&depo_code=${department}`;
      getData(url).then((data) => setResults(data));
    }
  }, [year, department]);

  useEffect(()=>{
    if(!query) return;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDepartment("");
      setYear("");
      getData(searchUrl).then((data) => {setResults(data)}).catch((error) => alert("Failed to Search Results"))
    }, 3000);
  },[query])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto mt-10 p-6 sm:p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-6">Academic Results</h2>

          <div className="flex flex-col sm:flex-row justify-between gap-5 px-2 sm:px-0 mb-6">
            <fieldset className="flex flex-col sm:flex-row gap-2 px-5 py-3 border-2">
            <legend>Results with Categorising</legend>
            <select
              className="w-full sm:w-[250px] border border-gray-300 rounded p-2 focus:outline-none"
              onChange={(event) => setDepartment(event.target.value)}
              value={department || ""}
              >
              <option value="">Select Department</option>
              {departmentNames.map((department, index) => (
                <option value={department.depo_code} key={index}>
                  {department.department_name}
                </option>
              ))}
            </select>

            <Selector
              className="border border-gray-300 rounded p-2"
              values={years}
              setValue={setYear}
              />
              </fieldset>
            <fieldset className="flex flex-col  gap-2 px-5 py-3 border-2">
              
                <legend>Search For Results</legend>
                <label htmlFor="search" className="block">Search with Student name, pin and Application id :</label>
                <label htmlFor="" className="flex items-center h-10 bg-gray-300 rounded-3xl gap-2 px-4 w-[350px]"> <BiSearch /> <input onChange={(e)=>setQuery(e.target.value)} type="text" id="search" name="search" className="bg-transparent outline-none w-full"/></label>
              </fieldset>
          </div>

          {(year && department) || query ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-red-700 text-white">
                    <th className="py-3 px-6 border border-gray-300 text-left">Pin</th>
                    <th className="py-3 px-6 border border-gray-300 text-left">Student Name</th>
                    <th className="py-3 px-6 border border-gray-300 text-left">Application ID</th>
                    <th className="py-3 px-6 border border-gray-300 text-left">Issued Year</th>
                    <th className="py-3 px-6 border border-gray-300 text-left">Department</th>
                    <th className="py-3 px-6 border border-gray-300 text-left">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results && results.length > 0 ? (
                    results.map((result, index) => (
                      <ResultRecord result={result} key={index} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-4 px-6 text-center text-gray-500">
                        No results found for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-6 text-center text-gray-600">
              Please select both department and year to view results.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Results;
