import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import Routing_App from './POC/Protected_Routing/Routing_App.jsx';
import User from './POC/useEffect/User.jsx';
import PropDrilling from './Context/PropDrilling.tsx';
import PropDrillingSol from './Context/PropDrillingSol.tsx';
import Home from './Context/ThemeChanger/Home.jsx';
import ThemeWrapper from './Context/ThemeChanger/ThemeContext.jsx';
import App2 from './App2.jsx';
import AuthWrapper from './Components/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
  <App2></App2>
    {/* <ThemeWrapper>
      <App />
    </ThemeWrapper> */}
    {/* <Routing_App></Routing_App> */}
    {/* <User></User> */}
    {/* <PropDrilling></PropDrilling> */}
    {/* <PropDrillingSol></PropDrillingSol> */}
  </BrowserRouter>
  </AuthWrapper>
)