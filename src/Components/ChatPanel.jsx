import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { CircleFadingPlusIcon, Loader2Icon, MessageSquare, SearchIcon, UserRoundIcon } from 'lucide-react';
import Profile from './Profile';
import UserCard from './UserCard';
import { useAuth } from './AuthContext';

function ChatPanel() {
    {/* list of users lake aane hai from firebase */}

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const {userData} = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getUsers = async () => {
          //isme collection pass karo and data milta hai
          const snapShot = await getDocs(collection(db, 'users'));
          //console.log(data.docs.length);
          const arrayOfUsers = snapShot.docs.map((docs) => { return {userData: docs.data(), id: docs.id} });

          console.log("21", arrayOfUsers);
          setUsers(arrayOfUsers);
          setLoading(false);
        };

        getUsers();
    }, []);

    const onBack = () => {setShowProfile(false)};

    if(showProfile == true){
      return <Profile onBack={onBack}/>
    }

    let filteredUsers = users;

    if(searchQuery){
      //filter chats based on search query
      filteredUsers = users.filter((user) => 
        user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

  return (
    <div className="bg-white w-[30vw] min-w-[350px]">
      {/* top-bar */}
      <div className="bg-background py-2 px-4 border-r  flex justify-between items-center gap-2">
          <button onClick={() => { setShowProfile(true) }}>
              <img src={userData?.profile_pic || "/default-user.png"} alt="profile picture" className="w-10 h-10 rounded-full object-cover"/>
          </button>

          <div className="flex items-end justify-center gap-6 mx-4">
              <CircleFadingPlusIcon className="w-6 h-6" />
              <MessageSquare className="w-6 h-6" />
              <UserRoundIcon className="w-6 h-6" />
          </div>
      </div>

      {/* chat List */}
      {
        isLoading ? <div className="h-full w-full flex justify-center items-center"><Loader2Icon className="w-10 h-10 animate-spin" /></div> :
        <div className="bg-white py-2 px-3" >
          <div className="bg-background flex items-center gap-4 px-3 py-2 rounded-lg">
            <SearchIcon className="w-4 h-4" />
            <input className="bg-background focus-within:outline-none" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="divide-y py-4 h-full max-h-[calc(100vh-152px)] overflow-y-scroll">
            {filteredUsers.map(userObject => <UserCard userObject={userObject} key={userObject.id} />)}
          </div>
        </div>
      }
    </div>
  );
}

export default ChatPanel