// Packages
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

// Context
import LocaleContext from '../../contexts/LocaleContext'

const RemainingChars = ({ titleCount }) => {
  const {locale} = useContext(LocaleContext)

  return (
    <>
      <span className='text-md'>{(locale === 'id' ? 'Karakter Tersisa' : 'Remaining chars')} : {titleCount}</span>
    </>
  )
}

RemainingChars.propTypes = {
  titleCount: PropTypes.number.isRequired
}

export default RemainingChars