import React from 'react'
import { Navigate } from 'react-router-dom';

function following() {

  if (localStorage.getItem("loggedin_user") === null) {
    console.log("hello");
    return (
      <Navigate to="/" replace={true}></Navigate>
    );
  }

  return (
    <div>1 Following: - @gbroad</div>
  )
}

export default following