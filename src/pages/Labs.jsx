import React, { useContext, useEffect } from 'react'
import { DepartmentContext } from './Department';
import LabCard from '../components/Labs/LabCard';

const getLabs = async (depo_code) => {
  try {
    const response = await fetch(`http://localhost:3000/labs?depo_code=${depo_code}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error at fetching labs :", error);
    
  }
}

function Labs() {
    const depo_code = useContext(DepartmentContext);
    const [labs, setLabs] = React.useState([]);
    useEffect(() => {
      getLabs(depo_code).then(data => setLabs(data));
    }, [depo_code]);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Labs</h2>
      {labs.length > 0 ? (
        <div className="grid gap-6">
          {labs.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      ) : (
        <p className="text-center">No labs available.</p>
      )}
    </div>
  )
}

export default Labs