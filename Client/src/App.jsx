import React from 'react'
import "./styles/global.scss"
import Home from './pages/home/Home'
import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";


const App = () => {

  const Layout = () => {
    return(
      <div className='main'>
        <Navbar />
        <div className='container'>
          <div className='menucontainer'>
            <Menu />
          </div>
          <div className='contentcontainer'>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path: "/",
          element: <Home />
        }
      ]
    }
  ]);

  return <RouterProvider router={router}/>
}

export default App