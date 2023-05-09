import React from 'react'
import { FaReddit } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function Createpost() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
    })

    const email = localStorage.getItem("loggedin_user")

    const { name } = formData
    
    const { isLoading } = useSelector(
        (state) => state.auth)
        const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let a=window.location.href.split("/")
        const postData = {
            text: name,
            postedBy: email,
            postedIn: a[a.length -2],
        }
        console.log(postData)
        const response = await fetch("http://localhost:5000/posts",{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(postData)
        })
        navigate(-1)
    }
    if (localStorage.getItem("loggedin_user") === null) {

        return (
          <Navigate to="/" replace={true}></Navigate>
        );
      }

    return <>
        <section className='heading'>
            <h1>
                <FaReddit color='Red' fontSize={50}  /> SubGreddits
            </h1>
            <p>Create a new Post!</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">

                    <input
                        type='text'
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder="Enter text in Post"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button disabled={!name} type='submit' className='btn btn-block' onClick={onSubmit}>Submit</button>
                </div>
            </form>
        </section>
    </>
}
export default Createpost