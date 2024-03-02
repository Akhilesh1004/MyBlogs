import {IF} from '../url'
import {Link} from 'react-router-dom'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const HomePosts = ({post}) => {
    return (
      <div className="w-full flex mt-4 pt-4 space-x-4 border-t-2 border-gray-500">
        <div className="flex flex-col w-[65%]">
            <Link key={post._id} to={'/posts/'+post._id} >
                <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                    {post.title}
                </h1>
            </Link>
            <div className="flex-row mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4 md:flex">
                <Link key={post._id} to={'/myblog/'+post.user_id}>
                    <p className='hover:text-black'>@{post.username}</p>
                </Link>
                <div className="md:flex md:space-x-2 text-sm flex-row">
                    <p>{new Date(post.updatedAt).toDateString()}</p>
                    <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                </div>
            </div>
            <p className="text-sm md:text-lg">{post.desc.slice(0, 200)+" ...read more"}</p>
        </div>
        <div className="w-[35%] h-[200px] flex justify-center items-center">
            <img src={IF+post.photo}  alt="" className="h-full w-full object-cover"/>
        </div>
      </div>
    )
  }
  
  export default HomePosts