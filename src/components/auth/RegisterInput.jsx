import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { register } from '../../utils/network-data';
import Swal from 'sweetalert2';

const RegisterInput = () => {
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
      <input type='text' placeholder='Nama' value={name} onChange={onNameChangeHandler} className='w-full border-2 p-1 note-create__title-input border-[#aaa]' />
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

// class RegisterInput extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       name: "',
//       email: '',
//       password: '',
//     }

//     this.onNameChange = this.onNameChange.bind(this);
//     this.onEmailChange = this.onEmailChange.bind(this);
//     this.onPasswordChange = this.onPasswordChange.bind(this);
//     this.onSubmitHandler = this.onSubmitHandler.bind(this);
//   }

//   onNameChange(event) {
//     this.setState(() => {
//       return {
//         name: event.target.value,
//       };
//     });
//   }

//   onEmailChange(event) {
//     this.setState(() => {
//       return {
//         email: event.target.value
//       };
//     });
//   }

//   onPasswordChange(event) {
//     this.setState(() => {
//       return {
//         password: event.target.value
//       };
//     })
//   }

//   onSubmitHandler(event) {
//     event.preventDefault();

//     this.props.register({
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.onSubmitHandler} className='register-input'>
//         <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChange} />
//         <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
//         <input type="password" placeholder="Password" autoComplete='current-password' value={this.state.password} onChange={this.onPasswordChange} />
//         <button>Register</button>
//       </form>
//     )
//   }
// }

// RegisterInput.propTypes = {
//   register: PropTypes.func.isRequired,
// };

// export default RegisterInput;