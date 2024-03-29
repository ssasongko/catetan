import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { register } from '../../utils/network-data';
import LocaleContext from '../../contexts/LocaleContext';
import useInput from '../hooks/UseInput';

const RegisterInput = () => {
  const { locale } = useContext(LocaleContext)

  const [name, setName] = useState('')
  const [email, setEmailChangeHandler] = useInput('')
  const [password, setPasswordChangeHandler] = useInput('')

  const onNameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    register({ name, email, password })
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 w-full'>
      <input type='text' placeholder={(locale === 'id' ? 'Nama' : 'Name')} value={name} onChange={onNameChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <input type='email' placeholder='Email' value={email} onChange={setEmailChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <input type='password' placeholder='Password' autoComplete='current-password' value={password} onChange={setPasswordChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <button className='w-full border-2 p-2 bg-primary cursor-pointer dark:bg-dark-button' type='submit'>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput