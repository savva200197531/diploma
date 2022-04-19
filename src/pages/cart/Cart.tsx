import React, { useEffect, useRef } from 'react'
import { useCart } from '../../contexts/cartContext/CartContext'
import Loader from 'react-ts-loaders'
import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './cart.scss'
import CartSubmit from './CartSubmit'

const Cart: React.FC = () => {
  const { loading, cartProducts, incrementProduct, decrementProduct, deleteProduct } = useCart()

  return (
    <section className="cart-section">
      <div className="container">
        <div className="cart">
          <div className="cart-items">
            {loading ? <Loader type="spinner" size={50}/> :
              !cartProducts.length ? <div>Корзина пуста</div> :
                cartProducts.map(product => (
                  <div className="cart-item" key={product.id}>
                    <div className="img-wrapper">
                      <div>
                        <img src={product.url} alt={product.name}/>
                      </div>
                    </div>
                    <p>{product.name}</p>
                    <div>
                      <Button variant="outlined" color="primary" onClick={() => decrementProduct(product)}>
                        -
                      </Button>
                      <span className="cart-item-counter">{product.quantity}</span>
                      <Button variant="outlined" color="primary" onClick={() => incrementProduct(product)}>
                        +
                      </Button>
                    </div>
                    <Button variant="outlined" color="error" onClick={() => deleteProduct(product)}>
                      <FontAwesomeIcon icon={faTrashCan as any} size="lg"/>
                    </Button>
                  </div>
                ))}
          </div>

          {!!cartProducts.length && <CartSubmit />}
        </div>
      </div>
    </section>
  )
}

export default Cart
