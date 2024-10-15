import { useState } from 'react'
import './App.css'
import AddPoem from './components/AddPoem/AddPoem'
import Navbar from './components/Navbar/Navbar'
import PoemOverview from './components/PoemOverview/PoemOverview'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Homepage from './components/Homepage/Homepage'
import UpdatePoem from './components/UpdatePoem/UpdatePoem'
import ProfilePage from './components/Profile/ProfilePage'
import ViewPoem from './components/ViewPoem/ViewPoem.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar/>,
      children: [
        {
          path: "/",
          element: <Homepage/>
        },
        {
          path:"add-poem",
          element: <AddPoem/>
        },
        {
          path:":id/view/update",
          element:<UpdatePoem/>
        },
        {
          path:":id/view",
          element:<ViewPoem/>
        },
        {
          path:"profile",
          element:<ProfilePage/>
        },
        {
          path:"profile/:id/view",
          element:<ViewPoem/>
        },
        {
          path:"profile/:id/view/update",
          element:<UpdatePoem/>
        },

        
      ]
    }
  ])

  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
    
  )
}

export default App
