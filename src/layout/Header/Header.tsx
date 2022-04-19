import React, { useEffect, useState } from 'react'
import './Header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useAuth } from '../../contexts/authContext/AuthContext'
import logo from '../../assets/images/logo.png'
import CartButton from './CartButton'
import UserButton from './UserButton'

type PageType = 'signup' | 'login' | 'other'

// шапка сайта
const Header: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { loading, user } = useAuth()

  const [pageType, setPageType] = useState<PageType>()

  // проверяю тип страницы
  const checkPageType = () => {
    if (pathname.includes('signup')) {
      return 'signup'
    } else if (pathname.includes('login')) {
      return 'login'
    } else {
      return 'other'
    }
  }

  useEffect(() => {
    setPageType(checkPageType())
  }, [pathname])

  // не даю пользователя перейти пользователю на главную страницу, если он не не вошел в аккаунт
  // и не даю перейти на страницу аунтефикации, если он уже вошел на сайт
  useEffect(() => {
    if (loading) return
    if (!user.uid && (pageType !== 'signup' && pageType !== 'login')) {
      navigate('/auth/login')
    }
    if (user.uid && (pageType === 'signup' || pageType === 'login')) {
      navigate('/')
    }
  }, [pageType, loading, user])

  useEffect(() => {
    if (loading) return
    if (pathname.includes('admin') && !user.admin) {
      navigate(-1)
    }
  }, [loading, pathname])


  // верстка
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {pageType === 'login' && <Button className="auth-button" variant="outlined" color="inherit" onClick={() => navigate('/auth/signup')}>
            Зарегистрироваться
          </Button>}

          {pageType === 'signup' && <Button className="auth-button" variant="outlined" color="inherit" onClick={() => navigate('/auth/login')}>
            Войти
          </Button>}

          {pageType === 'other' && (
            <>
              <Button color="inherit" onClick={() => navigate('/')}>
                <img src={logo} alt="logo" className="logo"/>
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/certificates')}>
                Сертификаты
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/contacts')}>
                Контакты
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => navigate('/about')}>
                О нас
              </Button>
              <UserButton />
              <CartButton />
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
