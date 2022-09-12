// Packages
import React from 'react'
import PropTypes from 'prop-types'

const Heading = ({ text }) => {
  return (
    <>
      <h4 className='text-2xl'>
        {text}
      </h4>
    </>
  )
}

Heading.propTypes = {
  text: PropTypes.string.isRequired
}

export default Heading