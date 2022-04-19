import React, { FormEvent, useEffect, useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle, Modal, TextField,
} from '@mui/material'
import { useCart } from '../../contexts/cartContext/CartContext'
import { FormField } from '../../types/form'
import FormFields from '../../components/FormFields'
import { PhoneMaskCustom } from '../../components/PhoneMaskCustom'

const CartSubmit: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [address, setAddress] = useState<string>()
  const [phone, setPhone] = useState<string>()

  const formRef = useRef<HTMLFormElement>(null)

  const { deleteProduct } = useCart()

  const fields: FormField[] = [
    {
      id: 'address',
      name: 'Адрес',
      defaultValue: address,
      setState: setAddress,
    },
    {
      id: 'phone',
      name: 'Телефон',
      value: phone,
      setState: setPhone,
      inputComponent: PhoneMaskCustom as any,
    },
  ]

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    deleteProduct()
    handleClose()
  }

  useEffect(() => {
    setTimeout(() => {
      if (open && formRef.current) {
        formRef.current.style.marginTop = `calc(50vh - (${formRef.current.clientHeight}px / 2))`
        formRef.current.style.opacity = '1'
      }
    })
  }, [open, formRef.current])

  return (
    <div className="cart-toolbar">
      <Button onClick={handleOpen} className="cart-toolbar-button" variant="contained" color="primary">
        Оформить
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <form ref={formRef} className="modal-form" onSubmit={handleSubmit}>
          <FormFields fields={fields} />

          <Button type="submit" variant="contained">
            Подтвреждаю
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default CartSubmit
