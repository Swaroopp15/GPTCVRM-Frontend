import React, { useContext } from 'react';
import Logo from './logo';
import Navbar from './Navbar/Navbar';
import { Context } from '../../../Context/Context';

function Header() {
  const {college} = useContext(Context);
  return (
    <div className='w-full bg-white shadow-lg h-20 px-36 flex flex-row justify-between items-center'>
      <Logo  name={college.college_name}/>
      <Navbar />
    </div>
  )
}

export default Header