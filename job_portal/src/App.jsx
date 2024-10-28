import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './module_1/Home'
import Login from './module_1/Login'
import Signup from './module_1/Signup'
import Nav from './module_1/Nav'
import Userview from './module_1/Userview'
import Admindashboard from './admin_module/Admindashboard'
import Nav_admin from './admin_module/Nav_admin'
import Manage_job from './admin_module/Manage_job'
import User_dashboard from './user_module/User_dashboard'
import Browse_job from './user_module/Browse_job'
import Updateprofile_user from './user_module/Updateprofile_user'
import View_appiled_job from './user_module/View_appiled_job'
import ViewUser from './admin_module/ViewUser'


function App() {
  const [] = useState(0)

  return (   
    <>
      
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/userview" element={<Userview />}/>
          <Route path="/admindashboard" element={<Admindashboard/>}/>
          <Route path="/managejob" element={<Manage_job/>}/>
          <Route path='/userdashboard' element={<User_dashboard/>}/>
          <Route path='/browsejob'element={<Browse_job/>}/>
          <Route path='/updateprofile'element={<Updateprofile_user/>}/>
          <Route path='/viewapplied'element={<View_appiled_job/>}/>
          <Route path='/viewuser/:id' element={<ViewUser/>}/>
        
        </Routes>
        
        
      
    </>
  )
}

export default App
