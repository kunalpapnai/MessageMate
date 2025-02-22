import React, { useState } from 'react'
import Home from './Home';
import Login from './Login';
import Chat from './Chat';
import ProtectedRoute from './ProtectedRoute';
import { Route, Routes } from 'react-router-dom';

function Routing_App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
        <h1>Routing_App</h1>
        <Routes>
      <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
        <Home setIsLoggedIn={setIsLoggedIn}></Home>
      </ProtectedRoute>}></Route>
      <Route path="/chat/:uniqueId" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
        <Chat></Chat>
      </ProtectedRoute>}></Route>
      <Route path="/login" element={
        <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}></Login>}></Route>
    </Routes>
    </>
  )
}

export default Routing_App;