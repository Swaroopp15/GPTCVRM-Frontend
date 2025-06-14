import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Selector from "../components/utility/YearSelector";
import { Context } from "../../Context/Context";
import { getStudents, getStudentYears } from "../functions/students";
import DecorativeBubbles from "../components/hero/DecorativeBubbles";
import Footer from "./Footer";

const StudentRecord = ({ student, index }) => (
  <tr className={`transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-red-50 group relative z-10`}>
    <td className="py-4 px-6 border-b border-gray-200 font-medium text-gray-900 group-hover:text-red-700 transition-colors duration-200">
      {student.name}
    </td>
    <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
      {student.pin}
    </td>
    <td className="py-4 px-6 border-b border-gray-200">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        {student.depo_code?.toUpperCase()}
      </span>
    </td>
    <td className="py-4 px-6 border-b border-gray-200">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {student.year}
      </span>
    </td>
  </tr>
);

function StudentList() {
  const [query] = useSearchParams();
  const defaultDepo = query.get("depo_code");
  const defaultSem = query.get("sem");
const [semester, setSemester] = useState(defaultSem || "");
  const { departmentNames } = useContext(Context);
  const [selectedDepartment, setSelectedDepartment] = useState(defaultDepo);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        if (!selectedDepartment && !semester) return ;
        const res = await fetch(import.meta.env.VITE_BACKEND + "students/?semester=" + semester + "&depo_code=" + selectedDepartment);
        setStudents(await res.json());
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredStudents(students);
      return;
    }
    const term = search.toLowerCase();
    setFilteredStudents(
      students.filter(
        (s) => s.name.toLowerCase().includes(term) || s.pin.toLowerCase().includes(term)
      )
    );
  }, [students, search]);

  useEffect(() => {
    if (!selectedDepartment && !semester) return;
    setIsLoading(true);
    getStudents(selectedDepartment, semester).then((data) => {
      setStudents(data);
      setIsLoading(false);
    });
    setIsLoading(false);
  }, [selectedDepartment, semester]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DecorativeBubbles />
      <main className="flex-grow relative z-10">
        <section className="max-w-7xl mx-auto mt-8 p-4 sm:p-6 lg:p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">

            <div className="bg-gradient-to-r from-red-700 to-red-600 p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10" />
              <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-white/5" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Student List</h2>
                <p className="text-center text-red-100 max-w-2xl mx-auto">
                  Browse student information across departments and academic years
                </p>
                <div className="w-20 h-1 bg-red-300 mx-auto mt-4 rounded-full" />
              </div>
            </div>

            <div className="p-6 sm:p-8 border-b border-gray-200 bg-gray-50/70">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <select
                    className="w-full sm:w-64 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm bg-white/90"
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    value={selectedDepartment || ""}
                  >
                    <option value="">All Departments</option>
                    {departmentNames.map((d) => (
                      <option key={d.depo_code} value={d.depo_code}>
                        {d.department_name}
                      </option>
                    ))}
                  </select>

                   <select
                    className="w-full sm:w-64 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm bg-white/90"
                    onChange={(e) => setSemester(e.target.value)}
                    value={semester || ""}
                  >
                    <option value="" disabled selected>Select Semester</option>
                    <option value="1">1st Sem</option>
                    <option value="3">3rd Sem</option>
                    <option value="4">4rd Sem</option>
                    <option value="5">5th Sem</option>
                    <option value="6">Training</option>
                  </select>
                </div>

                <div className="relative w-full lg:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onInput={(e) => setSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white/90 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Search by name or PIN..."
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              {isLoading ? (
                <div className="p-12 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase">Student Name</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase">PIN</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase">Department</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase">Year</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((s, i) => <StudentRecord key={i} student={s} index={i} />)
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center">
                            {!selectedDepartment & !semester ? <p className="text-gray-600">Please Select Department and semester to find students</p> : <p className="text-gray-600">No students match your search criteria</p>}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {filteredStudents.length > 0 && (
              <div className="bg-gray-50/70 px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
                Showing <span className="font-medium">{filteredStudents.length}</span> students
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default StudentList;
