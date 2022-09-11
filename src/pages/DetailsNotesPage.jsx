import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import HomeLink from '../components/HomeLink';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';

function DetailsNotesPageWrapper({ onFindNoteHandler }) {
  const { id } = useParams()

  const note = onFindNoteHandler(id)
  return <DetailsNotesPage id={id} note={note} />
}
class DetailsNotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note,
    }

  }
  render() {
    const {
      state: {
        note
      }
    } = this;

    return (
      <div className='w-full flex flex-col gap-y-5 border border-[#aaa] p-6'>
        {note &&
          <>
            <div className='flex justify-between items-center'>
              <div className='flex justify-end gap-x-3'>
                <span className='text-2xl'>{(note.archived) ? 'Archived' : 'Active'} Notes</span>
              </div>

              <Link to={`/notes/${note.id}/edit`} className='items-center border-2 p-2 bg-primary'>
                <span>Edit Notes</span>
              </Link>
            </div>

            <div className="note-item flex flex-col">
              <div className='p-3 bg-primary'>
                id: {note.id}
              </div>
              <div className="p-6 note-item__content overflow-auto">
                <h3 className="note-item__title font-bold">{note.title}</h3>
                <span className="note-item__date">{showFormattedDate(note.createdAt)}</span>
                <div className='mt-3'>
                  {parser(note.body)}
                </div>
              </div>
            </div>
          </>
        }

        {/* if note was not found */}
        {!note &&
          <p className='text-2xl mb-5'>The note was not found, could be deleted ?</p>
        }
  
        <HomeLink />
      </div>
    )
  }
}

export default DetailsNotesPageWrapper