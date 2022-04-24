import React from 'react'
import { SlideProps } from '../../../../components/Slider/Slider'
import { Button } from '@mui/material'
import { useCart } from '../../../../contexts/cartContext/CartContext'
import { Product } from '../../../../types/products'
import ExtendedButton from './ExtendedButton'
import { useNavigate } from 'react-router-dom'

interface Props extends SlideProps {
  slide: Product
}

// отдельный продукт (слайд)
const Slide: React.FC<Props> = ({ slide, className, setCounter, index, counter }) => {
  const { addProduct, cartProducts } = useCart()

  const navigate = useNavigate()

  const overlap = cartProducts.find(item => item.id === slide.id)

  return (
    <div className={className} onClick={() => setCounter(index)}>
      <div className="img-wrapper">
        <div>
          <img src={slide.url} alt={slide.name}/>
        </div>
      </div>
      <h5 className="slide-title">{slide.name}</h5>
      <p className="">
        <span>Стоимость: </span>
        {slide.cost}
        <span>₽</span>
      </p>
      <p className="slide-description">
        <span>Описание: </span>
        {slide.description.split(' ').slice(0, 5).join(' ')}...
      </p>
      {index === counter && (
        <div className="slide-buttons">
          <Button onClick={() => navigate(`product/${slide.id}`)} variant="outlined" color="inherit">
            Подробнее
          </Button>
          {overlap ? <ExtendedButton overlap={overlap}/> :
            <Button onClick={() => addProduct(slide)} variant="outlined" color="inherit">
              В корзину
            </Button>}
        </div>
      )}
    </div>
  )
}

export default Slide
