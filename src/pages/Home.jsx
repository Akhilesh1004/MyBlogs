import HomePosts from "../components/HomePosts"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Loader from '../components/Loader'
import { URL } from "../url"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import {useLocation} from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const Home = () => {
    const {search} = useLocation()
    const {user} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [noResult, setNoResult] = useState(false)
    const [loader, setLoader] = useState(false)
    const fetchPosts = async()=>{
        setLoader(true)
        try{
            const res = await axios.get(URL+"/api/posts/"+search)
            setPosts(res.data)
            if(res.data.length===0){
                setNoResult(true)
            }else{
                setNoResult(false)
            }
            setLoader(false)
        }catch(error){
            console.log(error)
            setLoader(true)
        } 
    }
    useEffect(()=>{
        fetchPosts()
    },[search])
    return (
    <>
        <Navbar />
        <div className="px-8 md:px-[200px] min-h-[80vh] pt-16">
            {loader?<div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResult?posts.map((post)=>(
                <HomePosts key={post._id} post={post} />)):
            <h3 className="text-center font-bold mt-16">No post available</h3>}
        </div>
        <Footer />
    </>
    )
  }
  
export default Home