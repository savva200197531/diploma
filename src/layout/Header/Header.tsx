import React, { useEffect, useState } from 'react'
import './header.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, IconButton, Popover, useMediaQuery } from '@mui/material'
import { useAuth } from '../../contexts/authContext/AuthContext'
import logo from '../../assets/images/logo.png'
import logoCut from '../../assets/images/logo-cut.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import UserButton from './components/UserButton'
import CartButton from './components/CartButton'

type PageType = 'signup' | 'login' | 'other'

// шапка сайта
const Header: React.FC = () => {
  const [pageType, setPageType] = useState<PageType>()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const isTablet = useMediaQuery('(max-width:780px)')
  const isMobile = useMediaQuery('(max-width:430px)')

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { loading, user } = useAuth()

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

  const buttons = (color: 'inherit' | 'primary', variant: 'outlined' | 'text') => {
    const buttonsData = [
      {
        text: 'Сертификаты',
        to: '/certificates',
      },
      {
        text: 'Контакты',
        to: '/contacts',
      },
      {
        text: 'О нас',
        to: '/about',
      },
    ]

    return buttonsData.map((button, index) => (
      <Button key={index} variant={variant} color={color} onClick={() => navigate(button.to)}>{button.text}</Button>
    ))
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
              <IconButton color="inherit" onClick={() => navigate('/')}>
                <img src={isMobile ? logoCut : logo} alt="logo" className="logo"/>
              </IconButton>
              {isTablet ?
                <div className="header-mobile">
                  <UserButton />
                  <CartButton />
                  <IconButton color="inherit" onClick={handleClick}>
                    <FontAwesomeIcon icon={faBars as any} />
                  </IconButton>
                  <Popover
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    className="popover"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <div className="popover-content">
                      {buttons('primary', 'text')}
                    </div>
                  </Popover>
                </div> : (
                  <>
                    {buttons('inherit', 'outlined')}
                    <UserButton />
                    <CartButton />
                  </>
                )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
