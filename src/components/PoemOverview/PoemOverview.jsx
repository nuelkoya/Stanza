import React, { useState, useContext, useEffect, useMemo } from 'react'
import "./PoemOverview.scss"
import { getDocs, collection } from "firebase/firestore"
import { db } from '../../config/firebase'
import { StanzaContext } from '../../StanzaContext'
import PoemCard from '../PoemCard/PoemCard'
import Hero from '../Hero/Hero'


const PoemOverview = () => {

    const poemsRef = collection(db, 'poems')
    const [allPoems, setAllPoems] = useState([])
    const { profilePicForPoem } = useContext(StanzaContext)
    


    const getAllPoems = async () => {
        try{
            const data = await getDocs(poemsRef)
            const poemData = data.docs.map(doc => {
                return{
                    ...doc.data(),
                    id: doc.id
                }
            })
            setAllPoems(poemData)
        }catch(err){
            console.error(err)
        }

    }


    
    useEffect(() => {
        getAllPoems()
        window.scroll({
            top: 0,
            behavior: "instant",
          })
        
    },[])



  
    return (
        
            <>
                <Hero/>
            {
            
                allPoems.map(poem => (
                
                <PoemCard
                    poem={poem}
                    profilePicForPoem={profilePicForPoem}
                    key={poem.id}
                />
                
                ))
            }
            </>

        
    )
}

export default PoemOverview