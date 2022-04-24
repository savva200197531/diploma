import React from 'react'
import { Outlet } from 'react-router-dom'
import './auth.scss'
import logo from '../../assets/images/logo.png'

type Props = {}

const Auth: React.FC<Props> = () => {
  return (
    <div className="auth">
      <img src={logo} alt="logo" className="logo"/>
      <Outlet />
    </div>
  )
}

export default Auth
