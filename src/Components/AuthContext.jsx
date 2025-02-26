import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth, db, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';

const AuthContext = React.createContext();

export function useAuth(){

    return useContext(AuthContext);
}

function AuthWrapper({children}) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
      // check kr rahe ho if you have logged in before
      // kuch bhi change -> yha update ho jaayega 
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setLoading(true);
          if (currentUser) {
              const docRef = doc(db, "users", currentUser?.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                  const {profile_pic, name, email, lastSeen, status } = docSnap.data();
                  // context me jaake save kr dia hai user ka data
                  await setLastSeen(currentUser);

                  setUserData({
                      id: currentUser.uid,
                      profile_pic,
                      email,
                      name,
                      lastSeen,
                      status: status ? status : ""
                  });

              }
          }
          setLoading(false);
      })
      return () => {
        unsubscribe()
      }
  }, [])

  const setLastSeen = async (user) => {
    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "short"
    });

    await updateDoc(doc(db, "users", user.uid), {
      lastSeen: timeStamp,
    });
  }

  const updateName = async (newName) => {
    await updateDoc(doc(db, "users", userData.id), {
      name: newName
    });
    setUserData({
      ...userData,
      name: newName,
  });
  }

  const updateStatus = async (newStatus) => {
    await updateDoc(doc(db, "users", userData.id), {
      status: newStatus
    });
    setUserData({
      ...userData,
      status: newStatus,
    });
  }

  const updatePhoto = async (img) => {
    //kaha aapki image upload hogi
    const storageRef = ref(storage, `profile/${userData.id}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      () => {
        // on state changed
        setIsUploading(true);
        setError(null);

      },
      () => {
        // on Error
        setError("Unable to Upload!");
        setIsUploading(false);
        alert("Unable to Upload!");
      },
      () => {
        // on success
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "users", userData.id), {
            profile_pic: downloadURL,
          });

          setUserData({
            ...userData,
            profile_pic: downloadURL,
          });

          setIsUploading(false);
          setError(null);
        });
      }
    );
  };
  

  return (
    <AuthContext.Provider value={{ setUserData, userData, loading, updateName, updateStatus, updatePhoto, isUploading, error }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper;