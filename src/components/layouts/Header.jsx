import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='w-full h-16 bg-primary flex justify-center items-center p-3'>
      <Link to='/'>
        <h1 className='font-weight-bolder text-4xl comfortaa'>Catetan</h1>
      </Link>
    </header>
  )
}

export default Header;