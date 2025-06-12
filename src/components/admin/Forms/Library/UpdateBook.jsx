import React, { useEffect, useState } from 'react'
import { deleteBook, fetchLibrary, updateBook } from '../../../../functions/library';

function UpdateBook() {
  const [library, setLibrary] = useState(null);
  const [type, setType] = useState('books');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [volumes, setVolumes] = useState(0);
  const [id, setId] = useState(null);
  useEffect(() => {
    fetchLibrary()
      .then(data => {
        setLibrary(data);
      })
      .catch(error => {
        console.error("Error fetching library data:", error);
      });
  }, [])

  useEffect(() => {
    if (library && library[type]) {
      
      const book = library[type].find(b => b.id == id);
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setVolumes(book.volumes);
      }
    }
  }, [id, type, library]);
  

  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Update Book</h3>
        <p className="text-sm text-gray-500 mt-1">Update a book from the library</p>
      </div>

      <form className="space-y-6" encType="multipart/form-data" onSubmit={async (event) => {
        event.preventDefault();
        const data = {
          title: title,
          author: author,
          volume: parseInt(volumes, 10),
          id: id,
        }
        updateBook(data).then(() => {
          alert("Book updated successfully");
        })
      }
    }>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Select Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select name="type" id="type" onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              onChange={(e) => setId(e.target.value)}
              required
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
        <div className='pb-4 mb-4 border-b border-gray-500' />
         <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Book Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter book title"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="author"
              id="author"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter author's name"
              value={author || ''}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
         

          <div>
            <label htmlFor="volumes" className="block text-sm font-medium text-gray-700 mb-2">
              No of Volumes
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              min={1}
              name="volumes"
              id="volumes"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
              placeholder="Enter number of volumes"
              value={volumes || 0}
              onChange={(e) => setVolumes(e.target.value)}
            />
          </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Update Book
        </button>
      </form>
    </div>
  )
}

export default UpdateBook