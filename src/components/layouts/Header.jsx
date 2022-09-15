import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiLogOut } from 'react-icons/fi';

const Header = ({ logout, name }) => {
  return (
    <header className='w-full h-16 flex justify-center items-center bg-primary p-3'>
      <section className='w-full md:w-2/3 flex justify-between items-center'>
        <Link to='/'>
          <h1 className='font-weight-bolder text-4xl comfortaa'>Catetan</h1>
        </Link>

        {(name !== "") && (
          <div>
            <button onClick={logout}>
              <div className='flex items-center'>
                <span>Hi ! {name}</span>
                <i className='ml-3'><FiLogOut /></i>
              </div>
            </button>
          </div>
        )}
      </section>
    </header>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;