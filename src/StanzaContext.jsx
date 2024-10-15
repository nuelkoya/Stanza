import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, provider } from '../src/config/firebase'
import { db,storage } from "../src/config/firebase";
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, query, where, deleteDoc, increment } from "firebase/firestore"
import { deleteObject, getDownloadURL, list, listAll, ref, uploadBytes } from "@firebase/storage";


export const StanzaContext = createContext(null)



export const StanzaProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [profilePic, setProfilePic] = useState('')
    const [profilePicForPoem, setprofilePicForPoem] = useState([])
    const [poemToUpdate, setPoemToUpdate] = useState('')
    const [userPoemList, setUserPoemList] = useState([])
    const [commentList, setCommentList] = useState([])
    const [likeList, setLikeList] = useState([])
    
    const pictureRef = useRef()

   
    
    const poemRef = collection(db, 'poems')
    
    

    

    

    
    useEffect(()=> {
        onAuthStateChanged(auth, (data)=> {
            setUser(data)
        })
        getProfilePicForPoem()
        
    },[])

    useEffect(() => {
        getProfilePic(user?.uid)
        setProfilePic('')
        if(user !== null){
            getUserPoems()
        } 
        getLike()
        
    },[user])
    

    

    
    const login = async () => {
        try{
            await signInWithPopup(auth, provider)
        }
        catch(err){
            console.error(err)
        }
        
    }

    const logout = async () => {
        try{
            await signOut(auth)
            
        }catch(err){
            console.error(err)
        }  
    }
    
    const addPoem = async (poemTitle, poemContent, user, date) => {
        try{
            await addDoc(poemRef,{
                title: poemTitle,
                content: poemContent,
                userId: user?.uid,
                datePublished: date
            })

        } catch(err){
            console.error(err)
        }
    }

    const uploadPicture = async (image) => {
        if(user){
            if(image){
                const profileImageRef = ref(storage, `ProfileImage/${user?.uid}-${image.name}`)
                try{
                    await uploadBytes(profileImageRef, image)
                    getProfilePic()
                } catch(err){
                    console.error(err)
                }
            }
            
        }else{
            login()
        }     
    }

    const getProfilePic = async (id) => {
        const profilePicRef = ref(storage, `ProfileImage/`)
        let profilePicData
        try{
            profilePicData = await list(profilePicRef, {
                orderByChild: 'timeCreated',
                limitToLast: 1 
            })

            let lengthOfData = 0

            profilePicData.items.forEach(() => {
                lengthOfData += 1
            })
            
            profilePicData.items.forEach(async (item, index) => {
                    const url = await getDownloadURL(item)
                    if(url.includes(id)){
                        setProfilePic(url)
                        pictureRef.current = url
                    }
                    
                    
            })
        }catch(err){
            console.error(err)
        }
        
    }


 


    const getProfilePicForPoem = async () => {
        const allProfilePicRef = ref(storage, `ProfileImage/`)
        let allProfilePicData
        try{
            allProfilePicData = await listAll(allProfilePicRef)

            let lengthOfData = 0

            allProfilePicData.items.forEach(() => {
                lengthOfData += 1
            })
            
            const urlArray = []
            
            allProfilePicData.items.forEach(async (item, index) => {
                const url = await getDownloadURL(item)
                urlArray.push(url)
                
            })
            setprofilePicForPoem(
                urlArray
            )
            
        }catch(err){
            console.error(err)
        }
        
    }
    
    const updatePoem = async (id, poemTitle, poemContent, date) => {
        try{
            const updatePoemRef = doc(db, "poems", id)
            await updateDoc(updatePoemRef, {
                    title: poemTitle,
                    content: poemContent,
                    datePublished: date
            })
        }catch(err){
            console.error(err)
        }
        
    }

    const getPoemToUpdate = async (id) => {
        try{
            const poemDoc = doc(db, 'poems', id)
            const docSnap = await getDoc(poemDoc) 
            setPoemToUpdate({
                data: docSnap.data(),
                id: docSnap.id
            })
        }catch(err){
            console.error(err)
        }

    }

    const getUserPoems = async () => {
        if (user){
            try{
                const q = query(collection(db, 'poems'), where("userId", "==", user?.uid))
                const userPoems = await getDocs(q)
                
                const filteredPoems = userPoems.docs.map((doc) => {
                    return{
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setUserPoemList(filteredPoems)
            }catch(err){
                console.error(err)
            }
        }else{
            setUserPoemList([])
        }
    }

    const deletePoem = async(id) => {
        try{
            await deleteDoc(doc(db,"poems", id))
        }catch(err){
            console.error(err)
        }
       
    }

    const getPoemComments = async() => {
        try{
            const commentRef = collection(db, 'comments')
            const commentSnap = await getDocs(commentRef)
            const allComments = commentSnap.docs.map(doc =>{
                return {
                    ...doc.data()
                }
            })
            setCommentList(allComments)
        }catch(err){
            console.error(err)
        }
    }

    const addComment = async (comment, poemId, userId, userEmail ) => {
        try{
            const commentRef = await addDoc(collection(db, 'comments'),{
                comment: comment,
                poemId : poemId,
                userId : userId,
                userEmail: userEmail,
            })

        }catch(err){
            console.error(err)
        }
    }

    const removeLike = async (poemId, userId,) => {
        try{
            const likeDataRef = collection(db, "likes")
            const likeDataSnap = await getDocs(likeDataRef)
            likeDataSnap.docs.map(doc => {
                
                if(doc.data().userId == userId && doc.data().poemId == poemId){
                    deleteLike(doc.id)
                }
                
            })
            getLike()
            

        }catch(err){
            console.error(err)
        }
    }

    
    const addLike = async (poemId, userId) => {
        try{
            const likeRef = await addDoc(collection(db, 'likes'),{
                count: 1,
                poemId : poemId,
                userId : userId,
            })
            getLike()
            

        }catch(err){
            console.error(err)
        }
    }

    const deleteLike = async (id) => {
        try{
            const likeRef = await deleteDoc(doc(db,"likes", id))

        }catch(err){
            console.error(err)
        }
    }


    const getLike = async () => {
        try{
            const likeDataRef = collection(db, "likes")
            const likeDataSnap = await getDocs(likeDataRef)
            const allLikes = likeDataSnap.docs.map(doc =>{
                return{
                    ...doc.data()
                }
            })
            setLikeList(allLikes)

        }catch(err){
            console.error(err)
        }
    }

    


    
   

    
    
    

    


    

    
 
    

    


    

    

    return(
        <StanzaContext.Provider value={{
            user,
            login,
            logout,
            addPoem,
            uploadPicture,
            profilePic,
            getProfilePic,
            profilePicForPoem,
            getProfilePicForPoem,
            getPoemToUpdate,
            poemToUpdate,
            updatePoem,
            userPoemList,
            getUserPoems,
            deletePoem,
            addComment,
            getPoemComments,
            commentList,
            pictureRef,
            addLike,
            removeLike,
            getLike,
            likeList,
        }}>
            {children}
        </StanzaContext.Provider>
    )
}




