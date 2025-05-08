const updateCommittees = async (id, name, about) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}committee`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, about, id }),
    });
    if (!response.ok) {
      throw new Error('Failed to update committee');
    }
    alert('Committee updated successfully!');
    return await response.json();
  } catch (error) {
    console.log('Error updating committee:', error);
    alert('Failed to update committee. Please try again later.');
  }
}

export {updateCommittees}