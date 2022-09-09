import React from 'react'
import PropTypes from 'prop-types'

const Button = ( {id, handler }) => {
  return (
    <button className='note-item__archive-button' onClick={() => { handler(id, false) }}>
      Active
    </button>
  )
}

ActiveButton.propTypes = {
  id: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired
}

export default Button