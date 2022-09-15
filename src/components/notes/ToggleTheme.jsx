import React, { useContext } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
    </div>
  )
}

export default ToggleTheme