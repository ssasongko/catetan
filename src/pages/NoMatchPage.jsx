// Packages
import React from 'react'

// Component
import AnchorText from '../components/notes/AnchorText'

const NoMatchPage = () => {
  
  return (
    <div className='w-full note-create border-2 border-[#aaa] p-6'>
      <p className='text-center text-4xl mb-4'>Not Found: 404</p>
      <AnchorText navigateTo='/' text={`<-- Back to Home`} />
    </div>
  )
}

export default NoMatchPage