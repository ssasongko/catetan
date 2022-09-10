import React from 'react'
import HomeLink from '../components/HomeLink'

const NoMatchPage = () => {
  
  return (
    <div className='w-full note-create border border-[#aaa] p-6'>
      <p className='text-center text-4xl mb-4'>Not Found: 404</p>
      <HomeLink/>
    </div>
  )
}

export default NoMatchPage