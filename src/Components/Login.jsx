//rfce
import React from 'react'
import { Fingerprint, LogIn as LoginIcon } from 'lucide-react';
import {useNavigate } from 'react-router-dom';
// auth - step 3
import { signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createUser(authData){
    const userObject = authData.user;
    const {uid, photoURL, displayName, email} = userObject;
    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "short"
    });

    await setDoc(doc(db, "users", uid),{
      email,
      profile_pic: photoURL,
      name: displayName,
      lastSeen: timeStamp,
    })

}

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
      // login wala logic
      // auth-step-4
      const userData = await signInWithPopup(auth, new GoogleAuthProvider);


      await createUser(userData);
      navigate("/");
  }

  return (
    <>
        <div className='h-[220px] bg-primary'>
            <div className='flex ml-[200px] pt-10 item-center gap-4'>
              <img src="/chat.png" alt="" className='h-8' />
              <div className='text-white font-bold'>MessageMate</div>
            </div>
        </div>
        <div className='h-[calc(100vh-220px)] bg-background flex justify-center items-center relative'>
          <div className='h-[80%] w-[50%] bg-white shadow-2xl flex flex-col gap-4 justify-center items-center absolute -top-[93px]'>
              <Fingerprint className='h-20 w-20 text-primary' strokeWidth={1}/>
              <div className='text-2xl font-medium mb-2'>Sign In</div>
              <div className='text-xs font-light text-slate-500 text-center'>Sign In with your Google account <br />to get started</div>
              <button className='flex gap-2 items-center bg-primary p-4 text-white rounded-[5px]' onClick={handleLogin}>
                <div>
                  Sign In with Google
                </div>
                <LoginIcon/>
              </button>
          </div>
        </div>
    </>
  )
}

export default Login;