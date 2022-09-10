import React from 'react'
import { Link } from 'react-router-dom'

const HomeLink = () => {
  return (
    <>
      <Link to="/">
        <span className='underline'>
          {`<--`} Back to Home
        </span>
      </Link>
    </>
  )
}

export default HomeLink