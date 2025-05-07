const updateDepartment = async (depocode, updateData) => {
  const url = `${import.meta.env.VITE_BACKEND}departments/${depocode}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error('Failed to update department');
  }
  const data = await response.json();
  alert('Department updated successfully');
  return data;
}

export default updateDepartment;