import React, { useContext, useEffect, useState } from "react";
import LibraryOverview from "../components/Library/LibraryOverview ";
import BookList from "../components/Library/BookList";
import JournalList from "../components/Library/JournalList";
import { Context } from "../../Context/Context";

const libraryData = {
  area: 15000,
  titles: 125000,
  volumes: 250000,
  journals: 5000,
  ebooks: 75000,
  budget: 25000000,
};

const sampleBooks = [
  {
    name: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    copies: 15,
  },
  { name: "Clean Code", author: "Robert C. Martin", copies: 8 },
  { name: "Design Patterns", author: "Erich Gamma", copies: 12 },
  { name: "The Pragmatic Programmer", author: "Andrew Hunt", copies: 10 },
  {
    name: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson",
    copies: 5,
  },
];

const sampleJournals = [
  { name: "Nature", publisher: "Springer Nature" },
  {
    name: "Science",
    publisher: "American Association for the Advancement of Science",
  },
  { name: "The Lancet", publisher: "Elsevier" },
  {
    name: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    publisher: "IEEE",
  },
  {
    name: "Journal of the American Medical Association",
    publisher: "American Medical Association",
  },
];

function Library() {
  const [library, setLibrary] = useState({});
  const [overview, setOverview] = useState({

  });
  const { college } = useContext(Context);
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND + "library");
        const data = await response.json();
        setLibrary(data);

        const over = {budget: college.library_budget, area: college.library_area, ebooks : college.ebooks};
        setOverview({...over, ...data.library })
        
      } catch (error) {
       console.log("Error in fetching library details : ", error);
      }
    };
    fetchLibrary();
  }, [college]);
  return (
    <div className="Library p-6 space-y-6">
      {library ? (
        <>
          <LibraryOverview library={overview} />
          <BookList books={library.books} />
          <JournalList journals={library.journals} />
        </>
      ) : <></>}
    </div>
  );
}

export default Library;
