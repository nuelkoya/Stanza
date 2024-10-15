import React, { useState, useContext } from 'react'
import "./AddPoem.scss"
import { StanzaContext } from '../../StanzaContext'
import { useNavigate } from 'react-router';

const AddPoem = () => {

    const [poemTitle, setPoemTitle] = useState('')
    const [poemContent, setPoemContent] = useState('')
    const { user, addPoem, login } = useContext(StanzaContext)
    const navigate = useNavigate()
    const date = new Date()
    
    function handleBack(e){
        e.preventDefault()
        navigate(-1)
    }


    const handleSubmit =   async (e) => {
        e.preventDefault()
        if(user){
            if(poemTitle === '' || poemContent === ''){
                alert('Incomplete Poem')
            } else{
                addPoem(poemTitle, poemContent, user, date)
                navigate("/")
            }
            
        } else{
            login()
        }
    }

  return (
    <div className="addPoem">
        <div className="addPoemContainer">
            <div className= "addPoemHero">
                
                <h1>
                    <big>"</big>
                        Poetry is the rhythmical creation of beauty in words.
                    <big>"</big>
                    <br></br>
                </h1>
                <h1>Edgar Allan Poe.</h1>

                <p>Share a poem today!</p>
            </div>
            
            <form>
                <label htmlFor="poem-title">Title :</label>
                <input 
                    type="text" 
                    id="poem-title"
                    value={poemTitle}
                    onChange={(e)=>setPoemTitle(e.target.value)}
                    required
                />
                <label htmlFor="poem-content">Poem :</label>
                <textarea 
                    id="poem-content"
                    value={poemContent}
                    onChange={(e)=>setPoemContent(e.target.value)}
                    required
                ></textarea>
                <div className="formBtns">
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                    <button onClick={(e) => handleBack(e)}>Cancel</button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default AddPoem