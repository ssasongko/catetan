// Pacakges
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

// Component
import ToggleTheme from '../notes/ToggleTheme';

// Contexts
import LocaleContext from '../../contexts/LocaleContext';

const Header = ({ logout, name }) => {
  const { locale, setLocale } = useContext(LocaleContext)

  return (
    <header className='w-full h-16 flex justify-center items-center bg-primary dark:bg-dark-primary dark:text-white p-3 border-b'>
      <section className='w-full md:w-2/3 flex justify-between items-center'>
        <Link to='/'>
          <h1 className='font-weight-bolder text-4xl comfortaa'>Catetan</h1>
        </Link>


        <div className="flex items-center gap-x-1 md:gap-x-6 ">

          {/* Locale */}
          <button onClick={() => setLocale(locale === 'id' ? 'en' : 'id')}>{locale}</button>

          <span>|</span>

          <ToggleTheme />

          <span>|</span>

          {(name !== "") && (
            <button onClick={logout}>
              <div className='flex items-center'>
                <span>Hi ! {name}</span>
                <i className='ml-3'><FiLogOut /></i>
              </div>
            </button>
          )}
        </div>

      </section>
    </header>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;