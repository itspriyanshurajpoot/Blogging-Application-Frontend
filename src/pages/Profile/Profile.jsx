import React from 'react'

import "./css/Profile.css"
import ProfileNavbar from './ProfileNavbar'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate, useParams } from 'react-router'


const Profile = () => {

    const navigate = useNavigate();
    const {userId} = useParams()

  return (
    <div className='profile-page-container'>
        <div className='profile-navbar'>
            <ProfileNavbar />
        </div>
        <div className='profile-body'>
            <div className='profile-body-left-part'>
                <div className='profile-body-left-each-part' onClick={() => navigate("")}>
                    <img src={assets.home_icon} alt="" />
                    <p>Dashboard</p>
                </div>
                <div className='profile-body-left-each-part' onClick={() => navigate(`/profile/${userId}/add-blog`)}>
                    <img src={assets.add_icon} alt="" />
                    <p>Add Blog</p>
                </div>
                <div className='profile-body-left-each-part' onClick={() => navigate(`/profile/${userId}/blogs`)}>
                    <img src={assets.blog_icon} alt="" />
                    <p>Blogs</p>
                </div>
                <div className='profile-body-left-each-part' onClick={() => navigate(`/profile/${userId}/comments`)}>
                    <img src={assets.comment_icon} alt="" />
                    <p>Comments</p>
                </div>
            </div>
            <div className='profile-body-right-part'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Profile