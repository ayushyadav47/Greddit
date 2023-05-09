import { React, useState, useEffect } from 'react'
import { FaReddit, FaSearch } from 'react-icons/fa'
import { useNavigate, Navigate } from 'react-router-dom'
import { MDBBtn } from 'mdb-react-ui-kit'
import Fuse from 'fuse.js'

function Subgreddits() {

    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [allSubgred, setAllSubgred] = useState([])

    const OpenGred=(a)=>{
        navigate("./opened/"+a)
    }


    const fuse = new Fuse(allSubgred, {
        keys: [
            'name',
        ],
        includeScore: true
    })

    const results = fuse.search(searchQuery)
    const subgredResults = searchQuery ? results.map(result => result.item) : allSubgred



    useEffect
        (
            () => {
                async function a1() {
                    const response = await fetch("http://localhost:5000/subgred/showall",
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            //   body: JSON.stringify(data)
                        })
                    const randomvar = await response.json()
                    // console.log(randomvar.subgred)
                    setAllSubgred(randomvar.subgred)
                    console.log(allSubgred)
                }
                a1()
            }, []
        )

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    if (localStorage.getItem("loggedin_user") === null) {
        return (
            <Navigate to="/" replace={true}></Navigate>
        );
    }



    return <>
        <div>
            <header className='header'>
                <div className='logo'>
                    <FaReddit color='Red' fontSize={50} /><MDBBtn rounded>Greddit</MDBBtn>
                </div>
                <section className='heading'>
                    <h1>
                        <FaReddit color='Red' fontSize={50} /> SubGreddits
                    </h1>
                    <p>SubGreddits page!!</p>
                </section>
            </header>

            <div className='logo'>
                <FaSearch /><input type="text" placeholder='Search...' value={searchQuery} onChange={handleInputChange} />
            </div>

            <main className='container'>
                <ul className='subgreds'>
                    {subgredResults.map((subgred1) => {
                        // const {name, description, banned} = subgred1
                        return (
                            <>
                                <li key={subgred1._id} className='subgred'>
                                    <ul className='subgred-data'>
                                        <li>
                                            <strong>Name:</strong>{subgred1.name}
                                        </li>
                                        <li>
                                            <strong>Description</strong> {subgred1.description}
                                        </li>
                                        <li>
                                            <strong>Banned Keywords:</strong> {subgred1.banned}
                                        </li>
                                    </ul>
                                </li>
                                <button className='btn btn-secondary' onClick={()=>{OpenGred(subgred1.name)}} style={{marginLeft:"46%"}}>Open</button>
                            </>
                        )
                    })}
                </ul>
            </main>
        </div>
    </>

}

export default Subgreddits