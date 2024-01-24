import { useContext } from 'react'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import {Link} from 'react-router-dom'

const Comment = ({comment, onDelete}) => {
    const {user} = useContext(UserContext)
    
    return (
        <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
            <div className="flex items-center justify-between">
                <Link to={'/myblog/'+comment.user_id}>
                    <h3 className="font-bold text-gray-600 hover:text-black">@{comment.author}</h3>
                </Link>
                <div className="flex justify-center items-center space-x-4">
                    <div className='flex-row md:flex md:space-x-4'>
                        <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toDateString()}</p>
                        <p className="text-gray-500 text-sm">{new Date(comment.updatedAt).toLocaleTimeString()}</p>
                    </div>
                    {user?._id===comment?.user_id && 
                        <div className="flex items-center justify-center space-x-2">
                            <p onClick={()=>onDelete(comment._id)} className='cursor-pointer'><MdDelete /></p>
                        </div>
                    }
                </div>
            </div>
            <p className="px-4 mt-2">{comment.comment}</p>
        </div>   
    )
}
  
export default Comment