import React from 'react'

import './ProfileCard.css'

const ProfileCard = ({count, name, image}) => {
  return (
    <div className='profile-card-container'>
        <div className='card-left-part'>
            <img src={image} alt="profile" />
        </div>
        <div className='card-right-part'>
            <h2>{count}</h2>
            <p>{name}</p>
        </div>
    </div>
  )
}

export default ProfileCard