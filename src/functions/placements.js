const getPlacementYears = async (depo_code) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}placements/years?depo_code=${depo_code}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
   
    return data;
  } catch (error) {
    console.error("Error fetching years:", error);
    return [];
  }
}

const getStudentsForPlacements = async (depo_code, year) => {
  try{
    const response = await fetch(import.meta.env.VITE_BACKEND+`students/for-placements?depo_code=${depo_code}&admission_year=${year}`);
    const data = await response.json();
    return data
  }
  catch(error) {
    console.log("Error in fetching students for placements :", error);
    
  }
}



const deletePlacement = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND}placements/${id}`,
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
    console.error("Error deleting placement:", error);
  }
}

const getPlacements = async (depo_code, year) => {
  try { 
    const response = await fetch(`${import.meta.env.VITE_BACKEND}placements/${depo_code}/${year}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error at fetching department placements : ", error);
  }
};

export {
  getPlacementYears,
  deletePlacement,
  getPlacements,
  getStudentsForPlacements
}