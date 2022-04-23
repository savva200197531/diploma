import React from 'react'
import './contacts.scss'

const data = [
  'ООО “Русьтелетех”',
  'пл. им. В. Н. Баварина, д. 2, офис 11/01',
  'Барнаул, 656056',
  'Телефон: +7 (923) 561-2109',
  'факс: +7 (923) 561-2109',
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
