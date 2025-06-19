const fetchFaculty = async (depo_code) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}faculty?depo_code=${depo_code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching faculty data:", error);
    alert("Error fetching faculty data. Please try again later.");
  }
}

const updateFaculty = async (id, faculty_name, faculty_role, email, number, qualification, depo_code, image) => {
  try {
    const formData = new FormData();
    formData.append("faculty_name", faculty_name);
    formData.append("faculty_role", faculty_role);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("qualification", qualification);
    formData.append("depo_code", depo_code);
    if (image) {
      formData.append("image", image);
    }
    if (!id) {
      throw new Error("Faculty ID is required for updating.");
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND}faculty/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    alert("Faculty data updated successfully!");
    return data;
  } catch (error) {
    console.log("Error updating faculty data:", error);
    alert("Error updating faculty data. Please try again later.");
  }
}

export  {fetchFaculty, updateFaculty}