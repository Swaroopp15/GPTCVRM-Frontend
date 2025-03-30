const getPlacementsUrl = (depo_code, year) => {
  const placementYear = year || new Date().getFullYear();
  console.log("placementYear : ", placementYear);
  
  if (!depo_code) {
    return import.meta.env.VITE_BACKEND +`placements/getPlacements/${placementYear}`;
  }
  return import.meta.env.VITE_BACKEND +`placements/${depo_code}/${placementYear}`;
}

const getPlacements = async (depo_code, year) => {
  try {
    const url = getPlacementsUrl(depo_code, year);
    console.log("url : ", url);
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error at fetching department placements : ", error);
  }
};

export default getPlacements;