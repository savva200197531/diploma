import React from 'react'
import { SlideProps } from '../../../../components/Slider/Slider'
import { Button } from '@mui/material'
import { Product } from '../../../../types/products'
import { useNavigate } from 'react-router-dom'
import CartAddButton from '../../../../components/CartAddButton/CartAddButton'

interface Props extends SlideProps {
  slide: Product
}

// отдельный продукт (слайд)
const Slide: React.FC<Props> = ({ slide, className, setCounter, index, counter }) => {
  const navigate = useNavigate()

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
          <CartAddButton product={slide} />
        </div>
      )}
    </div>
  )
}

export default Slide
