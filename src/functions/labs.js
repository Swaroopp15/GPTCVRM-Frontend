const getLabs = async (depo_code) => {
  try {
    const response = await fetch(`http://localhost:3000/labs?depo_code=${depo_code}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching labs:", error);
    alert("Error fetching labs. Please try again later.");    
  }
}

const deleteLab = async (lab_id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}labs/${lab_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error deleting lab:", error);
    alert("Error deleting lab. Please try again later.");
  }
}

const updateLab = async (lab_id, event) => {
  try {
    const form = new FormData();
    form.append("lab_name", event.target.lab_name.value);
    form.append("description", event.target.description.value);
    form.append("depo_code", event.target.depo_code.value);
    form.append("capacity", event.target.capacity.value);
    form.append("equipment", event.target.equipment.value);
    form.append("category", "labs");
    form.append("subfolder", event.target.lab_name.value);
    
    const files = event.target.lab_images.files;
    for (let i = 0; i < files.length; i++) {
      form.append("lab_images", files[i]);
    }
    
    const response = await fetch(`${import.meta.env.VITE_BACKEND}labs/${lab_id}`, {
      method: 'PUT',
      body: form,
    });
    if (response.ok) {
      alert("Lab updated successfully");
    } else {
      alert("Error updating lab");
    }
  } catch (error) {
    console.log("Error updating lab:", error);
    alert("Error updating lab. Please try again later.");
  }
}

export {
  getLabs,
  deleteLab,
  updateLab
}