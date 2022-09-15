import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/UseInput';

const LoginInput = ({ login }) => {

  const [email, setEmailChangeHandler] = useInput('')
  const [password, setPasswordChangeHandler] = useInput('')

  const onSubmitHandler = (event) => {
    event.preventDefault()

    login({ email, password })
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 w-full'>
      <input type='email' placeholder='Email' value={email} onChange={setEmailChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <input type='password' placeholder='Password' value={password} onChange={setPasswordChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <button className='w-full border-2 p-2 bg-primary cursor-pointer dark:bg-dark-button' type='submit'>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput