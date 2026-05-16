import React, { useState, useEffect } from 'react'
import { supabase } from '../client'
import Sidebar from '../components/Sidebar';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    async function fetchPosts() {
      const { data: { user } } = await supabase.auth.getUser()
 
      const { data: userData } = await supabase
        .from('users')
        .select('area')
        .eq('email', user.email)
        .single()
 
      const { data: postsData } = await supabase
        .from('post')
        .select('*')
        .eq('area', userData.area)
 
      setPosts(postsData)
    }

 
    fetchPosts()
  }, [])

  return (
    <div className="flex flex-row bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex flex-row flex-wrap px-8 py-8 overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} className='w-50 h-60 p-4 m-4 border-2 border-gray-200 rounded-md overflow-auto'>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.name_post}</p>
              <p>{post.area}</p>
            </div>
          ))}

      </div>
    </div>
  )
}

export default Homepage