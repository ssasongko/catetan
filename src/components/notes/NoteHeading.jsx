// Packages
import React from 'react'
import PropTypes from 'prop-types'

const NoteHeading = ({text}) => {
  return (
    <>
      <h4 className='text-2xl'>
        {text}
      </h4>
    </>
  )
}

NoteHeading.propTypes = {
  text: PropTypes.string.isRequired
}

export default NoteHeading