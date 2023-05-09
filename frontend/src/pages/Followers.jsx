import React from 'react'
import { Navigate } from 'react-router-dom';

function followers(props) {

  // const navigate = useNavigate();
  if (localStorage.getItem("loggedin_user") === null) {
    console.log("hello");
    return (
      <Navigate to="/" replace={true}></Navigate>
    );
  }

  return (
    <div className='container' >1 Follower: - @gbroad</div>
  )
}

export default followers