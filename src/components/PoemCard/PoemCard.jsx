import React, { useContext, useEffect, useState } from 'react'
import "./PoemCard.scss"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StanzaContext } from '../../StanzaContext'
import anonymous from "../../../public/anonymous.jpg"

const PoemCard = ({ poem, profilePicForPoem }) => {
    const { user, login } = useContext(StanzaContext)
    const [hasProfilePic, setHasProfilePic] = useState()
    const [url, setUrl] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    let value = profilePicForPoem.find((url) => {
        return url.includes(poem.userId)
    })

    
    useEffect(() =>{
        if(value){
            setHasProfilePic(true)
            setUrl(value)
        } else{
            setHasProfilePic(false)
        }
        

    },[value])
    
    

    function navigateToProfile(){
        if(location.pathname === "/"){
            navigate('profile')
        }
    }
    
    
    function updatePoem(id){
        if(user === null){
            login()
        }else{
            navigate(`${id}/view`)
        }
    }

  return (
    <div className="poemOverview" key={poem.id}>
        <div className="poemContainer">
        
            <div className="poemContainerTop">
                <Link onClick={() => updatePoem(poem.id)}>
                    <h1>{poem.title}</h1>
                </Link>
                
                
                <div className="poemImageContainer">
                    

                    {
                        hasProfilePic 
                        ?
                        (<Link  onClick={() => navigateToProfile()}>
                                        <img src={url} alt=""/>
                                    </Link>)
                        :
                        (<Link  onClick={() => navigateToProfile()}>
                                        <img src={anonymous} alt=""/>
                        </Link>)
                    }

                </div>
            </div>
            <p>
                {`${poem.content.slice(0,200)}... `}
                <Link onClick={() => updatePoem(poem.id)} className="continue">Continue Reading</Link>
            </p>
           
        
        </div>
        
    </div> 
  )
}

export default PoemCard