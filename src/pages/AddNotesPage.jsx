// Packages
import React, { Component, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types'

// API
import { addNote } from '../utils/network-data';

// Context
import LocaleContext from '../contexts/LocaleContext';

// Components
import RemainingChars from '../components/notes/RemainingChars';
import NoteInvalidMessage from '../components/notes/InvalidMessage';
import Button from '../components/notes/SubmitButton';
import InputDate from '../components/notes/InputDate';
import Heading from '../components/notes/Heading';
import InputTitle from '../components/notes/InputTitle';
import AnchorText from '../components/notes/AnchorText';

const AddNotesPage = () => {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleMaxLength, setTitleMaxLength] = useState(50)
  const [titleCount, setTitleCount] = useState(50)
  const [boolTitle, setBoolTitle] = useState(true)
  const [boolContent, setBoolContent] = useState(true)

  const onTitleChangeEventHandler = (event) =>  {
    let val = event.target.value.slice(0, titleMaxLength)

    setTitle(val)
    setTitleCount(titleMaxLength - val.length)
    setBoolTitle(val !== '')
  }

  const onContentChangeEventHandler = (event) => {
    let val = event.target.value;

    setContent(val)
    setBoolContent(val !== '')
  }

  const onSubmitEventHandler = (event) => {
    event.preventDefault()

    if (title === '' || content === '') {
        setBoolTitle(title !== '')
        setBoolContent(content !== '')
      return;
    }

    addNote({title, body: content})

    navigate('/')
  }

  return (
    <div className='w-full note-create border-2 border-[#aaa] p-6'>
      <form className='mb-3' onSubmit={onSubmitEventHandler}>
        <Heading text={(locale === 'id' ? 'Tambahkan Note' : 'Add a Note')} />

        <div className='mt-5'>
          <div className='flex justify-between items-center'>
            <label>{(locale === 'id' ? 'Judul' : 'Title')}</label>
            <RemainingChars titleCount={titleCount} />
          </div>
          <InputTitle value={title} onChangeValue={onTitleChangeEventHandler} isError={boolTitle} />
          <NoteInvalidMessage isError={boolTitle} errorMessage={(locale === 'id' ? 'Field wajib terisi' : 'This field is required')} />
        </div>

        <div className='mt-5'>
          <label>Notes: </label>
          <InputDate value={content} onChangeValue={onContentChangeEventHandler} isError={boolContent} />
          <NoteInvalidMessage isError={boolContent} errorMessage={(locale === 'id' ? 'Field wajib terisi' : 'This field is required')} />
        </div>

        <Button text='Submit' />
      </form>
      <AnchorText navigateTo='/' text={(locale === 'id' ? '<-- Kembali ke Home' : '<-- Back to Home')} />
    </div>
  )
}

export default AddNotesPage