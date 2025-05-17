import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommitteeDetails from "../components/Committees/CommitteeDetails";
import CommitteeMembers from "../components/Committees/CommitteeMembers";
import Footer from "../pages/Footer";

function Committee() {
  const { id } = useParams();
  const [committee, setCommittee] = useState();

  useEffect(() => {
    const getCommitteeData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + `committee/info/${id}`
        );
        const data = await response.json();
        console.log("Committee data:", data);
        setCommittee(data[0]);
      } catch (error) {
        console.error("Error fetching committee details:", error);
      }
    };
    getCommitteeData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
          {committee && (
            <>
              <CommitteeDetails committee={committee} />
              <div className="bg-gray-100 font-sans flex items-center justify-center">
                <div className="p-8">
                  <div className="mx-auto">
                    <CommitteeMembers members={committee.members} />
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Committee;
