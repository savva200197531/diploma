import React from 'react'
import { Outlet } from 'react-router-dom'
import './main-page.scss'
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
