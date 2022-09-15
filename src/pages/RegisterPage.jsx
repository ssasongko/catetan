import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RegisterInput from '../components/auth/RegisterInput';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/network-data';

const RegisterPage = () => {
  const { locale } = useContext(LocaleContext)

  async function onRegisterHandler(user) {
    await register(user);
  }

  return (
    <section className='w-full md:w-3/5 flex flex-col gap-4'>
      <RegisterInput register={onRegisterHandler} />

      {(locale === 'id') && (
        <p>Sudah punya akun? <Link to='/login' className='underline'>Login di sini.</Link></p>
      )}

      {(locale === 'en') && (
        <p>Have an account? <Link to='/login' className='underline'>Login Here</Link></p>
      )}

    </section>
  )
}

export default RegisterPage