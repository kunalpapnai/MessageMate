//rfce
import React from 'react'
import { Fingerprint, LogIn as LoginIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// auth - step 3
import { signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

async function createUser(authData){
    const userObject = authData.user;
    const {uid, photoURL, displayName, email} = userObject;
    //console.log("id : ", id, " ", photoURL, " ", name, " ", email);

    await setDoc(doc(db, "users", uid),{
      email,
      profile_pic: photoURL,
      name: displayName
    })
    //console.log("user data is added");
}

function Login() {

  const handleLogin = async () => {
      // login wala logic
      // auth-step-4
      const userData = await signInWithPopup(auth, new GoogleAuthProvider);
      console.log("result", userData);

      await createUser(userData);
  }

  return (
    <>
        <div className='h-[220px] bg-[#04a784]'>
            <div className='flex ml-[200px] pt-10 item-center gap-4'>
              <img src="/chat.png" alt="" className='h-8' />
              <div className='text-white font-bold'>MessageMate</div>
            </div>
        </div>
        <div className='h-[calc(100vh-220px)] bg-[#eff2f5] flex justify-center items-center relative'>
          <div className='h-[80%] w-[50%] bg-white shadow-2xl flex flex-col gap-4 justify-center items-center absolute -top-[93px]'>
              <Fingerprint className='h-20 w-20 text-[#04a784]' strokeWidth={1}/>
              <div>Sign In</div>
              <div>Sign In with your Google account to get started</div>
              <button className='flex gap-2 items-center bg-[#04a784] p-4 text-white rounded-[5px]' onClick={handleLogin}>
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