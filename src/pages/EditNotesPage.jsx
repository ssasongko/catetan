// Packages
import React, { Component } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import autoBind from 'auto-bind';

// Utils
import { showFormattedDate } from '../utils';

// Components
import HomeLink from '../components/HomeLink';
import NoteHeading from '../components/notes/NoteHeading';
import ReaminingChars from '../components/notes/ReaminingChars';
import NoteInputTitle from '../components/notes/NoteInputTitle';
import NoteInvalidMessage from '../components/notes/NoteInvalidMessage';
import Button from '../components/notes/Button';

const EditNotesWrapper = ({ onFindNoteHandler, onEditNoteHandler }) => {
  const navigate = useNavigate();
  const { id } = useParams()
  const note = onFindNoteHandler(id)

  return <EditNotes note={note} navigate={navigate} onEditNoteHandler={onEditNoteHandler} />
}

class EditNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note || '',
      titleMaxLength: 50,
      titleCount: 50 - props.note.title.length || 0,
      boolTitle: true,
      boolContent: true,
    }

    autoBind(this);
  }

  onTitleChangeEventHandler(event) {
    const { state: { note, titleMaxLength } } = this;

    let val = event.target.value.slice(0, titleMaxLength)

    this.setState({
      note: { ...note, title: val },
      titleCount: titleMaxLength - val.length,
      boolTitle: val !== ""
    });
  }

  onContentChangeEventHandler(event) {
    const { note } = this.state
    let val = event.target.value;

    this.setState({
      note: { ...note, body: val },
      boolContent: val !== ""
    });
  }

  onArchivedChangeEventHandler() {
    const { note } = this.state

    this.setState({
      note: { ...note, archived: !note.archived }
    })
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { state: { note }, props: { onEditNoteHandler, navigate } } = this

    if (note.title === "" || note.body === "") {
      this.setState({
        boolTitle: note.title !== "",
        boolContent: note.body !== ""
      });
      return;
    }

    onEditNoteHandler(note);
    navigate('/')
  }

  render() {
    const {
      onSubmitEventHandler,
      onTitleChangeEventHandler,
      onContentChangeEventHandler,
      onArchivedChangeEventHandler,
      state: {
        note,
        titleCount,
        boolTitle,
        boolContent,
      },
    } = this;

    return (
      <div className="w-full note-create border-2 border-[#aaa] p-6">
        {note &&
          <>
            <form className='mb-3' onSubmit={onSubmitEventHandler}>

              <NoteHeading text='Edit a Note' />

              <div className='mt-5'>
                <label>Note ID : </label>
                <input className='w-full border  mt-1 p-1' type='text' disabled value={note.id} />
              </div>

              <div className='mt-5'>
                <div className='flex justify-between items-center'>
                  <label>Title:</label>
                  <ReaminingChars titleCount={titleCount} />
                </div>

                <NoteInputTitle value={note.title} onChangeValue={onTitleChangeEventHandler} isError={boolTitle} />
                <NoteInvalidMessage isError={boolTitle} errorMessage={'This field is required'} />
              </div>

              <div className='mt-5'>
                <label>Date Created : </label>
                <input className='w-full border  mt-1 p-1' type='text' disabled value={showFormattedDate(note.createdAt)} />
              </div>

              <div className='mt-5'>
                <label>Notes: </label>
                <ContentEditable className={`w-full min-h-[12em] items-center border mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'border-2 border-danger'}`} html={note.body || ''} onChange={onContentChangeEventHandler} />
                <NoteInvalidMessage isError={boolContent} errorMessage={'This field is required'} />
              </div>

              <div className='flex gap-x-3 mt-5'>
                <input id="checkBtnArchived" type='checkbox' checked={note.archived} onChange={onArchivedChangeEventHandler} />
                <label htmlFor="checkBtnArchived">Archived</label>
              </div>

              <Button text='Update'/>
            </form>

            <Link to={`/notes/${note.id}`} className='underline'>
              {`<--`} Back to Detail
            </Link>
          </>
        }

        {!note &&
          <>
            <p className='text-2xl mb-5'>The note was not found, could be deleted ?</p>
            <HomeLink />
          </>
        }
      </div>
    )
  }
}

export default EditNotesWrapper;

