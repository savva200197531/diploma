import React, { useState } from 'react'
import './Slider.scss'
import classNames from 'classnames'
import arrowLeft from '../../assets/images/arrow-left.svg'
import arrowRight from '../../assets/images/arrow-right.svg'

export interface SlideProps {
  slide: any;
  className: string;
  setCounter: (value: number) => void;
  index: number;
  counter: number;
}

type Props = {
  slides: any[]
  navigation?: boolean;
  className?: string;
  Slide: React.FC<SlideProps>;
};

const Slider: React.FC<Props> = ({ slides, navigation, className, Slide }) => {
  const [counter, setCounter] = useState<number>(0)

  const nextSlide = () => {
    setCounter(counter + 1)
    if (counter >= slides.length - 1) {
      setCounter(0)
    }
  }

  const prevSlide = () => {
    setCounter(counter - 1)
    if (counter <= 0) {
      setCounter(slides.length - 1)
    }
  }

  const isPrev = (index: number) =>
    counter === 0 ? index === slides.length - 1 : index === counter - 1

  const isNext = (index: number) =>
    counter === slides.length - 1 ? index === 0 : index === counter + 1

  return (
    <div className={classNames('slider', className)}>
      <div className="slider-controls">
        <img onClick={prevSlide} src={arrowLeft} alt="prev slide" className="prev-slide" />
        <ul className="dots">
          {navigation &&
            slides.map((slide, index: number) => (
              <li
                key={index}
                className={classNames('dot', { active: index === counter })}
                onClick={() => setCounter(index)}
              />
            ))}
        </ul>
        <img onClick={nextSlide} src={arrowRight} alt="next slide" className="next-slide" />
      </div>
      <div className="slides-container">
        {slides.map((slide, index: number) => (
          <Slide
            key={index}
            setCounter={setCounter}
            counter={counter}
            index={index}
            className={classNames(
                'slide',
                { active: index === counter },
                { prev: isPrev(index) },
                { next: isNext(index) },
            )}
            slide={slide}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
