import { React, Navigate, useState, useEffect } from 'react'
import { FaReddit } from 'react-icons/fa';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Openedsubgred() {

    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const path = window.location.href.split("/")
    console.log(path[path.length - 3])
    let { id } = useParams()
    const click = (e) => {
        e.preventDefault()
        navigate('./newpost')
    }

    const upvote = async (a) => {

        let data = {
            upvotedBy: localStorage.getItem("loggedin_user"),
            _id: a
        }
        const response = await fetch("http://localhost:5000/posts/upvote",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        
            window.location.reload()
    }

    const downvote = async (a) => {
    
        let data = {
            downvotedBy: localStorage.getItem("loggedin_user"),
            _id: a
        }
        const response = await fetch("http://localhost:5000/posts/downvote",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            window.location.reload()
    }

    useEffect
        (
            () => {
                async function a1() {
                    let data =
                    {
                        postedInGred: id
                    }
                    console.log(data)
                    const response = await fetch("http://localhost:5000/posts/show",
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                    const randomvar = await response.json()
                    console.log(randomvar.posts)
                    setPosts(randomvar.posts)
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
                    {path[path.length - 3] === "subgreddit" ? <><FaReddit color='Red' fontSize={50} /><MDBBtn rounded onClick={click} >+POST</MDBBtn></> : null}
                </div>
                <section className='heading'>
                    <h3>
                        <FaReddit color='Red' fontSize={50} /> {id}  Subgreddit Name
                    </h3>

                </section>
            </header>
            <main className='container'>
                <ul className='posts'>
                    {posts?.map((post1) => {
                        // const {name, description, banned} = subgred1
                        return (
                            <>
                                <li key={post1._id} className='post'>
                                    <ul className='post-data'>
                                        <li>
                                            <strong>Text:</strong>{post1.text}
                                        </li>
                                        <li>
                                            <strong>Uploaded By</strong> {post1.postedBy}
                                        </li>
                                    </ul>
                                </li>
                                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                                    <button className='btn btn-secondary' onClick={() => { upvote(post1._id) }} style={{ marginLeft: "35%" }}>Upvote {post1.upvotes.length}</button>
                                    <button className='btn btn-secondary' onClick={() => { downvote(post1._id) }} >Downvote {post1.downvotes.length}</button>
                                </div>
                            </>
                        )
                    })}
                </ul>
            </main>
        </div>
    </>

}

export default Openedsubgred