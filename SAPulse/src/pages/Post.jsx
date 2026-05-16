import React, { useState, useEffect } from 'react'
import { supabase } from '../client'

const Post = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    async function fetchUserData() {
      const { data: { user } } = await supabase.auth.getUser()

      const { data } = await supabase
        .from('users')
        .select('full_name, area')
        .eq('email', user.email)
        .single()

      setUserData(data)
    }

    fetchUserData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await supabase.from('post').insert([
      {
        title: title.trim(),
        content: content.trim(),
        area: userData.area,
        name_post: userData.full_name,
      },
    ])

    setTitle('')
    setContent('')
  }

  return (
    <div>
      <h2>Create a Post</h2>
      <p><strong>Posting as:</strong> {userData?.full_name}</p>
      <p><strong>Area:</strong> {userData?.area}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            rows={6}
            required
          />
        </div>

        <br />

        <button type="submit">Submit Post</button>
      </form>
    </div>
  )
}

export default Post