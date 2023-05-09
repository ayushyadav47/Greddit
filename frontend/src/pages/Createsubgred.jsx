import React from 'react'
import { FaReddit } from 'react-icons/fa'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function Createsubgred() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tags: [],
        banned: [],
    })

    const email = localStorage.getItem("loggedin_user")

    const { name, description, tags, banned } = formData
    
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

        const subgredData = {
            name: name,
            description: description,
            email: email,
            tags: tags.split(','),
            banned: banned.split(',')
        }
        console.log(subgredData)
        const response = await fetch("http://localhost:5000/subgred",{
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(subgredData)
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
            <p>Create a new SubGreddit!</p>
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
                        id='description'
                        name='description'
                        value={description}
                        placeholder="Enter Description of SubGreddit"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">

                    <input
                        type='text'
                        className='form-control'
                        id='tags'
                        name='tags'
                        value={tags}
                        placeholder="Enter Tags separated by commas"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">

                    <input
                        type='text'
                        className='form-control'
                        id='banned'
                        name='banned'
                        value={banned}
                        placeholder="Enter Banned Keywords separated by commas"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <button disabled={!name || !description} type='submit' className='btn btn-block' onClick={onSubmit}>Submit</button>

                </div>
            </form>
        </section>
    </>
}
export default Createsubgred