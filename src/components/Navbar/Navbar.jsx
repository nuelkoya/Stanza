import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.scss"
import { StanzaContext } from '../../StanzaContext'
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet} from 'react-router'
import { Link, } from 'react-router-dom'

const Navbar = () => {
    const [showDropdown, setShowDropDown] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const { user, login, logout } = useContext(StanzaContext)
    

    useEffect(() =>{
        if(user){
            setUserExist(true)
        } else{
            setUserExist(false)
        }
    },[user])
    

    function closeDropdown(){
        if(showDropdown){
            setShowDropDown(false)
        }
    }
 
    
  
    const handleLogout = (auth) => {
        logout(auth)
        closeDropdown()
    }

    const handleLogin = (auth, provider) => {
        
        login(auth, provider)
        closeDropdown()
    }

    const handleProfileView = () =>{
        if(!userExist){
            login()
            closeDropdown()
        }  else{
            closeDropdown()
        }
    }

    
    
 

    return (
        <div className="navbar">
            <div className="n-container">
                <div className="n-left">
                    <Link to="/" onClick={() => closeDropdown()}>Stanza</Link>
                </div>
                <div className={`n-right ${showDropdown ? 'dropdown' : ''}`}>
                    <Link to="/" onClick={() => closeDropdown()}>Home</Link>
                    <Link to="/add-poem" onClick={() => closeDropdown()}>Create Poem</Link>
                    <Link to ={userExist ? "profile": '/'} onClick={() => handleProfileView()}>Profile</Link>
                    {user == undefined 
                        ? <button onClick={handleLogin}>Sign In</button> 
                        : <button onClick={handleLogout}>Sign Out</button>
                    }
                </div>

                <div className="hamburger" onClick={() => setShowDropDown(prev => !prev)}>
                    <GiHamburgerMenu size={45}/>
                </div>

            </div>
            <Outlet/>
        </div>
    )
}

export default Navbar