const getStudentYears = async (depo_code) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}students/admission-years?depo_code=${depo_code}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const years = data.map((year) => year.admission_year);
    return years; 
  } catch (error) {
    console.error("Error fetching student years:", error);
    return [];
  }
}

const deleteStudent = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}students/${id}`,
      {
        method: "DELETE"
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error; // Re-throw to allow handling in the component
  }
}

const getStudents = async (depo_code, semester) => {
  try {
    let url = `${import.meta.env.VITE_BACKEND}students/?semester=` + semester + `&depo_code=` + depo_code;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error; // Re-throw to allow handling in the component
  }
};

const getStudentsByYear = async (depo_code, year) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}students/by-year?depo_code=${depo_code}&year=${year}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Students : ", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching students by year:", error);
    throw error; // Re-throw to allow handling in the component
  }
}

const createStudent = async (studentData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}students/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

const updateStudent = async (id, studentData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}students/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

export {
  getStudentYears,
  deleteStudent,
  getStudents,
  createStudent,
  updateStudent,
  getStudentsByYear
}