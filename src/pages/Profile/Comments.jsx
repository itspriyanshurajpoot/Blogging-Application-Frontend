import React, { useEffect, useState } from 'react'
import useUserContext from '../../contexts/UserContext';

import "./css/Comment.css"
import { assets } from '../../assets/assets';

const Comments = () => {

   const {userBlogs } = useUserContext();

    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        // Fetch comments logic here
        let allComments = [];
        userBlogs?.forEach((blog) => {
            allComments = allComments.concat(blog.comments);
        });
        setComments(allComments);
    }

    useEffect(() => {
        fetchComments();
    }, [userBlogs]);

  return (
    <div className='comments-page-container'>
        <h2>Comments</h2>
        <table>
            <thead>
                <tr>
                    <th>Comment ID</th>
                    <th>Content</th>
                    <th>User name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {comments?.map((comment, index) => (
                    <tr key={comment.id}>
                        <td>{index+1}</td>
                        {/* <td>{comment.blogId}</td> */}
                        <td>{comment.content}</td>
                        <td>{comment.user.firstName}</td>
                        <td>
                            <img src={assets.cross_icon} alt="" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Comments