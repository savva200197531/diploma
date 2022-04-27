import React from 'react'
import './edit-products.scss'
import Loader from 'react-ts-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { useProducts } from '../../contexts/productsContext/ProductsContext'
import EditProductModal from './components/EditProductModal'

const EditProducts: React.FC = () => {
  const { products, loading, deleteProduct } = useProducts()

  console.log(products)

  return (
    <section className="edit-products">
      <div className="container">
        <div className="edit-products-content">
          <EditProductModal />
          {loading ? <Loader type="spinner" size={50} /> : products.map(({ additionalDescription, ...product }) => (
            <div className="product-card" key={product.id}>
              <div className="product-card-info">
                <div className="img-wrapper">
                  <div>
                    <img src={product.url} alt={product.name} />
                  </div>
                </div>
                <h5 className="product-title">{product.name}</h5>
                <p className=""><span>Стоимость:</span> {product.cost} <span>₽</span></p>
                <p className="product-description"><span>Описание:</span> {product.description}</p>
                <div className="product-additional-description">
                  {additionalDescription && Object.keys(additionalDescription).map((key, index) => (
                    <div key={index}>
                      <span>{key}: </span>
                      <span>{additionalDescription[key]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-card-actions">
                <Button variant="outlined" color="error" onClick={() => deleteProduct({ ...product, additionalDescription })}>
                  <FontAwesomeIcon icon={faTrashCan as any} size="lg" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EditProducts
