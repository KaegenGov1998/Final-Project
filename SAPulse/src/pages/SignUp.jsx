import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { supabase } from '../client';

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  })

  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

 async function handleSubmit(e) {
  e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullname,
          }
        }
      })
      alert('Check your E-mail for Verfication Link')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input
          placeholder='Fullname'
          name='fullname'
          onChange={handleChange} />

        <input
          placeholder='Email'
          name='email'
          onChange={handleChange} />

        <input
          placeholder='Password'
          name='password'
          onChange={handleChange} />

        <button type='submit'>Submit</button>

      </form>
      <p>Already a Member? <Link to='/'>Login</Link></p>
    </div>
  )
}

export default SignUp