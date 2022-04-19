import React, { useEffect, useState } from 'react'
import './edit-products.scss'
import EditProductModal from './EditProductModal'
import { useProducts } from '../../../contexts/productsContext/ProductsContext'
import Loader from 'react-ts-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'

const EditProducts: React.FC = () => {
  const { products, loading, deleteProduct } = useProducts()

  return (
    <section className="edit-products">
      <div className="container">
        <div className="edit-products-content">
          <EditProductModal />
          {loading ? <Loader type="spinner" size={50} /> : products.map((product, index: number) => (
            <div className="product-card" key={product.id}>
              <div className="img-wrapper">
                <div>
                  <img src={product.url} alt={product.name} />
                </div>
              </div>
              <h5 className="product-title">{product.name}</h5>
              <p className=""><span>Стоимость:</span> {product.cost} <span>₽</span></p>
              <p className="product-description"><span>Описание:</span> {product.description}</p>
              <Button variant="outlined" color="error" onClick={() => deleteProduct(product)}>
                <FontAwesomeIcon icon={faTrashCan as any} size="lg" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EditProducts
