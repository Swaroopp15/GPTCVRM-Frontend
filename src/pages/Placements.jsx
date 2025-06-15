import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router";
import { Context } from "../../Context/Context";
import { getPlacements, getPlacementYears } from "../functions/placements";
import DecorativeBubbles from "../components/hero/DecorativeBubbles";
import PlacementsHeader from "../../src/SubParts/Placemetns/PlacementsHeader";
import PlacementsFilters from "../../src/SubParts/Placemetns/PlacementsFilters";
import PlacementsTable from "../../src/SubParts/Placemetns/PlacementsTable";
import PlacementsPagination from "../../src/SubParts/Placemetns/PlacementsPagination";

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [placementsPerPage, setPlacementsPerPage] = useState(10);

  const location = useLocation();
  const isDepartmentRoute =
    location.pathname === "/department" ||
    location.pathname.startsWith("/department/");

  const filteredPlacements = placements.filter((placement) =>
    !search ||
    (placement.name?.toLowerCase().includes(search.toLowerCase()) ||
      placement.pin?.toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLastPlacement = currentPage * placementsPerPage;
  const indexOfFirstPlacement = indexOfLastPlacement - placementsPerPage;
  const currentPlacements = filteredPlacements.slice(
    indexOfFirstPlacement,
    indexOfLastPlacement
  );
  const totalPages = Math.ceil(filteredPlacements.length / placementsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}placements/all`
        );
        const data = await response.json();
        const sorted = data.sort(
          (a, b) => parseFloat(b.package) - parseFloat(a.package)
        );
        setPlacements(sorted);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching placements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (!selectedDepartment && !year) return;
    setIsLoading(true);
    getPlacements(selectedDepartment, year).then((data) => {
      const sorted = data.sort(
        (a, b) => parseFloat(b.package) - parseFloat(a.package)
      );
      setPlacements(sorted);
      setCurrentPage(1);
      setIsLoading(false);
    });
  }, [selectedDepartment, year]);

  useEffect(() => {
    getPlacementYears(selectedDepartment).then((data) => {
      setYears(data);
    });
  }, [selectedDepartment]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDepartment, year]);

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      <main className="flex-grow relative z-10">
        {!isDepartmentRoute && <DecorativeBubbles />}
        <section className="max-w-7xl mx-auto mt-4 sm:mt-8 p-4 sm:p-6 lg:p-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
            <PlacementsHeader />

            <PlacementsFilters
              departmentNames={departmentNames}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              years={years}
              setYear={setYear}
              search={search}
              setSearch={setSearch}
            />

            <div className="overflow-hidden">
              <PlacementsTable
                isLoading={isLoading}
                currentPlacements={currentPlacements}
              />
            </div>

            <PlacementsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              placementsPerPage={placementsPerPage}
              setPlacementsPerPage={setPlacementsPerPage}
              indexOfFirstPlacement={indexOfFirstPlacement}
              indexOfLastPlacement={indexOfLastPlacement}
              filteredPlacements={filteredPlacements}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Placements;
