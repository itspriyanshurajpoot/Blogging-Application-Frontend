import React from 'react'
import { assets } from './assets/assets'
import { Route, Routes } from 'react-router'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import ProfileDashboard from './pages/Profile/ProfileDashboard'
import AddBlog from './pages/Profile/AddBlog'
import 'quill/dist/quill.snow.css'
import BlogPage from './pages/BlogPage/BlogPage'
import Blogs from './pages/Profile/Blogs'
import Comments from './pages/Profile/Comments'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'


const App = () => {
  return (
    <div style={{backgroundImage: `url(${assets.gradientBackground})`, backgroundSize: 'cover'}}>
      
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}/>
        <Route path='/blog/:blogId' element={<PublicRoute><BlogPage /></PublicRoute>} />
        <Route path='/profile/:userId' element={<PrivateRoute><Profile /></PrivateRoute>}>
          <Route path='' element={<PrivateRoute><ProfileDashboard /></PrivateRoute>} />
          <Route path='add-blog' element={<PrivateRoute><AddBlog /></PrivateRoute>} />
          <Route path='blogs' element={<PrivateRoute><Blogs /></PrivateRoute>} />
          <Route path='comments' element={<PrivateRoute><Comments /></PrivateRoute>} />
        </Route>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Routes>
    </div>
  )
}

export default App