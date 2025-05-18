import React, { useContext, useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Context } from '../../../Context/Context';
import Part1 from './Part1';
import Part2 from './Part2';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const stickyRef = useRef(null);

  useLayoutEffect(() => {
    if (stickyRef.current) {
      setStickyHeight(stickyRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const part1 = document.getElementById('part1');
      if (part1) {
        setIsSticky(window.scrollY > part1.offsetHeight);
      }
    };

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='h-20'>
      <Part1 />
      <Part2 
        isSticky={isSticky} 
        stickyRef={stickyRef} 
        stickyHeight={stickyHeight} 
      />
    </header>
  );
};

export default Header;