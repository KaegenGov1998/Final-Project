import React, { useState, useEffect } from 'react'
import { supabase } from '../client'
import Sidebar from '../components/Sidebar';

const Posts = () => {
  const [posts, setPosts] = useState([])
 
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

      <div className="flex flex-col flex-1 px-8 py-8 overflow-y-auto">
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>{post.name_post}</p>
              <p>{post.area}</p>
              <p>{post.created_at}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts