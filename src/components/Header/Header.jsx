import React from 'react';
import Logo from './logo';

function Header() {
  return (
    <div className='w-full bg-white shadow-lg h-20 px-36 flex flex-row justify-between items-center'>
      <Logo />
      <nav>
        <ul className='flex flex-row gap-4 text-gray-700'>
          <li className='text-sm font-medium transition duration-300 cursor-pointer hover:text-red-700 hover:border-b-2 hover:border-red-700'>Home</li>
          <li className='text-sm font-medium transition duration-300 cursor-pointer hover:text-red-700 hover:border-b-2 hover:border-red-700'>About</li>
          <li className='text-sm font-medium transition duration-300 cursor-pointer hover:text-red-700 hover:border-b-2 hover:border-red-700'>Admissions</li>
          <li className='text-sm font-medium transition duration-300 cursor-pointer hover:text-red-700 hover:border-b-2 hover:border-red-700'>Department</li>
        </ul>
      </nav>
    </div>
  )
}

export default Header