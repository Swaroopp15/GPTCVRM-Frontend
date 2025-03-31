import React, { useContext, useState } from 'react';
import Logo from './logo';
import Navbar from './Navbar/Navbar';
import { Context } from '../../../Context/Context';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const { college } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='w-full bg-white shadow-lg h-20 px-4 sm:px-8 md:px-16 lg:px-36 flex flex-row justify-between items-center fixed top-0 z-50'>
      <Logo name={college.college_name} />
      
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      <button 
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg md:hidden">
          <Navbar mobile />
        </div>
      )}
    </div>
  )
}

export default Header