import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url'

const Menu =()=>{
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const handleLogout=async()=>{
        try{
            await axios.get(URL+'/api/user/logout', {withCredentials:true})
            setUser(null)
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 rounded-md p-4 space-y-4 md:right-32">
            {!user && <h3 className="text-white text-sm hover:text-gray-500"><Link to='/login'>Login</Link></h3>}
            {!user && <h3 className="text-white text-sm hover:text-gray-500"><Link to='/signup'>Signup</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500"><Link to={'/profile/'+user._id}>Profile</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500"><Link to='/write'>Write</Link></h3>}
            {user && <h3 className="text-white text-sm hover:text-gray-500"><Link to={'/myblog/'+user._id}>My Blog</Link></h3>}
            {user && <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500">Logout</h3>}
        </div> 
    )
}

export default Menu