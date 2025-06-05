import React, { useContext, useEffect, useState } from "react";
import LibraryOverview from "../components/Library/LibraryOverview ";
import BookList from "../components/Library/BookList";
import JournalList from "../components/Library/JournalList";
import { Context } from "../../Context/Context";
import Ebooks from "../components/Library/Ebooks";
import ErrorMessage from "../components/hero/ErrorMessage";
import LoadingSpinner from "../components/hero/Spinner";

function Library() {
  const [library, setLibrary] = useState(null);
  const [overview, setOverview] = useState(null);
  const [ebooks, setEbooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { college } = useContext(Context);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!library) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ErrorMessage message="No library data available" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-red-50 to-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-red-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            College Library
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-red-700 sm:mt-4">
            Explore our vast collection of resources
          </p>
        </div>
        
        <LibraryOverview library={overview} ebooksLength={ebooks?.length} />
        <BookList books={library.books} />
        <JournalList journals={library.journals} />
        <Ebooks books={ebooks} />
      </div>
    </div>
  );
}

export default Library;