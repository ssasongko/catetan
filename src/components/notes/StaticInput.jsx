import React from 'react'
import PropTypes from 'prop-types'

const StaticInput = ({text}) => {
  return (
    <>
      <input className='w-full border-2 border-[#aaa] mt-1 p-1 note-create__title-input' type='text' disabled value={text} />
    </>
  )
}

StaticInput.propTypes = {
  text: PropTypes.string.isRequired
}



export default StaticInput