import React, { useState, useEffect } from 'react'
import { supabase } from '../client'
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import { Search } from "lucide-react"

const Admin = ({ token }) => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  async function fetchUsers() {
    const { data: userData, error } = await supabase
      .from('users')
      .select('full_name, email, is_admin, is_leader')

    if (error) console.error(error)
    else setUsers(userData)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function updateUser(email, field, value) {
    const { error } = await supabase
      .from('users')
      .update({ [field]: value })
      .eq('email', email)

    if (error) console.error(error)
    else setUsers(prev =>
      prev.map(u => u.email === email ? { ...u, [field]: value } : u)
    )
  }

  const filtered = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className="flex flex-col w-full gap-4 pr-4 pt-8 justify-around">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome back, Admin {token.user.user_metadata.full_name}
          </h1>
          <p className="text-lg font-light">
            Manage members of the app and control their levels of access
          </p>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row w-120 bg-white border-2 border-gray-100 rounded-md p-2 my-2">
              <Search className="mr-2" />
              <input
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 p-2 rounded-md w-full">
            <table className="w-full table-fixed border-separate border-spacing-y-6">
              <thead className="border-b-2 border-gray-100">
                <tr>
                  <th className="w-1/4 text-xl font-bold">Name</th>
                  <th className="w-1/4 text-xl font-bold">Email</th>
                  <th className="w-1/4 text-xl font-bold">Leadership Status</th>
                  <th className="w-1/4 text-xl font-bold">Admin Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.email}>
                    <td className="font-medium">{user.full_name}</td>
                    <td className="font-light">{user.email}</td>

                    <td>
                      <button
                        onClick={() => updateUser(user.email, 'is_leader', !user.is_leader)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.is_leader
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {user.is_leader ? 'Yes' : 'No'}
                      </button>
                    </td>

                    <td>
                      <button
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.is_admin
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {user.is_admin ? 'Yes' : 'No'}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Admin