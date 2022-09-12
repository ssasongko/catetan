// Packages
import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text }) => {
  return (
    <>
      <button className='w-full mt-5 border-2 p-2 bg-primary cursor-pointer' type='submit'>{text}</button>
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired
}

export default Button