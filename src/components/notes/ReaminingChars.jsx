import React from 'react'
import PropTypes from 'prop-types'

const ReaminingChars = ({titleCount}) => {
  return (
    <>
      <span className='text-md'>Remaining chars : {titleCount}</span>
    </>
  )
}

ReaminingChars.propTypes = {
  titleCount: PropTypes.number.isRequired
}

export default ReaminingChars