import React from 'react'
import { Button } from '@mui/material'
import './cart-add-button.scss'
import { CartProduct } from '../../types/cart'
import { useCart } from '../../contexts/cartContext/CartContext'
import { MuiButtonVariant, MuiColor } from '../../types/types'
import { Product } from '../../types/products'
import Loader from 'react-ts-loaders'

type Props = {
  color?: MuiColor
  variant?: MuiButtonVariant
  product: Product
}

const CartAddButton: React.FC<Props> = ({ color = 'inherit', product, variant = 'outlined' }) => {
  const { decrementProduct, incrementProduct, addProduct, cartProducts, loading } = useCart()

  const overlap = cartProducts.find(item => item.id === product.id) as CartProduct

  return (
    loading ? <Loader type="spinner" size={20}/> :
      overlap ?
        <div className="cart-change-buttons">
          <Button color="inherit" onClick={() => decrementProduct(overlap)}>
            -
          </Button>
          <span>{overlap.quantity}</span>
          <Button color="inherit" onClick={() => incrementProduct(overlap)}>
            +
          </Button>
        </div> :
        <Button onClick={() => addProduct(product)} variant={variant} color={color}>
          В корзину
        </Button>
  )
}

export default CartAddButton
