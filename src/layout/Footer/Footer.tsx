import React from 'react'
import './footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSquarePhone } from '@fortawesome/free-solid-svg-icons'
import sk from '../../assets/images/sk.png'

// подвал сайта
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info-wrapper">
            <p className="copyright">ООО “РУСЬТЕЛЕТЕХ”, 2002-2021</p>
            <div className="footer-info">
              <FontAwesomeIcon icon={faHouse as any} size="lg" />
              <div>
                <p>пл. им. В. Н. Баварина, д. 2, офис 11/01</p>
                <p>Барнаул, 656056</p>
              </div>
            </div>
            <div className="footer-info">
              <FontAwesomeIcon icon={faSquarePhone as any} size="lg" />
              <div>
                <p>Телефон: +7 (923) 561-2109</p>
                <p>факс: +7 (923) 561-2109</p>
              </div>
            </div>
          </div>
          <img className="footer-img" src={sk} alt="skolkovo"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
