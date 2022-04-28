import React from 'react'
import { Product } from '../../types/products'
import classNames from 'classnames'
import './product-field-layout.scss'

type Props = {
  product: Product
  className?: string
  onClick?: () => void
}

const ProductFieldLayout: React.FC<Props> = ({
  product: {
    name,
    cost,
    url,
    description,
    additionalDescription,
  },
  className,
  onClick,
  children,
}) => {
  return (
    <div className={classNames('product', className)} onClick={onClick}>
      <div className="img-wrapper">
        <div>
          <img src={url} alt={name}/>
        </div>
      </div>
      <div className="product-info">
        <h5 className="product-title">{name}</h5>
        <p className="product-field"><span>Стоимость:</span> {cost} <span>₽</span></p>
        <p className="product-field"><span>Описание:</span> {description}</p>
        <div className="product-additional-description">
          {additionalDescription && Object.keys(additionalDescription).map((key, index) => (
            <div className="product-field" key={index}>
              <span>{key}: </span>
              <span>{additionalDescription[key]}</span>
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
}

export default ProductFieldLayout
