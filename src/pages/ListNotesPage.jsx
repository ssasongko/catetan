// Packages
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import NotesList from '../components/notes/NotesList'
import Search from '../components/notes/Search'
import Tabs from '../components/notes/Tabs'
import { archiveNote, getActiveNotes, getArchivedNotes, unarchiveNote } from '../utils/network-data'

const ListNotesPage = ({ onSearchEventHandler, onDeleteEventHandler, onKeywordChangeEventHandler, search }) => {
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
    if(isArchived) {
      unarchiveNote(id)
    }
    archiveNote(id)

    getArchivedNotes().then(({ data }) => {
      setArchivedNotes(data);
    })

    getActiveNotes().then(({ data }) => {
      setActiveNotes(data);
    })
  }

  return (
    // <></>
    <article className='w-full flex flex-col gap-5 flex-wrap'>
      <Link to='/notes/new' className='ml-auto flex gap-3 items-center border-2 p-2 bg-primary'>
        <span>Add New Notes</span>
      </Link>
      <Search onSearch={onSearchEventHandler} onKeywordChange={onKeywordChangeEventHandler} search={search} />
      <Tabs>
        <div label='Notes'>
          {
            (activeNotes.length > 0)
              ? <NotesList notes={activeNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : 'Note is empty'
          }
        </div>
        <div label='Archived'>
          {
            (archivedNotes.length > 0)
              ? <NotesList notes={archivedNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : 'There is no archived note here'
          }
        </div>
      </Tabs>
    </article>
  )
}

ListNotesPage.propTypes = {
  onSearchEventHandler: PropTypes.func.isRequired,
  onDeleteEventHandler: PropTypes.func.isRequired,
  // onArchiveEventHandler: PropTypes.func.isRequired,
  onKeywordChangeEventHandler: PropTypes.func.isRequired,
  // notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired
}

export default ListNotesPage