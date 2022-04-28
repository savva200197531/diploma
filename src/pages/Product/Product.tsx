import React from 'react'
import './product.scss'
import { useProducts } from '../../contexts/productsContext/ProductsContext'
import { useParams } from 'react-router-dom'
import Loader from 'react-ts-loaders'
import CartAddButton from '../../components/CartAddButton/CartAddButton'
import ProductFieldLayout from '../../components/ProductFieldLayout/ProductFieldLayout'

const Product: React.FC = ({}) => {
  const { getProduct, loading: productsLoading } = useProducts()
  const params = useParams()

  const product = getProduct(params.id as string)

  return (
    <section className="product-section">
      <div className="container">
        <div className="product-content">
          {productsLoading ? <Loader type="spinner" size={50} /> : (
            <ProductFieldLayout product={product}>
              <CartAddButton product={product} color="primary" variant="contained" />
            </ProductFieldLayout>
          )}
        </div>
      </div>
    </section>
  )
}

export default Product
