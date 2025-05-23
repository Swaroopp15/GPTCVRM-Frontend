import React, { useContext, useEffect, useState } from "react";
import LibraryOverview from "../components/Library/LibraryOverview ";
import BookList from "../components/Library/BookList";
import JournalList from "../components/Library/JournalList";
import { Context } from "../../Context/Context";
import Ebooks from "../components/Library/Ebooks";

function Library() {
  const [library, setLibrary] = useState({});
  const [overview, setOverview] = useState({});
  const [ebooks , setEbooks] = useState({});
  const [loading, setLoading] = useState(true);
  const { college } = useContext(Context);
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + "library");
        const data = await response.json();
        setLibrary(data);

        const over = {budget: college.library_budget, area: college.library_area};
        setOverview({...over, ...data.library })
        setEbooks(data.ebooks);
        setLoading(false)
      } catch (error) {
       console.log("Error in fetching library details : ", error);
      }
    };
    fetchLibrary();
  }, [college]);
  if (loading) return;
  return (
    <div className="Library p-6 space-y-6">
      {library ? (
        <>
          <LibraryOverview library={overview} ebooksLength = {ebooks?.length} />
          <BookList books={library.books} />
          <JournalList journals={library.journals} />
          {ebooks && <Ebooks books={ebooks} />}
        </>
      ) : <></>}
    </div>
  );
}

export default Library;
