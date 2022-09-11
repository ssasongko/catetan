// Packages
import React, { Component } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import autoBind from 'auto-bind';

// Components
import HomeLink from '../components/HomeLink';

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
      titleCount: 50 - props.note ? props.note.title.length : 0,
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
      <div className="w-full note-create border border-[#aaa] p-6">
        {note &&
          <>
            <form className='mb-3' onSubmit={onSubmitEventHandler}>

              <div>
                <label>Note id : </label>
                <input className='w-full border  mt-1 p-1' type='text' disabled value={note.id} />
              </div>

              <hr className='mt-5' />

              <div className='mt-5'>
                <p className="text-right note-create__span">remaining chars : {titleCount}</p>
                <label> Title:</label>
                <input className={`w-full border mt-1 p-1 note-create__title-input ${(boolTitle) ? '' : 'input-error'}`} type="text" onChange={onTitleChangeEventHandler} value={note.title} />
                <label className={`message-error ${(boolTitle) ? 'is_hidden' : ''}`}>The title field is required</label>
              </div>

              <div className='mt-5'>
                <label>Date Created : </label>
                <input className='w-full border  mt-1 p-1' type='text' disabled value={note.createdAt} />
              </div>

              <div className='mt-5'>
                <label>Notes: </label>
                <ContentEditable className={`w-full min-h-[12em] items-center border mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'input-error'}`} html={note.body || ''} onChange={onContentChangeEventHandler} />
                <span className={`message-error ${(boolContent) ? 'is_hidden' : ''}`}>The content field is required</span>
              </div>

              <div className='flex gap-x-3 mt-5'>
                <input type='checkbox' checked={note.archived} onChange={onArchivedChangeEventHandler} />
                <span>Archived</span>
              </div>

              <button className="w-full mt-5 p-1 submit-button" type="submit">Submit</button>
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

