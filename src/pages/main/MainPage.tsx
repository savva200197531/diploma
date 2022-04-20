import React from 'react'
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
