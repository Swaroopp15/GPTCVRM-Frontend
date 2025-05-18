import React, { useContext, useEffect } from "react";
import { Context } from "../../Context/Context";
import DepartmentCard from "../components/Departments/DepartmentCard";
import Spinner from "../components/hero/Spinner";
import Fotter from '../pages/Footer';
import Footer from "../pages/Footer";


function Committees() {
  const { committees } = useContext(Context);
  console.log("Committees", committees);

  return (
    <div>
      <section class="py-16 px-4 sm:px-6 md:px-8 text-center bg-gray-200">
        <h2 class="text-3xl sm:text-4xl font-bold text-red-700">
          Committees
        </h2>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {committees && committees.map((committe, index) => {
            return <DepartmentCard key={index} name={committe.name} link={"/committee/" + committe.id} />;
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Committees;
