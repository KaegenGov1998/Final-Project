import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const admin = ({ token }) => {

  return (
    <>
      <div className='flex flex-row bg-gray-50'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <h1>Welcome back, Admin {token.user.user_metadata.full_name}</h1>
          <p>Manage members of the app and control their levels of access</p>
          <div>
            <div className='bg-white border-2 border-gray-100 p-2 rounded-md w-full'>
              <table class="table-auto" className='w-full'>
                <thead className='border-b-2 border-gray-100'>
                  <tr>
                    <th className='w-1/4 text-xl font-bold'>Name</th>
                    <th className='w-1/4 text-xl font-bold'>Location</th>
                    <th className='w-1/4 text-xl font-bold'>Leadership Status</th>
                    <th className='w-1/4 text-xl font-bold'>Admin Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='font-medium'>Kaegen Govender</td>
                    <td>Johannesburg</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td className='font-medium'>Harry Potter</td>
                    <td>Hogwarts</td>
                    <td>Yes</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td className='font-medium'>Jasmine Kennedie</td>
                    <td>New York</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default admin