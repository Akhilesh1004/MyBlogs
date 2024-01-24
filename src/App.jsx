
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatPost'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import MyBlog from './pages/MyBlog'
import { UserContextProvider } from './context/UserContext'


const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/posts/:id' element={<PostDetails />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
        <Route exact path='/myblog/:id' element={<MyBlog />} />
        <Route exact path='/profile/:id' element={<Profile />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
