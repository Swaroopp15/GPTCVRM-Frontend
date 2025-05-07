const fetchDepartments = async () => {
  const url = import.meta.env.VITE_BACKEND + "departments";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default fetchDepartments