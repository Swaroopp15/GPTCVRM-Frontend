const deleteEbook = async (id) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + `ebook/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting ebook:", error);
    throw error;
  }
}

export {
  deleteEbook
}