import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/auth/LoginInput';
import { login } from '../utils/network-data';

const LoginPage = ({ loginSuccess }) => {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className='w-full md:w-3/5 flex flex-col gap-4'>
      <LoginInput login={onLogin}/>
      <p>Belum punya akun? <Link to="/register" className='underline'>Daftar di sini.</Link></p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage