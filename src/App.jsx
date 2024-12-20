import { createContext, useState } from 'react'
import Profile from './pages/profile/Profile'
import Navigation from '../src/pages/parts/Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './pages/create/Create'
import Login from './pages/auth/Login'
import useCurrentUser from './hooks/users/useCurrentUser'
import { useEffect } from 'react'
import Index from './pages/index/Index'
import Register from './pages/auth/Register'
import Search from './pages/search/Search'
import Chat from './Chat'

export const CurrentUserContext = createContext()

function App() {
  const { currentUser, getCurrentUser } = useCurrentUser()

  useEffect(() => {
    getCurrentUser()
  }, [])
  return (
    <>
      <div className="cover">
        <BrowserRouter>
          <CurrentUserContext.Provider value={{ currentUser }}>
            <Navigation />
            <Routes>
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/new' element={<Create />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register/>}/>
              <Route path='/index' element={<Index />} />
              <Route path='/search' element={<Search/>}/>
              <Route path='/chat' element={<Chat/>}/>
            </Routes>
          </CurrentUserContext.Provider>  
        </BrowserRouter>
      </div >
    </>
  )
}

export default App
