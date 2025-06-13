import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import { getPlacements, getPlacementYears } from "../functions/placements";
import DecorativeBubbles from "../components/hero/DecorativeBubbles";

const PlacementRecord = ({ placement, index }) => {
  return (
    <tr className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-red-50 group relative z-10`}>
      <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-900 group-hover:text-red-700 transition-colors duration-200">
        {placement.name}
      </td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
        {placement.student_pin}
      </td>
      <td className="py-4 px-6 border-b border-gray-200">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {placement.depo_code?.toUpperCase()}
        </span>
      </td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700 font-medium">
        {placement.company}
      </td>
      <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
        {placement.role}
      </td>
      <td className="py-4 px-6 border-b border-gray-200 font-semibold text-green-600">
        {placement.package} LPA
      </td>
      <td className="py-4 px-6 border-b border-gray-200">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {placement.year}
        </span>
      </td>
    </tr>
  );
};

function Placements() {
  const [query, setQuery] = useSearchParams();
  const defaultDepo = query.get("depo_code");
  const defaultYear = query.get("year");

  const [year, setYear] = useState(defaultYear);
  const [years, setYears] = useState([]);
  const { departmentNames } = useContext(Context);
  const [selectedDepartment, setSelectedDepartment] = useState(defaultDepo);
  const [placements, setPlacements] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPlacements, setFilteredPlacements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + "placements/all"
        );
        const data = await response.json();
        const sorted = data.sort(
          (a, b) => parseFloat(b.package) - parseFloat(a.package)
        );
        setPlacements(sorted);
      } catch (error) {
        console.error("Error fetching placements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPlacements(placements);
      return;
    }
    const filtered = placements.filter((placement) =>
      placement.name.toLowerCase().includes(search.toLowerCase()) ||
      placement.student_pin.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlacements(filtered);
  }, [placements, search]);

  useEffect(() => {
    if (!selectedDepartment && !year) return;
    setIsLoading(true);
    getPlacements(selectedDepartment, year).then((data) => {
      const sorted = data.sort(
        (a, b) => parseFloat(b.package) - parseFloat(a.package)
      );
      setPlacements(sorted);
      setIsLoading(false);
    });
  }, [selectedDepartment, year]);

  useEffect(() => {
    getPlacementYears(selectedDepartment).then((data) => setYears(data));
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">

      <main className="flex-grow relative z-10">
      <DecorativeBubbles />
        <section className="max-w-7xl mx-auto mt-8 p-4 sm:p-6 lg:p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">

            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10"></div>
              <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-white/5"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Placement Records</h2>
                <p className="text-center text-red-100 max-w-2xl mx-auto">Explore the achievements of our students across various companies and packages</p>
                <div className="w-20 h-1 bg-red-300 mx-auto mt-4 rounded-full"></div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 sm:p-8 border-b border-gray-200 bg-gray-50/70">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <select
                    className="w-full sm:w-64 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm bg-white/90"
                    onChange={(event) => setSelectedDepartment(event.target.value)}
                    value={selectedDepartment || ""}
                  >
                    <option value="">All Departments</option>
                    {departmentNames.map((department, index) => (
                      <option value={department.depo_code} key={index}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>

                  <Selector
                    className="w-full sm:w-48 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 shadow-sm bg-white/90"
                    values={years}
                    setValue={setYear}
                  />
                </div>

                <div className="relative w-full lg:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onInput={(e) => setSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white/90 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                    placeholder="Search by name or PIN..."
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden">
              {isLoading ? (
                <div className="p-12 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pin</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Package</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Year</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPlacements.length > 0 ? (
                        filteredPlacements.map((placement, index) => (
                          <PlacementRecord placement={placement} key={index} index={index} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-8 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h3 className="mt-2 text-lg font-medium text-gray-900">No placements found</h3>
                              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer Stats */}
            {filteredPlacements.length > 0 && (
              <div className="bg-gray-50/70 px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                  <div className="mb-2 sm:mb-0">
                    Showing <span className="font-medium">{filteredPlacements.length}</span> records
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                      <span>Highest Package: {Math.max(...filteredPlacements.map(p => parseFloat(p.package)))} LPA</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                      <span>Average: {(filteredPlacements.reduce((sum, p) => sum + parseFloat(p.package), 0) / filteredPlacements.length).toFixed(2)} LPA</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Placements;
