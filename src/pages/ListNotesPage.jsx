// Packages
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

// API
import { archiveNote, deleteNote, getActiveNotes, getArchivedNotes, unarchiveNote } from '../utils/network-data'

// Context
import LocaleContext from '../contexts/LocaleContext'

// Components
import NotesList from '../components/notes/NotesList'
import Search from '../components/notes/Search'
import Tabs from '../components/notes/Tabs'

const ListNotesPage = ({ onSearchEventHandler, onKeywordChangeEventHandler, search }) => {
  const { locale } = useContext(LocaleContext)

  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setActiveNotes(data);
    })
  }, []);

  useEffect(() => {
    getArchivedNotes().then(({ data }) => {
      setArchivedNotes(data);
    })
  }, [])


  // i think this is not the best practice
  const onArchiveEventHandler = (id, isArchived) => {
    if (isArchived) {
      unarchiveNote(id).then(response => {
        getArchivedNotes().then(({ data }) => {
          setArchivedNotes(data);
        })
        getActiveNotes().then(({ data }) => {
          setActiveNotes(data);
        })
      }).catch(error => console.error(error))
      return
    }
    archiveNote(id).then(response => {
      getArchivedNotes().then(({ data }) => {
        setArchivedNotes(data);
      })
      getActiveNotes().then(({ data }) => {
        setActiveNotes(data);
      })
    }).catch(error => console.error(error))

    getArchivedNotes().then(({ data }) => {
      setArchivedNotes(data);
    })

    getActiveNotes().then(({ data }) => {
      setActiveNotes(data);
    })
  }

  const onDeleteEventHandler = (id) => {
    deleteNote(id).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'The note was deleted',
        icon: 'success',
        timer: 1500,
        width: '16em',
        timerProgressBar: true,
        showConfirmButton: false,
        backdrop: false,
        position: 'top-end',
        toast: true
      })

      getArchivedNotes().then(({ data }) => {
        setArchivedNotes(data);
      })
      getActiveNotes().then(({ data }) => {
        setActiveNotes(data);
      })
    }).catch(error => console.error(error))
  }

  return (
    <article className='w-full flex flex-col gap-5 flex-wrap'>
      <Link to='/notes/new' className='ml-auto flex gap-3 items-center border-2 p-2 bg-primary'>
        <span>{(locale === 'id' ? 'Tambahkan Note Baru' : 'Add New Notes')}</span>
      </Link>
      <Search onSearch={onSearchEventHandler} onKeywordChange={onKeywordChangeEventHandler} search={search} placeholder={(locale === 'id' ? 'Cari note' : 'Find your notes here....')}/>
      <Tabs>
        <div label='Notes'>
          {
            (activeNotes.length > 0)
              ? <NotesList notes={activeNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : (locale === 'id' ? 'Note kosong' : 'Note is empty')
          }
        </div>
        <div label={(locale === 'id' ? 'Arsip' : 'Archived')}>
          {
            (archivedNotes.length > 0)
              ? <NotesList notes={archivedNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : (locale === 'id' ? 'Tidak ada note yang diarsipkan' : 'There is no archived note here')
          }
        </div>
      </Tabs>
    </article>
  )
}

ListNotesPage.propTypes = {
  onSearchEventHandler: PropTypes.func.isRequired,
  onKeywordChangeEventHandler: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
}

export default ListNotesPage