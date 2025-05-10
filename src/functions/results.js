const getAvailableYears = async (Department) => {
  try {
  const url = import.meta.env.VITE_BACKEND + "results/get-years?depo_code=" + Department.toLowerCase();
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  const years = data.map((year) => year.year);
  return years;
  } catch (error) {
    console.log("Error fetching available years:", error);
  }
}

const getResults = async (year, department) => {
  try {
    const url =
      import.meta.env.VITE_BACKEND +
      "results/get-results?year=" +
      year +
      "&depo_code=" +
      department;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching results:", error);
  }
};

const deleteResults = async (id) => {
  try {
    const url = import.meta.env.VITE_BACKEND + "results/" + id;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error deleting results:", error);
  }
}

export { getAvailableYears, getResults, deleteResults };