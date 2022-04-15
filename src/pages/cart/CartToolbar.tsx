import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useCart } from '../../contexts/cartContext/CartContext'

const CartToolbar: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)

  const { deleteProduct } = useCart()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className="cart-toolbar">
      <Button onClick={handleOpen} className="cart-toolbar-button" variant="contained" color="primary">
        Оформить
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Подтвердите оформление заказа
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Оплата будет производиться при получении, наличными или по карте. Вы подтверждаете оформление заказа?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Отмена</Button>
          <Button variant="contained" onClick={() => {
            deleteProduct()
            handleClose()
          }} autoFocus>
            Подтвреждаю
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CartToolbar
