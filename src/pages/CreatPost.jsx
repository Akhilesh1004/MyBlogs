import { useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {ImCross} from 'react-icons/im'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from "axios";
import { URL } from "../url";
import {Link, useNavigate} from 'react-router-dom'


const CreatePost = () => {
    const [cate, setCate] = useState('')
    const [cates, setCates] = useState([])
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    
    const addCategory =()=>{
        let updatedCates = [...cates]
        updatedCates.push(cate)
        setCate('')
        setCates(updatedCates)
    }
    const deleteCategory =(i)=>{
        let updatedCates=[...cates]
        updatedCates.splice(i, 1)
        setCates(updatedCates)
    }
    const handleCreate =async(e)=>{
        e.preventDefault()
        const post = {
            title,
            desc,
            username:user.username,
            user_id:user._id,
            categories:cates
        }
        if(file){
            const data = new FormData()
            const filename=Date.now()+".jpg"
            data.append("img", filename)
            data.append("file", file)
            post.photo=filename
            try{
                const imgupload = await axios.post(URL+"/api/upload", data)
                //console.log("file upalod:", imgupload.data)
            }catch(error){
                console.log(error)
            }
        }
        try{
            const res = await axios.post(URL+'/api/posts/create', post, {withCredentials:true})
            navigate("/posts/"+res.data._id)
        }catch(error){
            console.log(error)
        }
    }
    return (
      <div>
        <Navbar />
        <div className="px-6 md:px[200px] min-h-[80vh] mt-8 pt-12">
            <h1 className="font-bold md:text-2xl text-xl mt-8">Create a post</h1>
            <form className="w-full flex flex-col space-y-4 md:space-y-8">
                <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter your title" className="px-4 py-2 outline-none" />
                <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="px-4" />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <input value={cate} onChange={(e)=>setCate(e.target.value)} className="px-4 py-2 outline-none" placeholder="Enter post category" type="text" />
                        <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">Add</div>
                    </div>
                    <div className="flex px-4 mt-3">
                        {cates?.map((c, i)=>(
                            <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                                <p className="text-gray-600">{c}</p>
                                <p onClick={()=>deleteCategory(i)} className="text-gray-600 cursor-pointer p-1 text-sm"><ImCross /></p>
                            </div>
                        ))}
                    </div>
                </div>
                <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className="px-4 py-2 outline-none" placeholder="Enter post description" />
                <button onClick={handleCreate} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">Create</button>
            </form>
        </div>
        <Footer />
      </div>
    )
  }
  
  export default CreatePost