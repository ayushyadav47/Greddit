import { React, useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { FaReddit } from 'react-icons/fa'
import { MDBBtn } from 'mdb-react-ui-kit'

function Mysubgred() {

    const navigate = useNavigate()
    const [allSubgred, setAllSubgred] = useState([])



    const click = (e) => {
        e.preventDefault()
        navigate('./create')
    }
    const OpenGred=(a)=>{
        navigate("./opened/"+a)
    }

    useEffect
        (
            () => {
                async function a1() {
                    let data =
                    {
                        user: localStorage.getItem("loggedin_user")
                    }
                    console.log(data)
                    const response = await fetch("http://localhost:5000/subgred/showMysubgred",
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                    const randomvar = await response.json()
                    console.log(randomvar.subgred)
                    setAllSubgred(randomvar.subgred)
                }
                a1()
            }, []
        )


    if (localStorage.getItem("loggedin_user") === null) {
        return (
            <Navigate to="/" replace={true}></Navigate>
        );
    }
    return <>
        <div>
            <header className='header'>
                <div className='logo'>
                    <FaReddit color='Red' fontSize={50} /><MDBBtn rounded onClick={click} >Create</MDBBtn>
                </div>
                <section className='heading'>
                    <h1>
                        <FaReddit color='Red' fontSize={50} /> SubGreddits
                    </h1>
                    <p>My SubGreddits page!!</p>
                </section>
            </header>
            <main className='container'>
                <ul className='subgreds'>
                    {allSubgred.map((mysubgred1) => {
                        // const {name, description, banned} = subgred1
                        return (
                            <>
                            <li key={mysubgred1._id} className='mysubgred'>
                                <ul className='subgred-data'>
                                    <li>
                                        <strong>Name:</strong>{mysubgred1.name}
                                    </li>
                                    <li>
                                        <strong>Description</strong> {mysubgred1.description}
                                    </li>
                                    <li>
                                        <strong>Banned Keywords:</strong> {mysubgred1.banned}
                                    </li>
                                </ul>
                            </li>
                            <button className='btn btn-secondary' onClick={()=>{OpenGred(mysubgred1.name)}} style={{marginLeft:"46%"}}>Open</button>
                            </>
                        )
                    })}
                </ul>
            </main>
        </div>
    </>

}

export default Mysubgred