import React, {useState, useEffect} from 'react';
import { SignUp, Login, Homepage, Admin, NotAdminPage, Post, NotLeader } from './pages';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './client';
import './index.css';

const App = () => {

  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }

  }, [])

  const [postId, setPostId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLeader, setIsLeader] = useState(false);

useEffect(() => {
  const checkAdmin = async () => {
    const { data, error } = await supabase
      .from('users')       // or whatever your users table is
      .select('is_admin, is_leader')
      .eq('id', token.user.id)  // match the logged-in user
      .single();

    if (error) console.error(error);
    if (data) {
      setIsAdmin(data.is_admin);
      setIsLeader(data.is_leader);
     } // now isAdmin is actually set
  };

  if (token) checkAdmin();  // only run when a user is logged in
}, [token]);  // re-run if token changes

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Login setToken={setToken}/>} />
        <Route path={'/signup'} element={<SignUp />} />
        {isAdmin?<Route path={'/admin'} element={<Admin token={token} />}/>:<Route path={'/admin'} element={<NotAdminPage/>}/> }
        {isLeader?<Route path={'/post'} element={<Post token={token} />}/>:<Route path={'/post'} element={<NotLeader/>}/> }
        {token?<Route path={'/homepage'} element={<Homepage token={token}/>} />:""}
      </Routes>
    </div>
  )
}

export default App