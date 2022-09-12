// Packages
import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types'

// Utils
import { showFormattedDate } from '../utils';

// Components
import RemainingChars from '../components/notes/RemainingChars';
import NoteInvalidMessage from '../components/notes/InvalidMessage';
import Button from '../components/notes/SubmitButton';
import InputDate from '../components/notes/InputDate';
import Heading from '../components/notes/Heading';
import InputTitle from '../components/notes/InputTitle';
import AnchorText from '../components/notes/AnchorText';
import StaticInput from '../components/notes/StaticInput';

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
      boolTitle: val !== ''
    });
  }

  onContentChangeEventHandler(event) {
    const { note } = this.state
    let val = event.target.value;

    this.setState({
      note: { ...note, body: val },
      boolContent: val !== ''
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

    if (note.title === '' || note.body === '') {
      this.setState({
        boolTitle: note.title !== '',
        boolContent: note.body !== ''
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
      <div className='w-full note-create border-2 border-[#aaa] p-6'>
        {note &&
          <>
            <form className='mb-3' onSubmit={onSubmitEventHandler}>

              <Heading text='Edit a Note' />

              <div className='mt-5'>
                <label>Note ID : </label>
                <StaticInput text={note.id} />
              </div>

              <div className='mt-5'>
                <div className='flex justify-between items-center'>
                  <label>Title:</label>
                  <RemainingChars titleCount={titleCount} />
                </div>

                <InputTitle value={note.title} onChangeValue={onTitleChangeEventHandler} isError={boolTitle} />
                <NoteInvalidMessage isError={boolTitle} errorMessage={'This field is required'} />
              </div>

              <div className='mt-5'>
                <label>Notes: </label>
                <InputDate value={note.body} onChangeValue={onContentChangeEventHandler} isError={boolContent} />
                <NoteInvalidMessage isError={boolContent} errorMessage={'This field is required'} />
              </div>

              <div className='mt-5'>
                <label>Date Created : </label>
                <StaticInput text={showFormattedDate(note.createdAt)} />
              </div>

              <div className='flex gap-x-3 mt-5'>
                <input id='checkBtnArchived' type='checkbox' checked={note.archived} onChange={onArchivedChangeEventHandler} />
                <label htmlFor='checkBtnArchived'>Archived</label>
              </div>
              
              <Button text='Update' />
            </form>

            <AnchorText navigateTo={`/notes/${note.id}`} text={`<-- Back to Detail`} />
          </>
        }

        {!note &&
          <>
            <p className='text-2xl mb-5'>The note was not found, could be deleted ?</p>
            <AnchorText navigateTo='/' text={`<-- Back to Home`} />
          </>
        }
      </div>
    )
  }
}

EditNotesWrapper.propTypes = {
  onFindNoteHandler: PropTypes.func.isRequired,
  onEditNoteHandler: PropTypes.func.isRequired,
}

export default EditNotesWrapper;

