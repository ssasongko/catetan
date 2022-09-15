import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { register } from '../../utils/network-data';
import Swal from 'sweetalert2';
import LocaleContext from '../../contexts/LocaleContext';

const RegisterInput = () => {
  const { locale } = useContext(LocaleContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onNameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();


    register({ name, email, password }).
      then(res => {
        if (res.error) {
          Swal.fire({
            title: 'Error!',
            text: res.message,
            icon: 'error',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
          })

          setEmail('')
          setPassword('')
        }
        else {
          Swal.fire({
            title: 'Success!',
            text: res.message,
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false
          })

          setName('')
          setEmail('')
          setPassword('')
        }
      }
      ).catch(error => console.error(error))
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 w-full'>
      <input type='text' placeholder={(locale === 'id' ? 'Nama' : 'Name')} value={name} onChange={onNameChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa]' />
      <input type='email' placeholder='Email' value={email} onChange={onEmailChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa]' />
      <input type='password' placeholder='Password' autoComplete='current-password' value={password} onChange={onPasswordChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa]' />
      <button className='w-full border-2 p-2 bg-primary cursor-pointer' type='submit'>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput