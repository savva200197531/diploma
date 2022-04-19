import React from 'react'
import Products from './sections/Products/Products'
import Info from './sections/Info/Info'
import Reviews from './sections/Reviews/Reviews'
import { Outlet } from 'react-router-dom'
import './MainPage.scss'
import Footer from '../../layout/Footer/Footer'

// главная страница
const MainPage: React.FC = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default MainPage
