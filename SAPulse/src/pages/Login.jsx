import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const Login = ({setToken}) => {

  let navigate = useNavigate()

  const [formData, setFormData] = useState({
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })
    if (error) throw error
    console.log(data)
    setToken(data)
    navigate('/homepage')

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-gray-50'>
              <h1 className='p-6 pb-2 font-bold text-7xl'><span className='text-blue-900'>SA</span><span className='text-gray-500'>Pulse</span></h1>
              <p className='pb-6 text-lg text-gray-600'>The Information you Deserve</p>
              <div className='flex flex-col justify-center items-center border-2 bg-white border-gray-300 rounded-md p-12 gap-4'>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
      
                  <input
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                    className='border border-gray-200 p-2 rounded-md' />
      
                  <input
                    placeholder='Password'
                    name='password'
                    onChange={handleChange} 
                    className='border border-gray-200 p-2 rounded-md'/>

                  <div className='h-10.75'></div>
      
                  <button type='submit' className='w-full bg-blue-950 py-2 text-gray-50 rounded-md hover:cursor-pointer'>Submit</button>
      
                </form>
                <p>Need an Account <Link to='/signup' className='text-blue-950 underline'>Login</Link></p>
              </div>
            </div>
    </div>
  )
}

export default Login