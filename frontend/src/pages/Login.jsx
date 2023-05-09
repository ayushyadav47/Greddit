import React from 'react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useNavigate,Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login(props) {


    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    if(localStorage.getItem("loggedin_user") !== null)
    {
        return (
            <Navigate to="/profile" replace={true}></Navigate>
          );
    }

    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        const loginData = {
            email: email,
            password: password
        }

        const response = await fetch("http://localhost:5000/login",{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(loginData)
        })

        const tok = await response.json()
        const token = tok.token
        
        if(response.status === 200)
        {
            props.func(1);
            localStorage.setItem("loggedin_user",  email )
            navigate("/profile");          
        }
        else
        {
            toast.error("Invalid Credentials!")
        }
    }

    return <>
        <section className='heading'>
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Login to your Account!</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>

                <div className="form-group">

                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder="Enter your email"
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">

                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        value={password}
                        placeholder="Enter Password"
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button disabled = {!email || !password} type='submit' className='btn btn-block' onClick={onSubmit} >Submit</button>
                </div>
            </form>
        </section>
    </>
}

export default Login
