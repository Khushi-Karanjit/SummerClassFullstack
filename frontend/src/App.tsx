import { Route, Routes } from 'react-router-dom'
import Login from './features/login/login'
import Home from './features/Home/home'
import Register from './features/register/register'

import UserProfile from './features/profile/UserProfile'

function App() {
  return (
    <>
           {/* renders on every page */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:userId" element={<UserProfile />} />

      </Routes>
    </>
  )
}

export default App