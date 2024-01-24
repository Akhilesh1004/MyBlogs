import { IF } from "../url"

const ProfilePosts = ({post}) => {
    return (
        <div className="w-full flex mt-8 space-x-4">
          <div className="w-[35%] h-[200px] flex justify-center items-center">
              <img src={IF+post.photo}  alt="my photo" className="h-full w-full object-cover"/>
          </div>
          <div className="flex flex-col w-[65%]">
              <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
                  {post.title}
              </h1>
              <div className="flex-row mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4 md:flex">
                  <p>@{post.username}</p>
                  <div className="md:flex md:space-x-2 text-sm flex-row">
                    <p>{new Date(post.updatedAt).toDateString()}</p>
                    <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                  </div>
              </div>
              <p className="text-sm md:text-lg">{post.desc.slice(0, 200)+" ...read more"}</p>
          </div>
        </div>
      )
}
  
  export default ProfilePosts
  