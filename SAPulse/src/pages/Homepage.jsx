import React from 'react'
import { useNavigate } from 'react-router-dom';

const homepage = ({token}) => {
  let navigate =useNavigate()

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate("/")
    
  }
  return (
    <div>
      <h1>Welcome back {token.user.user_metadata.full_name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default homepage