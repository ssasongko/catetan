import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../notes/SubmitButton';

const LoginInput = ({login}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({email, password})
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 w-full'>
      <input type='email' placeholder='Email' value={email} onChange={onEmailChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <input type='password' placeholder='Password' value={password} onChange={onPasswordChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa] dark:text-black' />
      <button className='w-full border-2 p-2 bg-primary cursor-pointer dark:bg-dark-button' type='submit'>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput

// class LoginInput extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: '',
//     };

//     this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
//     this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
//     this.onSubmitHandler = this.onSubmitHandler.bind(this);
//   }

//   onEmailChangeHandler(event) {
//     this.setState(() => {
//       return {
//         email: event.target.value
//       }
//     })
//   }

//   onPasswordChangeHandler(event) {
//     this.setState(() => {
//       return {
//         password: event.target.value
//       };
//     });
//   }

//   onSubmitHandler(event) {
//     event.preventDefault();

//     this.props.login({
//       email: this.state.email,
//       password: this.state.password,
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.onSubmitHandler} className='login-input'>
//         <input type='email' placeholder='Email' value={this.state.email} onChange={this.onEmailChangeHandler} />
//         <input type='password' placeholder='Password' value={this.state.password} onChange={this.onPasswordChangeHandler} />
//         <button>Masuk</button>
//       </form>
//     );
//   }
// }

// LoginInput.propTypes = {
//   login: PropTypes.func.isRequired,
// }

// export default LoginInput;