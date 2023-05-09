import React from 'react'
import { IconContext } from 'react-icons'
import { FaAlignCenter, FaReddit, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import Login from '../pages/Login'
import { useState } from 'react'


function Header(props) {

    // const [isToggeled, setisToggeled] = useState(false);

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>
                    <button type='login' className='btn btn-block' >Greddiit</button>
                </Link>
            </div>
            <ul>
                    <li>
                        <button type='login' className='btn btn-block' onClick={() => props.handleChange} > Login</button>
                    </li>               
                <li>
                    <button type='login' className='btn btn-block' onClick={() => props.handleChange} > Register</button>
                </li>

            </ul>
        </header>
    )
}

export default Header