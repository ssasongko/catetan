// Packages
import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types'

// Components
import RemainingChars from '../components/notes/RemainingChars';
import NoteInvalidMessage from '../components/notes/InvalidMessage';
import Button from '../components/notes/SubmitButton';
import InputDate from '../components/notes/InputDate';
import Heading from '../components/notes/Heading';
import InputTitle from '../components/notes/InputTitle';
import AnchorText from '../components/notes/AnchorText';

const AddNotesPageWrapper = ({ onAddNotes }) => {
  const navigate = useNavigate();

  return <AddNotesPage navigate={navigate} onAddNotes={onAddNotes} />
}

class AddNotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      titleMaxLength: 50,
      titleCount: 50,
      boolTitle: true,
      boolContent: true,
    }

    autoBind(this);
  }

  onTitleChangeEventHandler(event) {
    const { state: { titleMaxLength } } = this;

    let val = event.target.value.slice(0, titleMaxLength)

    this.setState({
      title: val,
      titleCount: titleMaxLength - val.length,
      boolTitle: val !== ''
    });
  }

  onContentChangeEventHandler(event) {
    let val = event.target.value;

    this.setState({
      content: val,
      boolContent: val !== ''
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { state: { title, content, titleMaxLength }, props: { onAddNotes, navigate } } = this;

    if (title === '' || content === '') {
      this.setState({
        boolTitle: title !== '',
        boolContent: content !== ''
      });
      return;
    }

    onAddNotes({ title, content });

    this.setState({
      title: '',
      content: '',
      titleCount: titleMaxLength
    });

    navigate('/')
  }

  render() {
    const {
      onSubmitEventHandler,
      onTitleChangeEventHandler,
      onContentChangeEventHandler,
      state: {
        title,
        content,
        titleCount,
        boolTitle,
        boolContent,
      }
    } = this;

    return (
      <div className='w-full note-create border-2 border-[#aaa] p-6'>
        <form className='mb-3' onSubmit={onSubmitEventHandler}>
          <Heading text='Create a Note' />

          <div className='mt-5'>
            <div className='flex justify-between items-center'>
              <label>Title:</label>
              <RemainingChars titleCount={titleCount} />
            </div>
            <InputTitle value={title} onChangeValue={onTitleChangeEventHandler} isError={boolTitle} />
            <NoteInvalidMessage isError={boolTitle} errorMessage={'This field is required'} />
          </div>

          <div className='mt-5'>
            <label>Notes: </label>
            <InputDate value={content} onChangeValue={onContentChangeEventHandler} isError={boolContent} />
            <NoteInvalidMessage isError={boolContent} errorMessage={'This field is required'} />
          </div>

          <Button text='Submit' />
        </form>
        <AnchorText navigateTo='/' text={`<-- Back to Home`} />
      </div>
    )
  }
}

AddNotesPageWrapper.propTypes = {
  onAddNotes: PropTypes.func.isRequired,
}

export default AddNotesPageWrapper;