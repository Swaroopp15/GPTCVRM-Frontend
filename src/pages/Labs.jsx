import React, { useContext, useEffect } from 'react'
import { DepartmentContext } from './Department';
import LabCard from '../components/Labs/LabCard';
import { getLabs } from '../functions/labs';


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