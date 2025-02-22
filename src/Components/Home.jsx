import React from 'react'
import { storage } from "../../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ChatPanel from './ChatPanel';
import ChatWindow from './ChatWindow';

function Home() {

  // const handleChange = (e) => {
  //   console.log("Change Event");
  //   const img = e.target.files[0];

  //   //address
  //   const storageRef = ref(storage, "/profile"+Math.random());

  //   //storage task
  //   const uploadTask = uploadBytesResumable(storageRef, img);
  //   console.log("upload task");

  //   //developer
  //   uploadTask.on("state_changed", progressCB, errorCB, finishedCB);

  //   //upload
  //   function progressCB(data){
  //     console.log("data", data);
  //   }

  //   //if error
  //   function errorCB(err){
  //     console.log(err);
  //   }

  //   //on success
  //   function finishedCB(){
  //     console.log("successfully file uploaded");
  //     getDownloadURL(uploadTask.snapshot.ref).then(function (url){
  //       console.log("url", url);
  //     })
  //   }
  // }

  return (
    <main className="w-full h-screen bg-[#E3E1DB]">

      {/* <input type="file" accept="image/png image/jpeg image/webp" onChange={handleChange}/> */}

      <div className="bg-background w-full h-full shadow-md flex">
      {/* conditionals rehne wale hai */}

      <ChatPanel></ChatPanel>
      {/* list of users lake aane hai from firebase */}
      {/* <div>Chat Panel</div> */}
      {/* 
      1. chat panel profile button click -> then it should open
      2. currently loggedIn user ka data
      */}

      {/* <div>Profile</div> */}

      {/* <div>Empty Chat</div>
      <div>Individual Chat</div> */}
      <ChatWindow></ChatWindow>
      </div>
    </main>
  )
}

export default Home