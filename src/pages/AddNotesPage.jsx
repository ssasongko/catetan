// Packages
import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import autoBind from 'auto-bind';

// Components
import HomeLink from '../components/HomeLink';
import NoteHeading from '../components/notes/NoteHeading';
import ReaminingChars from '../components/notes/ReaminingChars';
import NoteInputTitle from '../components/notes/NoteInputTitle';
import NoteInvalidMessage from '../components/notes/NoteInvalidMessage';
import Button from '../components/notes/Button';

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
      boolTitle: val !== ""
    });
  }

  onContentChangeEventHandler(event) {
    let val = event.target.value;

    this.setState({
      content: val,
      boolContent: val !== ""
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { state: { title, content, titleMaxLength }, props: { onAddNotes, navigate } } = this;

    if (title === "" || content === "") {
      this.setState({
        boolTitle: title !== "",
        boolContent: content !== ""
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
      <div className="w-full note-create border-2 border-[#aaa] p-6">
        <form className='mb-3' onSubmit={onSubmitEventHandler}>
          <NoteHeading text='Create a Note' />

          <div className='mt-5'>
            <div className='flex justify-between items-center'>
              <label>Title:</label>
              <ReaminingChars titleCount={titleCount} />
            </div>
            
            <NoteInputTitle value={title} onChangeValue={onTitleChangeEventHandler} isError={boolTitle} />
            <NoteInvalidMessage isError={boolTitle} errorMessage={'This field is required'} />
          </div>

          <div className='mt-5'>
            <label>Notes: </label>
            <ContentEditable className={`w-full min-h-[12em] items-center border mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'border-2 border-danger'}`} html={content} onChange={onContentChangeEventHandler} />
            <NoteInvalidMessage isError={boolContent} errorMessage={'This field is required'} />
          </div>
          
          <Button text='Submit' />
        </form>
        <HomeLink />
      </div>
    )
  }
}

export default AddNotesPageWrapper;