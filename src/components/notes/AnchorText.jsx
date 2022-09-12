// Packages
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const AnchorText = ({ navigateTo, text }) => {
  return (
    <>
      <Link to={navigateTo}>
        <span className='underline'>
          {text}
        </span>
      </Link>
    </>
  )
}

AnchorText.propTypes = {
  navigateTo: PropTypes.string.isRequired,
  text: PropTypes.any.isRequired
}


export default AnchorText