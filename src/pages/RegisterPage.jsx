import React from 'react'
import { Link } from 'react-router-dom'
import RegisterInput from '../components/auth/RegisterInput';
import { register } from '../utils/network-data';

const RegisterPage = () => {
  async function onRegisterHandler(user) {
    await register(user);
  }

  return (
    <section className='w-full md:w-3/5 flex flex-col gap-4'>
      <RegisterInput register={onRegisterHandler} />
      <p>Sudah punya akun? <Link to='/login' className='underline'>Login di sini.</Link></p>
    </section>
  )
}

export default RegisterPage