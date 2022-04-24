import React from 'react'
import { Button } from '@mui/material'
import { useCart } from '../../../../contexts/cartContext/CartContext'
import { CartProduct } from '../../../../types/cart'

type Props = {
  overlap: CartProduct
}

const ExtendedButton: React.FC<Props> = ({ overlap }) => {
  const { decrementProduct, incrementProduct } = useCart()

  return (
    <div className="extended-button">
      <Button color="inherit" onClick={() => decrementProduct(overlap)}>
        -
      </Button>
      <span>{overlap.quantity}</span>
      <Button color="inherit" onClick={() => incrementProduct(overlap)}>
        +
      </Button>
    </div>
  )
}

export default ExtendedButton
