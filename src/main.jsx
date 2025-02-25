import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import App2 from './App2.jsx';
import AuthWrapper from './Components/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
      <App2></App2>
    </BrowserRouter>
  </AuthWrapper>
)