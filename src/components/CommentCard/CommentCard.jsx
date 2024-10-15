import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import "./CommentCard.scss"
import anonymous from "../../../public/anonymous.jpg"
import { StanzaContext } from '../../StanzaContext'
import { useNavigate } from 'react-router'

const CommentCard = ({ comment }) => {
const [hasProfilePic, setHasProfilePic] = useState()
  const [url, setUrl] = useState()
  const { user, profilePicForPoem} = useContext(StanzaContext)
  const navigate = useNavigate()
    

  let value = profilePicForPoem.find((url) => {
    return url.includes(comment.userId)
  })

  

    useEffect(() =>{
        if(value){
            setHasProfilePic(true)
            setUrl(value)
        } else{
            setHasProfilePic(false)
        }
        

    },[value]) 

  useEffect(() => {
      if(!user){
          navigate("/")
      }

  },[user])
    
  return (
    <div className="commentCard">
        
        <div className="commentCardTop">
            <p>{comment.userEmail}</p>
            {
            hasProfilePic 
            ?
            (
            <img src={url} alt=""/>)
            
            :
            (
                <img src={anonymous} alt=""/>
            )
            }
            
        </div>
        <p>{comment.comment}</p>
    </div>
  )
}

export default CommentCard