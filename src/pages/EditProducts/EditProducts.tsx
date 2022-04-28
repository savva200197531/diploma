import React from 'react'
import './edit-products.scss'
import Loader from 'react-ts-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@mui/material'
import { useProducts } from '../../contexts/productsContext/ProductsContext'
import EditProductModal from './components/EditProductModal'
import { useNavigate } from 'react-router-dom'
import ProductFieldLayout from '../../components/ProductFieldLayout/ProductFieldLayout'

const EditProducts: React.FC = () => {
  const { products, loading, deleteProduct } = useProducts()
  const navigate = useNavigate()

  return (
    <section className="edit-products">
      <div className="container">
        <div className="edit-products-content">
          <EditProductModal />
          {loading ? <Loader type="spinner" size={50} /> : products.map(product => (
            <ProductFieldLayout className="product-card" key={product.id} product={product}>
              <Button onClick={() => navigate(`/product/${product.id}`)} variant="outlined">
                Подробнее
              </Button>
              <Button variant="outlined" color="error" onClick={() => deleteProduct(product)}>
                <FontAwesomeIcon icon={faTrashCan as any} size="lg" />
              </Button>
            </ProductFieldLayout>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EditProducts
