import React from 'react'
import { Button, IconButton, Popover } from '@mui/material'
import Loader from 'react-ts-loaders'
import { useNavigate } from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../../../contexts/authContext/AuthContext'

const UserButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate()

  const { logout, loading, user } = useAuth()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const buttons = [
    {
      text: 'Редактор товаров',
      onClick: () => {
        handleClose()
        navigate('/admin/products')
      },
      isHidden: !user.admin,
    },
    {
      text: 'Выйти',
      onClick: () => {
        handleClose()
        logout().then(() => {})
      },
    },
  ]

  return (
    loading ?
        <Loader type="spinner" size={50} /> :
        <>
          <IconButton color="inherit" onClick={handleClick}>
            <FontAwesomeIcon icon={faUser as any} />
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
              {buttons.map(({ text, onClick, isHidden = false }, index) => (
                !isHidden && <Button key={index} variant="text" onClick={onClick}>
                  {text}
                </Button>
              ))}
            </div>
          </Popover>
        </>

  )
}

export default UserButton
