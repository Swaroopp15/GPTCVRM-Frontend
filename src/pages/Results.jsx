import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { getAvailableYears } from "../functions/results";
import DecorativeBubbles from "../components/hero/DecorativeBubbles";
import ResultsHeader from "../../src/SubParts/Results/ResultsHeader";
import ResultsFilters from "../../src/SubParts/Results/ResultsFilters";
import ResultsTable from "../../src/SubParts/Results/ResultsTable";
import ResultsPagination from "../../src/SubParts/Results/ResultsPagination";

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
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
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  
  const searchUrl = import.meta.env.VITE_BACKEND + "results/search?query=" + query;
  let timeoutId;

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (department) {
      setIsLoading(true);
      getAvailableYears(department)
        .then((data) => setYears(data))
        .finally(() => setIsLoading(false));
    }
  }, [department]);

  useEffect(() => {
    if (year && department) {
      setIsLoading(true);
      const url = import.meta.env.VITE_BACKEND + 
        `results/get-results?year=${year}&depo_code=${department}`;
      getData(url)
        .then((data) => {
          setResults(data);
          setCurrentPage(1);
        })
        .finally(() => setIsLoading(false));
    }
  }, [year, department]);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setDepartment("");
      setYear("");
      getData(searchUrl)
        .then((data) => {
          setResults(data);
          setCurrentPage(1);
        })
        .catch(() => alert("Failed to Search Results"))
        .finally(() => setIsLoading(false));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <main className="flex-grow relative z-10">
        <DecorativeBubbles />
        <section className="max-w-7xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6 lg:p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
            <ResultsHeader />
            
            <ResultsFilters
              departmentNames={departmentNames}
              department={department}
              setDepartment={setDepartment}
              years={years}
              setYear={setYear}
              query={query}
              setQuery={setQuery}
            />

            <div className="overflow-hidden">
              <ResultsTable
                isLoading={isLoading}
                currentResults={currentResults}
                department={department}
                year={year}
                query={query}
              />
            </div>

            <ResultsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              resultsPerPage={resultsPerPage}
              setResultsPerPage={setResultsPerPage}
              indexOfFirstResult={indexOfFirstResult}
              indexOfLastResult={indexOfLastResult}
              results={results}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Results;