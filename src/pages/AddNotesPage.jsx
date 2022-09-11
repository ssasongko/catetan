// Packages
import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import ContentEditable from 'react-contenteditable';
import autoBind from 'auto-bind';

// Components
import HomeLink from '../components/HomeLink';

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
      <div className="w-full note-create border border-[#aaa] p-6">
        <form className='mb-3' onSubmit={onSubmitEventHandler}>
          <p className="text-right note-create__span">remaining chars : {titleCount}</p>

          <div>
            <label> Title:</label>
            <input className={`w-full border mt-1 p-1 note-create__title-input ${(boolTitle) ? '' : 'input-error'}`} type="text" onChange={onTitleChangeEventHandler} value={title} />
            <label className={`message-error ${(boolTitle) ? 'is_hidden' : ''}`}>The title field is required</label>
          </div>

          <div className='mt-5'>
            <label>Notes: </label>
            <ContentEditable className={`w-full min-h-[12em] items-center border mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'input-error'}`} html={content} onChange={onContentChangeEventHandler} />
            {/* <div className={`w-full min-h-[12em] items-center border mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'input-error'}`} onInput={onContentChangeEventHandler} contentEditable ></div> */}
            <span className={`message-error ${(boolContent) ? 'is_hidden' : ''}`}>The content field is required</span>
          </div>

          {/* <textarea className={`w-full border mt-1 p-1 note-create__content-textarea ${(boolContent) ? '' : 'input-error'}`} cols="30" rows="5" placeholder="Content...." onChange={onContentChangeEventHandler} value={content}></textarea> */}
          <button className="w-full mt-5 p-1 submit-button" type="submit">Submit</button>
        </form>
        <HomeLink />
      </div>
    )
  }
}

export default AddNotesPageWrapper;