import React, { useContext, useEffect, useState } from 'react'
import "./ProfilePage.scss"
import { StanzaContext } from '../../StanzaContext'
import anonymous from "../../../public/anonymous.jpg"
import PoemCard from '../PoemCard/PoemCard'
import { useNavigate } from 'react-router'

const ProfilePage = () => {
  const [imageUpload, setImageUpload] = useState("")
  const [isImageUpload, setIsImageUpload] = useState(false)
  const {user, uploadPicture, profilePic, userPoemList, getUserPoems, profilePicForPoem} = useContext(StanzaContext)  
  const navigate = useNavigate()

  function handleImageUpload(){
    uploadPicture(imageUpload)
    setIsImageUpload(true)
    if(imageUpload){
        alert('Image Uploaded')
        navigate('/')
    }
    
  }
  
  useEffect(() => {
    getUserPoems()
    setImageUpload("")
    window.scroll({
      top: 0,
      behavior: "instant",
    })
  },[])

  useEffect(() => {
    if(isImageUpload){
        getUserPoems()
        setImageUpload("")
        console.log('in')
        setIsImageUpload(false)
    }
    
  },[isImageUpload])

 
  

  return (
    <div className="profilePage">
        <div className="profileContainer">
            <div className="profileImage">
                <img src={profilePic ? profilePic : anonymous} alt="" />
            </div>
            <p>{user?.email}</p>
            
            <div className="profileUpload">

                <input type="file" id="profile-pic" onChange={(e) =>setImageUpload(e.target.files[0])}/>
                <button onClick={() => handleImageUpload()}>Upload Photo</button>
            </div>
                 
            
        </div>
            <div className="profilePoems">
                <h2>Poems</h2>
                {
                    userPoemList?.map((poem) => (
                        <PoemCard
                            poem={poem}
                            profilePicForPoem={profilePicForPoem}
                            key={poem.id}
                        />
                    ))
                }
            </div>
    </div>
  )
}

export default ProfilePage