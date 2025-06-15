import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Context } from "../../Context/Context";
import DecorativeBubbles from "../components/hero/DecorativeBubbles";
import Footer from "./Footer";
import StudentListHeader from "../../src/SubParts/StudentsList/StudentListHeader";
import StudentListFilters from "../../src/SubParts/StudentsList/StudentListFilters";
import StudentListTable from "../../src/SubParts/StudentsList/StudentListTable";
import StudentListPagination from "../../src/SubParts/StudentsList/StudentListPagination";

function StudentList() {
  const [query] = useSearchParams();
  const defaultDepo = query.get("depo_code");
  const defaultSem = query.get("sem");
  const [semester, setSemester] = useState(defaultSem || "");
  const { departmentNames } = useContext(Context);
  const [selectedDepartment, setSelectedDepartment] = useState(defaultDepo || "");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      if (!selectedDepartment || !semester) {
        setStudents([]);
        setFilteredStudents([]);
        return;
      }

      const cleanDepo = selectedDepartment.trim().replace(/\s+/g, '');
      const cleanSem = semester.trim();

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}students/?semester=${encodeURIComponent(cleanSem)}&depo_code=${encodeURIComponent(cleanDepo)}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
      setFilteredStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [selectedDepartment, semester]);

  useEffect(() => {
    if (!search) {
      setFilteredStudents([...students]);
      return;
    }

    const term = search.toLowerCase();
    setFilteredStudents(
      students.filter(s =>
      (s.name?.toLowerCase().includes(term) ||
        s.pin?.toLowerCase().includes(term))
      )
    );
    setCurrentPage(1);
  }, [students, search]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <DecorativeBubbles />
      <main className="flex-grow relative z-10">
        <section className="max-w-7xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6 lg:p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
            <StudentListHeader />

            <StudentListFilters
              departmentNames={departmentNames}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              semester={semester}
              setSemester={setSemester}
              search={search}
              setSearch={setSearch}
            />

            <div className="overflow-hidden">
              <StudentListTable
                isLoading={isLoading}
                currentStudents={currentStudents}
                selectedDepartment={selectedDepartment}
                semester={semester}
              />
            </div>

            <StudentListPagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              indexOfFirstStudent={indexOfFirstStudent}
              indexOfLastStudent={indexOfLastStudent}
              filteredStudents={filteredStudents}
              studentsPerPage={studentsPerPage}
              setStudentsPerPage={setStudentsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default StudentList;