import {Link, useNavigate} from 'react-router-dom'
import { FaSearch, FaBars } from "react-icons/fa";
import { useState } from 'react';
import Menu from './Menu';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {useLocation} from 'react-router-dom'


const Navbar = ({myblog}) => {
    const [menu, setMenu] = useState(false)
    const [prompt, setPrompt] = useState("")
    const navigate = useNavigate()
    const path = useLocation().pathname
    const showMenu =()=>{
      setMenu(!menu)
    }
    const {user} = useContext(UserContext)
    return (
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
          <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
            {myblog ? <h1 className="text-lg md:text-xl font-extrabold"><Link to='/'>{myblog}'s Blog</Link></h1>:
            <h1 className="text-lg md:text-xl font-extrabold min-w-[82px] pr-2"><Link to='/'>My Blogs</Link></h1>}
            {path==='/' && <div className='flex justify-center items-center space-x-0'>
              <p onClick={()=>navigate(prompt ? "?search="+prompt : '/')} className='cursor-pointer'><FaSearch /></p>
              <input onChange={(e)=>setPrompt(e.target.value)} className='outline-none px-2' placeholder='Search a post' type='text' />
            </div>}
            <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
              {user ? <h3><Link to='/write'>Write</Link></h3> : <h3><Link to='/login'>Login</Link></h3>}
              {user ? <div onClick={showMenu}>
                        <p className='cursor-pointer relative'><FaBars /></p>
                        {menu && <Menu />}
                      </div> : <h3><Link to='/signup'>Signup</Link></h3>}
            </div>
            <div onClick={showMenu} className='md:hidden text-lg'>
              <p className='cursor-pointer relative'><FaBars /></p>
              {menu && <Menu />}
            </div>
          </div>
      </div>
    )
  }
  
  export default Navbar
