import React from 'react'
import { SlideProps } from '../../../../components/Slider/Slider'

// слайд с картинкой возле отзывов
const Slide: React.FC<SlideProps> = ({ slide, className }) => {
  return (
    <div className={className}>
      <img className="slide-img" src={slide} alt="slide img" />
    </div>
  )
}

export default Slide
