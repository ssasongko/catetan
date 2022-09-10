import React from 'react'
import { Link } from 'react-router-dom'
import NotesList from '../components/NotesList'
import Search from '../components/Search'
import Tabs from '../components/Tabs'

const ListNotesPage = ({onSearchEventHandler, onDeleteEventHandler, onArchiveEventHandler, notes, search}) => {
  const archivedNotes = notes.filter(note => (note.archived === true));
	const activeNotes = notes.filter(note => (note.archived === false));

  return (
    <article className='w-full md:w-2/3 px-6 flex flex-wrap justify-center mx-auto my-2'>
      <Search onSearch={onSearchEventHandler} />
      <Link to="/notes/new" className='ml-auto mt-3'>Add</Link>
      <Tabs>
        <div label='Notes'>
          {
            (activeNotes.length > 0)
              ? <NotesList notes={activeNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : 'Active note is empty'
          }
        </div>
        <div label='Archived'>
          {
            (archivedNotes.length > 0)
              ? <NotesList notes={archivedNotes} onDelete={onDeleteEventHandler} onArchive={onArchiveEventHandler} search={search} />
              : 'Archived note is empty'
          }

        </div>
        {/* <div label='Add'>
          <NotesInput onAddNotes={onAddNotesEventHandler} />
        </div> */}
      </Tabs>
    </article>
  )
}

export default ListNotesPage