import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ViewPoem.scss"
import { StanzaContext } from '../../StanzaContext'
import { Navigate, useParams } from 'react-router'
import { FaRegEdit } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsTrash } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import CommentCard from '../CommentCard/CommentCard';
import anonymous from "../../../public/anonymous.jpg"



const ViewPoem = () => {

  const [comment, setComment] = useState('')
  let isAnonymous = true
  
  

  

  const { getPoemToUpdate, 
          poemToUpdate, 
          profilePicForPoem,
          user,
          deletePoem,
          addComment,
          getPoemComments,
          commentList,
          addLike,
          removeLike,
          getLike,
          likeList,
           } = useContext(StanzaContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const commentRef = useRef()

  let commentsInPoem = 0
  commentList.map(comment=>{
    if(comment.poemId === poemToUpdate.id){
      commentsInPoem += 1
    }
  })

  useEffect(() => {
    
    window.scroll({
        top: 0,
        behavior: "instant",
      })
    
  },[])
  
  useEffect(()=>{
    getPoemToUpdate(id)
    getPoemComments()
    getLike()
  
    
    
  },[])

    

 
  let answer
  useEffect(() => {
    answer = likeList.some(like => like.poemId === poemToUpdate.id && like.userId == user?.uid)
    setLike(answer)
  },[likeList])

  let likesInPoem = 0
  likeList.map(like=>{
    if(like.poemId === poemToUpdate.id){
      likesInPoem += 1
    }
  })


  const [like, setLike] = useState()
  
  

  function handleBack(){
    navigate(-1)
  }

  function handleDelete(poemId){
    alert('Poem Deleted')
    handleBack()
    deletePoem(poemId)
  }

  function toggleLike(){
      setLike(prev => {
        return !prev
      })  
  }

  function handleComment(){
    commentRef.current.focus()
  }
  
  function handleAddLike(){
    addLike(poemToUpdate.id, user?.uid)

  }

  function handleRemoveLike(){
    removeLike(poemToUpdate.id, user?.uid)
  }

  function handleSubmitComment(){
    if(comment){
      addComment(comment, poemToUpdate.id, user?.uid, user?.email)
      setComment('')
      getPoemComments()
    }
  }


 
  

  

  return (
    <>
    { poemToUpdate &&
    <div className="viewPoem">
      <div className="viewPoemContainer">
          <Link onClick={() => handleBack()}>
              <IoIosArrowRoundBack size={30}/>
          </Link>
          
          <div className="viewPoemTop">
              <h1>{poemToUpdate.data.title}</h1>
              {
                profilePicForPoem.map((url, index) => {
                  if (url.includes(poemToUpdate.data.userId)){
                      isAnonymous= false
                      return <img src={url} alt="" key={index}/>
                  }
                  if(index === profilePicForPoem.length - 1 && isAnonymous){
                    return <img src={anonymous} alt="" key={index}/>
                  }

                })
              }
              
          </div>
          <div className="viewPoemContent">
              {<p>{poemToUpdate.data.content}</p>}
              {/*<pre className="content">{ poemToUpdate.data.content }</pre>*/}
          </div>
          <div className="viewPoemBotton">

          <div className="likeIcon" onClick={toggleLike}>
            {
            like
            ? <IoMdHeart style={{color: "red"}} size={30} 
                    onClick={() => handleRemoveLike()}
                />
            : <IoMdHeartEmpty style={{color:'black'}} size={30}
                    onClick={() => handleAddLike()}
                />
            }
            
            <span>{likesInPoem}</span>
          </div>
          
            {user?.uid === poemToUpdate.data.userId 
              ?
              <>
                <div className="editIcon">
                  <Link to={`update`}>
                    <FaRegEdit size={25}/>
                  </Link>
                </div>

                <div className="deleteIcon" onClick={() => handleDelete(poemToUpdate.id)}>
                  <BsTrash size={23}/>
                </div>
              </>
              :
              ""
            }
            
            <div className="commentIcon"
                onClick={() => handleComment()}
            >
              <FaRegComment size={25}/>
              <span>{commentsInPoem}</span>
            </div>
          </div>

      </div>

      <div className="commentContainer">
          <div className="commentBox">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            ></textarea>
          </div>
          
          <button
            onClick={() => handleSubmitComment()}
          >Comment
          </button>

          <div className="commenListContainer">
          {commentList.map((comment,index) => (
            comment.poemId === poemToUpdate.id 
            && <CommentCard comment={comment} key={index}/> 
            
          )) 
          }
          </div>

      </div>
      
    </div>
    }
    </>
  )
}

export default ViewPoem