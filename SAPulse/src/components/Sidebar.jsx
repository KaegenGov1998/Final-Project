import React from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { LogOut, House, ShieldUser, CirclePlus  } from 'lucide-react';

const Sidebar = ({ token }) => {

  let navigate = useNavigate()

  function handleLogout() {
    sessionStorage.removeItem('token')
    navigate("/")

  }

  return (
    <>
    <div className='h-170 bg-blue-950 w-20 m-4 pb-8 rounded-lg flex flex-col items-center justify-between'>
      <div className='flex flex-col items-center h-[50%] justify-evenly'>
      <Link to='/homepage' className='cursor-pointer'><House className='text-white h-10 w-10'/></Link>
      <Link to='/post' className='cursor-pointer'><CirclePlus  className='text-white h-10 w-10'/></Link>
      <Link to='/admin' className='cursor-pointer'><ShieldUser  className='text-white h-10 w-10'/></Link>
      </div>
      <button onClick={handleLogout} className='cursor-pointer'><LogOut className='text-white h-10 w-10'/></button>
    </div>
    
    </>
  )
}

export default Sidebar