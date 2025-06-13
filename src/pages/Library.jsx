import React, { useContext, useEffect, useState } from "react";
import LibraryOverview from "../components/Library/LibraryOverview ";
import BookList from "../components/Library/BookList";
import JournalList from "../components/Library/JournalList";
import { Context } from "../../Context/Context";
import Ebooks from "../components/Library/Ebooks";
import ErrorMessage from "../components/hero/ErrorMessage";
import LoadingSpinner from "../components/hero/Spinner";
import { motion } from "framer-motion";

function Library() {
  const [library, setLibrary] = useState(null);
  const [overview, setOverview] = useState(null);
  const [ebooks, setEbooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { college } = useContext(Context);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(import.meta.env.VITE_BACKEND + "library");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data) {
          throw new Error("No data received from the server");
        }
        
        setLibrary(data);

        const over = {
          budget: college?.library_budget || 0, 
          area: college?.library_area || 0,
          ...data.library
        };
        
        setOverview(over);
        setEbooks(data.ebooks || []);
      } catch (error) {
        console.error("Error in fetching library details:", error);
        setError(error.message || "Failed to load library data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLibrary();
  }, [college]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!library) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white">
        <ErrorMessage message="No library data available" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-red-50 to-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-red-100 opacity-20 mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full bg-blue-100 opacity-10 mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        <div className="absolute left-1/4 bottom-0 w-80 h-80 rounded-full bg-amber-100 opacity-15 mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-extrabold text-red-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            College Library
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-red-700 sm:mt-4">
            Explore our vast collection of resources
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "books", label: "Books" },
            { id: "journals", label: "Journals" },
            { id: "ebooks", label: "E-Books" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white text-red-700 hover:bg-red-50 border border-red-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20"
        >
          {activeTab === "overview" && (
            <LibraryOverview library={overview} ebooksLength={ebooks?.length} />
          )}
          {activeTab === "books" && <BookList books={library.books} />}
          {activeTab === "journals" && <JournalList journals={library.journals} />}
          {activeTab === "ebooks" && <Ebooks books={ebooks} />}
        </motion.div>
      </div>
    </div>
  );
}

export default Library;