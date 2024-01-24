import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { URL } from '../url'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSignup =async()=>{
        setError(false)
        try{
            const res = await axios.post(URL+'/api/user/signup', {username, email, password})
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            navigate("/login")
        }catch(error){
            setError(true)
            console.log(error)
        }
    }

    return (
    <>
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
            <h1 className="text-lg md:text-xl font-extrabold"><Link to='/'>My Blog</Link></h1>
            <div className="flex items-center justify-center space-x-2 md:space-x-4 border-2 border-black rounded-lg  hover:bg-black hover:text-white">
                <h3 className='p-1.5'><Link to='/login'>Login</Link></h3>
            </div>
        </div>
        <div className="w-full flex justify-center items-center h-[80vh]">
          <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
              <h1 className="text-xl font-bold text-left">Create an account</h1>
              <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
              <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="email" placeholder="Enter your email" />
              <div className="flex items-center w-full space-x-4 mt-8 border-2 border-black outline-0">
                    <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-1 border-black outline-0" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
                    <label type="button" onClick={togglePasswordVisibility} className="text-gray-500 transform px-2 cursor-pointer">{showPassword ? <HiEyeOff /> : <HiEye />}</label>
              </div>
              <button onClick={handleSignup} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">Signup</button>
              {error && <h3 className='text-red-500 text-sm'>Something is wrong</h3>}
              <div className="flex justify-center items-center space-x-4">
                  <p>Already have an account?</p>
                  <p className='text-gray-500'><Link to='/login'>Login</Link></p>
              </div>
          </div>
        </div>
    </>
    )
}
  
export default Signup