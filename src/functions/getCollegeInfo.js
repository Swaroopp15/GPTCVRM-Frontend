import convertArrayToObject from "./arrayToObject";

const getCollegeInfo = async () => {
  try {
    const url = import.meta.env.VITE_BACKEND +  "college-info";
    const response = await fetch(url);
    const result = await response.json();
    const college = convertArrayToObject(result.college);
    return {college, departments: result.departments, committees: result.committees, images: result.images};
  } catch (error) {
    console.log("error at getting college information : ", error);
  }
}

export default getCollegeInfo;