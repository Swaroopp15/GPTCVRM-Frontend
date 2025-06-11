const fetchLibrary = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "library");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching library data:", error);
    throw error;
  }
}

const deleteBook = async (bookId) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + `library/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}

const updateBook = async ( data) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + `library/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
}
}

export {
  fetchLibrary,
  deleteBook,
  updateBook
}