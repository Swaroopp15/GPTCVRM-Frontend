import React, { useEffect, useState } from 'react'
import { deleteBook, fetchLibrary } from '../../../../functions/library';

function DeleteBook() {
  const [library, setLibrary] = useState(null);
  const [type, setType] = useState('books');
  useEffect(() => {
    fetchLibrary()
      .then(data => {
        setLibrary(data);
      })
      .catch(error => {
        console.error("Error fetching library data:", error);
      });
  }, [])
  const deleteB = async (event) => {
    try {
      event.preventDefault();
      deleteBook(event.target.bookId.value)
        .then(() => {
          alert("Book deleted successfully");
          setLibrary(prevLibrary => ({
            ...prevLibrary,
            [type]: prevLibrary[type].filter(book => book.id !== event.target.bookId.value)
          }));
        })
        .catch(error => {
          console.error("Error deleting book:", error);
          alert("Error deleting book");
        });
    } catch (error) {
      console.error("Error at deleting book:", error);
      alert("Error deleting book");
    }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Delete Book</h3>
        <p className="text-sm text-gray-500 mt-1">Remove a book from the library</p>
      </div>

      <form onSubmit={deleteB} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Select Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select name="type" id="type" onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
              <option value="books" selected>Book</option>
             <option value="journals">Journal</option>
            </select>
          </div>
          {type && <div>
            <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-2">
              Select Book
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select name="bookId" id="bookId"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            >
              <option disabled selected> Select Book</option>
              {library && library[type.toString()] && library[type.toString()].map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete Book
        </button>
      </form>
    </div>
  )
}

export default DeleteBook