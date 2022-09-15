import React, { useContext } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button className="transition duration-500 ease-in-out rounded-full my-auto" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
  )
}

export default ToggleTheme