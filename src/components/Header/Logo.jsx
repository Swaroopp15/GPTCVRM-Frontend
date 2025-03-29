import React from 'react'

function Logo({name}) {
  return (
    <div className='flex flex-row gap-2 items-center'>
      <img src="https://github.com/Swaroop0915/gitImages/blob/main/images/CollegeLogo.jpeg?raw=true" alt="" className='h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-red-700 shadow-md object-cover' />
      <h1 className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold text-red-700 leading-tight'>{name}</h1>
    </div>
  )
}

export default Logo