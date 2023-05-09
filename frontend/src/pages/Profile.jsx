import { React, useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import pic1 from '../profilephoto.jpeg'
import { FaReddit, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, Navigate, Link } from 'react-router-dom';

export default function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    username: "",
  })

  const subgred = (e) => {
    e.preventDefault()
    navigate('/subgreddit')
  }

  const mysubgred = (e) => {
    e.preventDefault()
    navigate('/mysubgreddit')
  }
  
  const navigate = useNavigate();
  const onLogout = () => {
    console.log("logout")
    localStorage.removeItem("loggedin_user")
    navigate("/");
  }
  
  useEffect
  (
    () => {
      async function a1() 
      {
        let data = 
        {
          email: localStorage.getItem("loggedin_user")
        }
        const response = await fetch("http://localhost:5000/me", 
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        // console.log(await response.json())
        setProfile(await response.json())
      }
      a1()
    }, []
  )


  if (localStorage.getItem("loggedin_user") === null) {

    return (
      <Navigate to="/" replace={true}></Navigate>
    );
  }
  const str = profile.name;
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);




  return (
    <div>
      <div className='container'>

        <header className='header'>
          <div className='logo'>
            <FaReddit color='Red' fontSize={50} />
            <button type='greddit' className='btn btn-block' onClick={subgred} >SubGreddiit</button>
          </div>
          <div className='logo'>
            <FaReddit color='Red' fontSize={50} />
            <button type='greddit' className='btn btn-block' onClick={mysubgred} >MySubGreddiit</button>
          </div>
          <ul>
            <li>
              <FaSignOutAlt color='red' fontSize={50} /><button type='login' className='btn btn-block' onClick={onLogout}> LogOut</button>
            </li>
          </ul>
        </header>
      </div>

      <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '300px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <MDBCardImage src={pic1}
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                    <MDBBtn outline color="dark" style={{ height: '50px', overflow: 'visible' }} onClick = {()=> navigate('/editprofile')}>Edit profile</MDBBtn>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h6">Name: {str2}</MDBTypography>
                    <MDBTypography tag="h6">Username: {profile.username}</MDBTypography>
                    <MDBTypography tag="h6">Age: {profile.age}</MDBTypography>
                    {/* <MDBCardText>Username:- {profile.username}</MDBCardText> */}
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div className="px-3">
                      <MDBCardText className="mb-1 h5">1</MDBCardText>
                      <Link to='/followers'>
                        <MDBBtn outline color='link' style={{ height: '10px', overflow: 'visible' }}>Followers</MDBBtn>
                      </Link>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h5">1</MDBCardText>
                      <Link to='/following'>
                        <MDBBtn outline color='link' style={{ height: '10px', overflow: 'visible' }} >Following</MDBBtn>
                      </Link>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">Web Developer(Just want to Pass DASS 😥)</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Lived in Aligarh Once</MDBCardText>
                      <MDBCardText className="font-italic mb-0">Sed Lyf!</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}