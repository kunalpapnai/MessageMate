import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import {useParams} from 'react-router-dom'
import { db, storage } from '../../firebase';
import { useAuth } from './AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function ChatWindow() {
    const params = useParams();
    const [msg, setMsg] = useState("");
    const [secondUser, setSecondUser] = useState();
    const [msgList, setMsgList] = useState([]);
    const fileInputRef = useRef(null);
    const {userData} = useAuth(); 

    const receiverId = params?.chatid;

    /**
       This is done to generate a unique chat id between two user based on user id
    * */ 
   const chatId = userData?.id > receiverId ? `${userData.id}-${receiverId}` : `${receiverId}-${userData.id}`;

    const handleSendMsg = async () => {
      if(msg){
        // date
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        // start chat with user
        if(msgList?.length === 0){

          await setDoc(doc(db, "user-chats", chatId), {
            chatId: chatId,
            messages: [
              {
                text: msg,
                time: timeStamp,
                sender: userData.id,
                receiver: receiverId,
              },
            ],
          });
        } else{
          // update in the message list
          await updateDoc(doc(db, "user-chats", chatId), {
            chatId: chatId,
            // arrayUnion is used here to last message to the array list
            messages: arrayUnion({
              text: msg,
              time: timeStamp,
              sender: userData.id,
              receiver: receiverId,
            }),
          });
        }

        setMsg("");
      }
    }

    useEffect(() => {
      // request , data fetch
      const getUser = async () => {
        const docRef = doc(db, "users", receiverId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
          setSecondUser(docSnap.data());
        }
      }

      getUser();

      // message list
      const msgUnsubscribe = onSnapshot(doc(db, "user-chats", chatId), (doc) => {
        setMsgList(doc.data()?.messages || []);
      });

      return () => {
        msgUnsubscribe();
      }

    }, [receiverId]);

    const handleFile = (file) => {
      if (!file){
        return;
      }

      //kaha aapki image upload hogi
      const storageRef = ref(storage, `file/${chatId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {
          console.log("upload started"); 
        },
        (err) => {
          // on Error
          console.log("Upload failed : ", err);
          alert("Unable to Upload!");
        },
        async () => {
          // on success
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const date = new Date();
          const timeStamp = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });


          if(msgList?.length === 0){

            await setDoc(doc(db, "user-chats", chatId), {
              chatId: chatId,
              messages: [
                {
                  fileURL: downloadURL,
                  fileName: file.name,
                  time: timeStamp,
                  sender: userData.id,
                  receiver: receiverId,
                },
              ],
            });
          } else{
            // update in the message list
            await updateDoc(doc(db, "user-chats", chatId), {
              chatId: chatId,
              // arrayUnion is used here to last message to the array list
              messages: arrayUnion({
                fileURL: downloadURL,
                fileName: file.name,
                time: timeStamp,
                sender: userData.id,
                receiver: receiverId,
              }),
            });
          }
        }
      );
    }

    // empty screen
    if(!receiverId){
      return(
        <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
          <MessageSquareText className="w-28 h-28 text-gray-400" strokeWidth={1.2} />
          <p className="text-sm text-center text-gray-400">
            select any contact to
            <br />
            start a chat with
          </p>
        </section>
      )
    }

    //chat screen code
    return <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
      <div className='h-full w-full bg-chat-bg flex flex-col'>

        {/* topbar */}
        <div className="bg-background py-2 px-4 flex items-center gap-2 shadow-sm">
          <img src={secondUser?.profile_pic || "/default-user.png"} 
          alt="profile picture" 
          className="w-9 h-9 rounded-full object-cover" />
          <div>
            <h3>{secondUser?.name}</h3>
            {secondUser?.lastSeen && (
              <p className="text-xs text-neutral-400">
                last seen at {secondUser?.lastSeen}
              </p>
            )}
          </div>
          
        </div>

        {/* message list */}
        <div className="flex-grow flex flex-col gap-12 p-6  overflow-y-scroll ">
          {msgList?.map((m, index) => (
            <div
              key={index}
              data-sender={m.sender === userData.id}
              // break-words is the edge case where a single word is quite long, so we need to break that word before it breaks our ui.
              className={`bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light `}
            >
              {m?.fileURL ? (
              <div className="min-w-[300px]">
                {/* Display Image */}
                {m.fileName.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                  <a
                  href={m.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={m.fileURL}
                    alt="Uploaded file"
                    className="max-w-xs rounded-md shadow-md"
                  />
                  </a>
                  
                ) : m.fileName.match(/\.(mp4|webm|ogg)$/i) ? (
                  // Display Video
                  <video
                    controls
                    className="max-w-xs rounded-md shadow-md"
                  >
                    <source src={m.fileURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : m.fileName.match(/\.(mp3|wav|ogg)$/i) ? (
                  // Display Audio
                  <audio controls className="w-full">
                    <source src={m.fileURL} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  // Default for other file types
                  <a
                    href={m.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {m.fileName || "Download File"}
                  </a>
                )}
              </div>
            ) : (
              <p>{m?.text}</p>
            )}
              <p className="text-xs text-neutral-500  text-end">
                {m?.time}
              </p>
            </div>
          ))}
        </div>

        {/* chat input */}
        <div className="bg-background py-3 px-6 shadow flex items-center gap-6">
          <button onClick={() => {fileInputRef.current.click()}}>
            <PlusIcon />
            <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => { console.log(e);handleFile(e.target.files?.[0])}} />
          </button>
          <input type="text" className="w-full py-2 px-4 rounded focus:outline-none" 
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value)
          }}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              handleSendMsg();
            }
          }} />

          <button onClick={handleSendMsg}>
            <SendIcon />
          </button>
        </div>
      </div>
    </section>
}

export default ChatWindow