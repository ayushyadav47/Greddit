import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Followers from './pages/Followers'
import Following from './pages/following'
import Edit from './pages/Editprofile'
import Subgreddits from './pages/Subgreddits'
import Createsubgred from './pages/Createsubgred'
import Mysubgred from './pages/Mysubgred'
import { FaReddit, FaSignInAlt, FaUser } from 'react-icons/fa'
import Openedsubgred from './pages/Openedsubgred'
import Createpost from './pages/Createpost'


function App() {

  let [change, setChange] = useState(1)

  const logChange = () => {
    return setChange(1)
  }

  const regChange = () => {
    return setChange(2)
  }

  
  const [isLoggedin, setLoggedin] = useState(null)


  return (
    <>
        <div className='container'>
          <Routes>
            <Route path='/followers' element={<Followers />} />
            <Route path='/following' element={<Following />} />
            <Route path='/editprofile' element={<Edit />} />

            <Route path='/subgreddit' element={<Subgreddits />} />
            <Route path='/subgreddit/opened' element={<Openedsubgred />} />
            <Route path='/subgreddit/opened/:id' element={<Openedsubgred />} />

            <Route path='/mysubgreddit/create' element={<Createsubgred />} />
            <Route path='/mysubgreddit' element={<Mysubgred />} />
            <Route path='/subgreddit/opened/:id' element={<Openedsubgred />} />
            <Route path='/subgreddit/opened/:id/newpost' element={<Createpost />} />
            <Route path='/' element={
              <div>
                <header className='header'>
                  <div className='logo'>
                    <Link to='/'>
                      <FaReddit color='Red' fontSize={50} /><button type='login' className='btn btn-block'>Greddiit</button>
                    </Link>
                  </div>
                  <ul>
                    <li>
                      <FaSignInAlt color='Red' fontSize={50} /><button type='login' className='btn btn-block' onClick={() => logChange()} > Login</button>
                    </li>
                    <li>
                      <FaUser color='Red' fontSize={50} /><button type='login' className='btn btn-block' onClick={() => regChange()} > Register</button>
                    </li>
                  </ul>
                </header>

                {change === 1 ? <Login func={setLoggedin} flag={isLoggedin} /> : <Register />}

              </div>}>
            </Route>
            <Route  path='/profile' element={<Profile flag={isLoggedin} func={setLoggedin} />} />
            
          </Routes>


        </div>
      <ToastContainer />
    </>
  );
}


export default App;
