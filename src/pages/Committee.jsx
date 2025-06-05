import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommitteeDetails from "../components/Committees/CommitteeDetails";
import CommitteeMembers from "../components/Committees/CommitteeMembers";
import Footer from "../pages/Footer";
import { useNavigate } from "react-router";
import Spinner from "../components/hero/Spinner";

function Committee() {
  const { id } = useParams();
  const [committee, setCommittee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCommitteeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          import.meta.env.VITE_BACKEND + `committee/info/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            navigate("/not-found", { replace: true });
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.committee || !data.faculties) {
          throw new Error("Invalid data structure received from server");
        }

        setCommittee(data);
      } catch (error) {
        console.error("Error fetching committee details:", error);
        setError(error.message || "Failed to load committee details");
      } finally {
        setLoading(false);
      }
    };

    getCommitteeData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div>
            <Spinner />
            <p className="mt-4 text-gray-600">Loading committee details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-center">
            <div className="text-red-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Error Loading Committee</h2>
            <p className="text-gray-600 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
          {committee && (
            <>
              <CommitteeDetails committee={committee.committee[0]} />
              <div className="bg-gray-100 font-sans flex items-center justify-center">
                <div className="p-8">
                  <div className="mx-auto">
                    <CommitteeMembers members={committee.faculties} />
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