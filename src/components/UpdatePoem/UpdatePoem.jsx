import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { StanzaContext } from '../../StanzaContext'
import "./UpdatePoem.scss"

const UpdatePoem = () => {
  
  
  const { getPoemToUpdate, poemToUpdate, updatePoem, login, user } = useContext(StanzaContext)
  const { id } = useParams()
  const navigate = useNavigate()
  

  useEffect(()=>{
    getPoemToUpdate(id)
    
  },[])


  const [updatePoemTitle, setUpdatePoemTitle] = useState(poemToUpdate?.data.title)
  const [updatePoemContent, setUpdatePoemContent] = useState(poemToUpdate?.data.content)
  const date = new Date()

  function handleBack(e){
    e.preventDefault()
    navigate(-1)
  }
  
  function handleSubmit(e){
      e.preventDefault()
      if(user){
        updatePoem(id, updatePoemTitle, updatePoemContent, date)
        navigate("/")
      }else{
        login()
      }
      
  }




 
  

  return (
    <div className="addPoem">
        <div className="addPoemContainer">
            <div className= "addPoemHero">
                <h1>
                    <big>"</big>
                        A poem is never finished, only abandoned.
                    <big>"</big>
                    <br></br>
                </h1>
                <h1>Paul Valery.</h1>

                <p>Update Poem!</p>
            </div>
            
            <form>
                <label htmlFor="poem-title">Title :</label>
                <input 
                    type="text" 
                    id="poem-title"
                    value={updatePoemTitle}
                    onChange={(e)=>setUpdatePoemTitle(e.target.value)}
                />
                <label htmlFor="poem-content">Poem :</label>
                <textarea 
                    id="poem-content"
                    value={updatePoemContent}
                    onChange={(e)=>setUpdatePoemContent(e.target.value)}
                ></textarea>
                <div className="formBtns">
                    <button onClick={(e) => handleSubmit(e)}>Update</button>
                    <button onClick={(e) => handleBack(e)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdatePoem