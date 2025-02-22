import Login from "./Components/Login.jsx"
import {Route, Routes} from "react-router-dom";
import Chat from "./Components/ChatWindow.jsx"
import PageNotFound from "./Components/PageNotFound.jsx"
// import Home from "./Components/Home.jsx"
import Home from "././Context/ThemeChanger/Home.jsx"
import './App.css'
import React, { useState } from "react";
import { useDarkTheme } from "./Context/ThemeChanger/ThemeContext.jsx";

function App() {
  const {handleToggleTheme} = useDarkTheme();

  return (
    <>
    <button onClick={handleToggleTheme} style={{border: "1px solid "}}>Toggle Theme</button>

    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      {/* it will only match with /login string */}
      <Route path="/login" element={<Login></Login>}></Route>
      {/* it will match to the route that has chat/sometext */}
      <Route path="/chat/:uniqueId" element={<Chat></Chat>}></Route>
      {/* it will match with everything */}
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
    </>
  )
}

export default App
