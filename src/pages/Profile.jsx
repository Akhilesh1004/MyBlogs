import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios";
import { URL } from "../url";
import { useEffect } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const Profile = () => {
    const {user, setUser} = useContext(UserContext)
    //const params = useParams().id
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [updated, setUpdated] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const fetchProfile = async()=>{
        try{
            if(user && user._id){
                //console.log(user)
                const res = await axios.get(URL+'/api/user/'+user._id, {withCredentials:true})
                setUsername(res.data.username)
                setEmail(res.data.email)
            }
        }catch(error){
            //console.log('check')
            console.log(error)
        }
    }
    const handleUpdate = async()=>{
        setUpdated(false)
        try{
            const payload = {username, email}
            if(password){
                payload.password = password
            }
            console.log(payload)
            const res = await axios.put(URL+'/api/user/'+user._id, payload,{withCredentials:true})
            setUsername(res.data.username)
            setEmail(res.data.email)
            setUser(res.data)
            setUpdated(true)
        }catch(error){
            console.log(error)
            setUpdated(false)
        }
    }
    const handleDelete = async()=>{
        try{
            const res = await axios.delete(URL+'/api/user/'+user._id, {withCredentials:true})
            setUser(null)
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    const fetcgUserPosts = async()=>{
        try{
            if(user && user._id){
                //console.log('user', user)
                const res = await axios.get(URL+'/api/posts/user/'+user._id, {withCredentials:true})
                //console.log(res.data);
                setPosts(res.data);  // Use callback form of setPosts
                //console.log(posts)
            }
        }catch(error){
            //console.log('1234')
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchProfile()
        fetcgUserPosts()
    }, [user])
    return (
      <div>
        <Navbar />
        <div className="px-8 md:px-[200px] min-h-[70vh] mt-8 flex md:flex-row flex-col-reverse md:items-start pt-12">
            <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                <h1 className="text-xl font-bold mb-4">My posts:</h1>
                {posts?.map((p)=>(
                    <Link key={p._id} to={user?`/posts/${p._id}`:'/login'}>
                        <ProfilePosts key={p._id} post={p} />
                    </Link>
                ))}
            </div>
            <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
                <div className="flex flex-col space-y-4 items-start">
                    <h1 className="text-xl font-bold mb-4">Profile</h1>
                <div className="flex items-center space-x-4 mt-8">
                        <input onChange={(e)=>setUsername(e.target.value)} value={username} className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text" />
                    </div>
                    <div className="flex items-center space-x-4 mt-8">
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email" />
                    </div>
                    <div className="flex items-center space-x-4 mt-8">
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Change your password"  type={showPassword ? 'text' : 'password'} />
                        <label type="button" onClick={togglePasswordVisibility} className="text-gray-500 transform  cursor-pointer">{showPassword ? <HiEyeOff /> : <HiEye />}</label>
                    </div>
                    <div className="flex items-center space-x-4 mt-8">
                        <button onClick={handleUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                        <button onClick={handleDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
                    </div>
                    {updated && <h3 className="text-green-500 text-sm text-center mt-4">Updated succesfully</h3>}
                </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  export default Profile