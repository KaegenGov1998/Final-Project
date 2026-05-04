import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const homepage = ({ token }) => {
  let navigate = useNavigate()

  function handleLogout() {
    sessionStorage.removeItem('token')
    navigate("/")

  }
  return (
    <>
      <div className='flex flex-row bg-gray-50'>
        <Sidebar />
        <div className='flex flex-col'>
          <h1>Welcome back {token.user.user_metadata.full_name}</h1>
          <button onClick={handleLogout} className='cursor-pointer'>Logout</button>
        </div>
      </div>
    </>
  )
}

export default homepage