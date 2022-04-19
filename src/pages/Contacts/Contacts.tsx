import React from 'react'
import './contacts.scss'

const data = [
  'ООО “Русьтелетех”',
  'Орджоникидзе, д.11, строение 40,',
  'Москва, 115419',
  'Телефон: +7 (495) 234-9777',
  'Факс: +7 (495) 234-9777',
  'E-mail: info@rusteletech.ru',
]

const Contacts: React.FC = ({}) => {
  return (
    <section className="contacts-section">
      <div className="container">
        <div className="contacts-content">
          <h1>КОНТАКТНАЯ ИНФОРМАЦИЯ</h1>
          {data.map((item, index) => <p key={index}>{item}</p>)}
        </div>
      </div>
    </section>
  )
}

export default Contacts
