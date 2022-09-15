// Packages
import React, { Component, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import parser from 'html-react-parser';

// Context
import LocaleContext from '../contexts/LocaleContext';

// Utils
import { showFormattedDate } from '../utils';
import { getNote } from '../utils/network-data';

// Components
import Heading from '../components/notes/Heading';
import AnchorText from '../components/notes/AnchorText';


const DetailsNotesPage = () => {
  const { locale } = useContext(LocaleContext)

  const [note, setNote] = useState({})

  const { id } = useParams()

  useEffect(() => {
    getNote(id).then(({data})=>{
      setNote(data);
    })

    return () => {
      setNote({})
    }
  }, [])
  
  return (
    // <>test</>
    <div className='w-full flex flex-col gap-y-5 border-2 border-[#aaa] p-6'>
      {note &&
        <>
          <div className='flex justify-between items-center'>
          <Heading text={(locale === 'id' ? 'Detail Note' : 'Note Detail')} />

          {/* Tidak tersedia API update notes */}
            {/* <Link to={`/notes/${note.id}/edit`} className='items-center border-2 p-2 bg-primary'>
              <span>Edit Notes</span>
            </Link> */}
          </div>

          <div className='note-item flex flex-col'>
            <div className='p-3 bg-primary'>
              id: {note.id}
            </div>
            <div className='p-6 note-item__content overflow-auto'>
              <h3 className='note-item__title font-bold'>{note.title}</h3>
              <span className='note-item__date'>{showFormattedDate(note.createdAt)}</span>
              <div className='mt-3'>
                {parser(String(note.body))}
              </div>
            </div>
          </div>
        </>
      }

      {/* if note was not found */}
      {!note &&
        <p className='text-2xl mb-5'>{(locale === 'id' ? 'Note tidak ditemukan' : 'The note was not found, could be deleted ?')}</p>
      }

      <AnchorText navigateTo='/' text={(locale === 'id' ? '<-- Kembali ke Home' : '<-- Back to Home')} />
    </div>
  )
}

export default DetailsNotesPage