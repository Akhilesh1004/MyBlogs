import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete, MdTurnedInNot} from 'react-icons/md'
import Comment from "../components/Comment"
import {useParams} from 'react-router-dom'
import axios from "axios"
import { URL, IF} from "../url"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loader from "../components/Loader"
import {Link, useNavigate} from 'react-router-dom'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';

const PostDetails = () => {
    const post_id = useParams().id
    const [post, setPost] = useState({})
    const {user} = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const handleDeletePost = async()=>{
        try{
            const res = await axios.delete(URL+'/api/posts/'+post_id, {withCredentials:true})
            console.log(res.data)
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    const fetchPosts = async()=>{
        setLoader(true)
        try{
            const res = await axios.get(URL+'/api/posts/'+post_id)
            setPost(res.data)
            setLoader(false)
        }catch(error){
            console.log(error)
            setLoader(true)
        }
    }
    const fetchComments = async()=>{
        //setLoader(true)
        try{
            const res = await axios.get(URL+'/api/comments/post/'+post_id)
            setComments(res.data)
            //setLoader(false)
        }catch(error){
            console.log(error)
            //setLoader(true)
        }
    }
    const postComment = async(e)=>{
        e.preventDefault()
        try{
            console.log(user)
            const res = await axios.post(URL+'/api/comments/create', {comment:comment, author:user.username, post_id:post_id, user_id:user._id}, {withCredentials:true})
            setComment('')
            fetchComments()
            console.log(res.data)
            //setLoader(false)
        }catch(error){
            console.log(error)
            //setLoader(true)
        }
    }
    const handleDeleteComment =async(comment_id)=>{
        try {
            await axios.delete(URL + '/api/comments/' + comment_id, { withCredentials: true })
            fetchComments()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchPosts()
        fetchComments()
    }, [post_id])
    return (
      <div>
        <Navbar />
        {loader?<div className="h-[80vh] flex justify-center items-center"><Loader /></div>:<div className="px-8 md:px-[200px] mt-8 pt-12 min-h-[80vh]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
                {user?._id===post?.user_id && <div className="flex items-center justify-center space-x-2">
                    <p onClick={()=>navigate('/edit/'+post_id)} className="cursor-pointer"><BiEdit /></p>
                    <p onClick={handleDeletePost} className="cursor-pointer"><MdDelete /></p>
                </div>}
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-4">
                <Link key={post._id} to={'/myblog/'+post.user_id}>
                    <p className='hover:text-black'>@{post.username}</p>
                </Link>
                <div className="flex space-x-2">
                    <p>{new Date(post.updatedAt).toDateString()}</p>
                    <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                </div>
            </div>
            {post.photo && (
                        <img src={IF + post.photo} className="w-full mx-auto mt-8" alt="" />
                    )}
            <ReactQuill value={post.desc} readOnly={true} theme={"bubble"} className="mx-auto mt-8 whitespace-pre-wrap" />
            <div className="flex items-center mt-8 space-x-4 font-semibold">
                <p>Categories:</p>
                <div className="flex justify-center items-center space-x-2">
                    {post.categories?.map((category,i)=>(
                        <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{category}</div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                {comments?.map((c)=>(
                    <Comment key={c._id} comment={c} onDelete={handleDeleteComment} />
                ))}         
            </div>
            {user ? <div className="w-full flex flex-col mt-4 md:flex-row">
                <input onChange={(e)=>setComment(e.target.value)} value={comment} className="md:w-[80%] outline-none px-4 mt-4 md:mt-0" type="text" placeholder="Write a comment" />
                <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
            </div> : <div className="w-full flex flex-col mt-4 md:flex-row justify-center items-center">
                <h3 className="text-center text-gray-500 font-semibold">Login to comment</h3>
            </div>}
        </div>}
        <Footer />
      </div>
    )
}
  
export default PostDetails
