import React from 'react'
import { SlideProps } from '../../../../components/Slider/Slider'
import { Button } from '@mui/material'
import { Product } from '../../../../types/products'
import { useNavigate } from 'react-router-dom'
import CartAddButton from '../../../../components/CartAddButton/CartAddButton'
import ProductFieldLayout from '../../../../components/ProductFieldLayout/ProductFieldLayout'

interface Props extends SlideProps {
  slide: Product
}

// отдельный продукт (слайд)
const Slide: React.FC<Props> = ({ slide, className, setCounter, index, counter }) => {
  const navigate = useNavigate()

  return (
    <ProductFieldLayout product={{
      ...slide,
      description: `${slide.description.split(' ').slice(0, 5).join(' ')}...`,
    }} className={className} onClick={() => setCounter(index)}>
      {index === counter && (
        <div className="slide-buttons">
          <Button onClick={() => navigate(`/product/${slide.id}`)} variant="outlined" color="inherit">
            Подробнее
          </Button>
          <CartAddButton product={slide} />
        </div>
      )}
    </ProductFieldLayout>
  )
}

export default Slide
