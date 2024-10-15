import React, { useContext, useEffect, useMemo, useRef } from 'react'
import "./CommentCard.scss"
import anonymous from "../../../public/anonymous.jpg"
import { StanzaContext } from '../../StanzaContext'
import { useNavigate } from 'react-router'

const CommentCard = ({ comment }) => {

  const { user, profilePicForPoem} = useContext(StanzaContext)
  const navigate = useNavigate()
    
    
  useEffect(() => {
      if(!user){
          navigate("/")
      }

  },[user])
    
  return (
    <div className="commentCard">
        
        <div className="commentCardTop">
            <p>{comment.userEmail}</p>
            {profilePicForPoem.map((url,index) => (
                url.includes(comment.userId) 
                && <img src={url} alt="" key={index}/>
                
            ))}
            {/*profilePic.includes(comment.userId) 
            ? <img src={profilePic} alt="" />
            : <img src={anonymous} alt="" />*/}
            
        </div>
        <p>{comment.comment}</p>
    </div>
  )
}

export default CommentCard