import React from 'react'
import './product.scss'
import { useProducts } from '../../contexts/productsContext/ProductsContext'
import { useParams } from 'react-router-dom'
import Loader from 'react-ts-loaders'
import CartAddButton from '../../components/CartAddButton/CartAddButton'

const Product: React.FC = ({}) => {
  const { getProduct, loading: productsLoading } = useProducts()
  const params = useParams()

  const product = getProduct(params.id as string)

  return (
    <div>
      {productsLoading ? <Loader type="spinner" size={50} /> : (
        <div>
          <img src={product.url} alt=""/>
          {product.name}
          {product.cost}
          {product.description}
          <CartAddButton product={product} color="primary" variant="contained" />
        </div>
      )}
    </div>
  )
}

export default Product
