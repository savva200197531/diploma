import React, { useEffect, useState } from 'react'
import './Reviews.scss'
import avatar from '../../../../assets/images/avatar.svg'
import Slider from '../../../../components/Slider/Slider'
import Slide from './Slide'
import { storage } from '../../../../firebase-config'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import Loader from 'react-ts-loaders'

// отзывы
const Reviews: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [slides, setSlides] = useState<string[]>([])

  const sliderRef = ref(storage, 'sliderImages')

  useEffect(() => {
    setLoading(true)
    setSlides([])
    listAll(sliderRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(url => setSlides(prev => [...prev, url]))
      })
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="reviews">
          <div className="reviews-description">
            <h2 className="section-title">Отзывы</h2>
            <h3 className="reviews-title">Отличное оборудование</h3>
            <p className="section-text">
              Хочу выразить благодарность вашей компании. Оборудование работает без перебоев.
            </p>
            <div className="account">
              <img className="account-avatar" src={avatar} alt="avatar" />
              <div className="account-description">
                <h5 className="account-name">Григорий Сергеев</h5>
                <div className="account-socials">
                  <a href="#" className="account-social">
                    Facebook
                  </a>
                  <a href="#" className="account-social">
                    Вконтакте
                  </a>
                </div>
              </div>
            </div>
          </div>

          {loading ? <Loader type="spinner" size={50} /> : <Slider
            className="videos-slider"
            Slide={Slide}
            navigation
            slides={slides}
          />}
        </div>
      </div>
    </section>
  )
}

export default Reviews
