const getFacilities = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "facility");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching Facilities : ", error);
    alert("failed to fetch Facilities");
  }
};

const deleteFacility = async (id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND + "facility/" + id,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error deleting Facilities : ", error);
    alert("failed to Delete Facilities");
  }
};

const updateFacility = async (id, facility) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + "facility/"+ id, {
      method: "PUT",
      body: facility
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error update Facilities : ", error);
    alert("failed to Update Facilities");
  }
}


export {
  getFacilities,
  deleteFacility,
  updateFacility
}