import React from 'react'
import PropTypes from 'prop-types'

const RemainingChars = ({ titleCount }) => {
  return (
    <>
      <span className='text-md'>Remaining chars : {titleCount}</span>
    </>
  )
}

RemainingChars.propTypes = {
  titleCount: PropTypes.number.isRequired
}

export default RemainingChars