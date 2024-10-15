import React from 'react'
import "./Homepage.scss"
import AddPoem from '../AddPoem/AddPoem'
import PoemOverview from '../PoemOverview/PoemOverview'


const Homepage = () => {
  return (
    <div className="homepage">
        
        <PoemOverview/>
        
    </div>
  )
}

export default Homepage