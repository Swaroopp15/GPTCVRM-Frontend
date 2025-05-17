import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import { getPlacements, getPlacementYears } from "../functions/placements";
import Footer from "../pages/Footer";

const PlacementRecord = ({ placement }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="py-3 px-6 border border-gray-300">{placement.name}</td>
      <td className="py-3 px-6 border border-gray-300">
        {placement.student_pin}
      </td>
      <td className="py-3 px-6 border border-gray-300">
        {placement.depo_code?.toUpperCase()}
      </td>
      <td className="py-3 px-6 border border-gray-300">{placement.company}</td>
      <td className="py-3 px-6 border border-gray-300">{placement.role}</td>
      <td className="py-3 px-6 border border-gray-300">
        {placement.package} LPA
      </td>
      <td className="py-3 px-6 border border-gray-300">{placement.year}</td>
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

  useEffect(() => {
    const fetchAll = async () => {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "placements/all"
      );
      const data = await response.json();
      const sorted = data.sort(
        (a, b) => parseFloat(b.package) - parseFloat(a.package)
      );
      setPlacements(sorted);
    };
    fetchAll();
  }, []);

  useEffect(() =>{
    if(!search){
      setFilteredPlacements(placements);
      return;
    }
    const filtered = placements.filter((placement) =>
      placement.name.toLowerCase().includes(search.toLowerCase()) || placement.student_pin.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlacements(filtered)
  }, [placements, search])

  useEffect(() => {
    if (!selectedDepartment && !year) return;
    getPlacements(selectedDepartment, year).then((data) => {
      const sorted = data.sort(
        (a, b) => parseFloat(b.package) - parseFloat(a.package)
      );
      setPlacements(sorted);
    });
  }, [selectedDepartment, year]);

  useEffect(() => {
    getPlacementYears(selectedDepartment).then((data) => setYears(data));
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <section className="max-w-6xl mx-auto mt-10 p-6 sm:p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-6">
            Placement Records
          </h2>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col sm:flex-row justify-start gap-5 px-2 sm:px-0 mb-6">
              <select
                className="w-full sm:w-[250px] border border-gray-300 rounded p-2"
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
                className="border border-gray-300 rounded p-2"
                values={years}
                setValue={setYear}
              />
            </div>
            <input type="text" onInput={(e) => setSearch(e.target.value)} className="h-10 w-[350px] rounded-md outline-none px-3 bg-gray-200" placeholder="Search for specific Name or Pin number" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-red-700 text-white text-left">
                  <th className="py-3 px-6 border border-gray-300">
                    Student Name
                  </th>
                  <th className="py-3 px-6 border border-gray-300">Pin</th>
                  <th className="py-3 px-6 border border-gray-300">
                    Department
                  </th>
                  <th className="py-3 px-6 border border-gray-300">Company</th>
                  <th className="py-3 px-6 border border-gray-300">Role</th>
                  <th className="py-3 px-6 border border-gray-300">Package</th>
                  <th className="py-3 px-6 border border-gray-300">Year</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlacements.length > 0 ? (
                  filteredPlacements  .map((placement, index) => (
                    <PlacementRecord placement={placement} key={index} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-4 px-6 text-center text-gray-500"
                    >
                      No placements found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Placements;
