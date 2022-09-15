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
import LoadingSpinner from '../components/loading/LoadingSpinner'

const ListNotesPage = ({ onSearchEventHandler, onKeywordChangeEventHandler, search }) => {
  const { locale } = useContext(LocaleContext)

  const [activeNotes, setActiveNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setActiveNotes(data);
    })

    getArchivedNotes().then(({ data }) => {
      setArchivedNotes(data);
    })

    setTimeout(() => { setLoading(false) }, 1200) // purposes to presentation only
    // setLoading(false)
  }, []);

  // i think this is not the best practice
  const onArchiveEventHandler = (id, isArchived) => {
    setLoading(true)
    if (isArchived) {
      unarchiveNote(id).then(response => {
        getArchivedNotes().then(({ data }) => {
          setArchivedNotes(data);
        })
        getActiveNotes().then(({ data }) => {
          setActiveNotes(data);
        })
      }).catch(error => console.error(error))
      setLoading(false)
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
    setLoading(false)
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <article className='w-full flex flex-col gap-5 flex-wrap'>
      <Link to='/notes/new' className='ml-auto flex gap-3 items-center border-2 p-2 bg-primary dark:bg-dark-button'>
        <span>{(locale === 'id' ? 'Tambahkan Note Baru' : 'Add New Notes')}</span>
      </Link>
      <Search onSearch={onSearchEventHandler} onKeywordChange={onKeywordChangeEventHandler} search={search} placeholder={(locale === 'id' ? 'Cari note' : 'Find your notes here....')} />
      <Tabs>
        <div label='Notes'>
          {
            (activeNotes.length > 0)
              ? <NotesList notes={activeNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : (locale === 'id' ? 'Note kosong' : 'Note is empty')
          }
        </div>
        <div label='Archived'>
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