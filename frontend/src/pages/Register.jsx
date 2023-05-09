import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


function Register() {


    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        age: '',
        password: '',
        ConfirmPassword: '',

    })

    const { name, username, email, age, password, ConfirmPassword } = formData
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
        

        if (password !== ConfirmPassword) {
            toast.error("Passwords do not match!");
        }
        if (age < 18 || age > 100) {
            toast.error("Please Enter a valid Age!")
        }
        else {
            const userData = {
                name: name,
                username: username,
                email: email,
                age: age,
                password: password,
            }
            console.log(userData)
    //    dispatch(register(userData))
        const response = await fetch("http://localhost:5000/",{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userData)
        })
        window.location.reload()
       
    }
    <Link to ='/'></Link>
    }

    if (isLoading) {
        return <Spinner />
    }

    return <>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Create an Account!</p>
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
                        placeholder="Enter your Name"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">

                    <input
                        type='text'
                        className='form-control'
                        id='username'
                        name='username'
                        value={username}
                        placeholder="Enter a username"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">

                    <input
                        type='email'
                        className='form-control'
                        id='email'
                        name='email'
                        value={email}
                        placeholder="Enter your E-Mail"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">

                    <input
                        type='number'
                        className='form-control'
                        id='age'
                        name='age'
                        value={age}
                        placeholder="Enter your Age"
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

                    <input
                        type='password'
                        className='form-control'
                        id='ConfirmPassword'
                        name='ConfirmPassword'
                        value={ConfirmPassword}
                        placeholder="Confirm Password"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                        <button disabled={!email || !name || !age || !password || !ConfirmPassword || !username} type='submit' className='btn btn-block' onClick={onSubmit}>Submit</button>
                    
                </div>
            </form>
        </section>
    </>
}

export default Register
