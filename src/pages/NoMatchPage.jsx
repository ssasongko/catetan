// Packages
import React, { useContext } from 'react'

// Context
import LocaleContext from '../contexts/LocaleContext'

// Component
import AnchorText from '../components/notes/AnchorText'

const NoMatchPage = () => {
  const { locale } = useContext(LocaleContext)
  
  return (
    <div className='w-full note-create border-2 border-[#aaa] p-6'>
      <p className='text-center text-4xl mb-4'>{(locale === 'id' ? 'Tidak Ditemukan: 404' : 'Not Found: 404')}</p>
      <AnchorText navigateTo='/' text={(locale === 'id' ? '<-- Kembali ke Home' : '<-- Back to Home')} />
    </div>
  )
}

export default NoMatchPage