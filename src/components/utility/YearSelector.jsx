import React, { useEffect, useState } from 'react'

// function to fetch years from the backend
const getYears = async (url) => {
  try {
    console.log("years url : ", url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching years:', error);
    return [];
  }
}

function YearSelector({url, year, setYear}) {
  const [years, setYears] = useState([]);
  useEffect(() => {
    getYears(url).then((data) => {
      setYears(data.years);
      console.log("Placement years : ", data);
    }).catch((error) => {
      console.error('Error fetching years:', error);
    });
  },[]);
  return (
    <select name="" id="">
      {years?.map((year) => {
        return <option value={year.year}>{year.year}</option>
      }
    )}
    </select>
  )
}

export default YearSelector