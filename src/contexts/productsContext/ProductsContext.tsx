import React, { useContext, useEffect, useState } from 'react'
import { DeleteProduct, GetProduct, ProductsContextProps, UploadProduct } from './types'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ref as databaseRef, set, push, onValue, remove } from 'firebase/database'
import { db, storage } from '../../firebase-config'
import { Product } from '../../types/products'
import { v4 } from 'uuid'

const ProductsContext = React.createContext<ProductsContextProps>({} as ProductsContextProps)

export const useProducts = () => useContext(ProductsContext)

export const ProductsProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const imagesRef = (id = '') => storageRef(storage, `productImages/${id}`)
  const productsRef = (id = '') => databaseRef(db, `products/${id}`)

  const uploadProduct: UploadProduct = (value) => {
    const id = v4()

    console.log(value)

    return uploadBytes(imagesRef(id), value.imgFile)
        .then(() => getDownloadURL(imagesRef(id)))
        .then(url => set(push(productsRef()), {
          ...value,
          url,
        }))
  }

  const deleteProduct: DeleteProduct = (product) => {
    remove(productsRef(product.id)).catch(error => {
      console.log(error)
    })
  }

  const watchProducts = () => {
    setLoading(true)

    onValue(productsRef(), (snapshot) => {
      if (!snapshot.exists()) {
        setProducts([])
        return setLoading(false)
      }
      const value = snapshot.val()
      setProducts(Object.keys(value).map(key => ({
        ...value[key],
        id: key,
      })).reverse())
      setLoading(false)
    })
  }

  const getProduct: GetProduct = (id) => products.find(product => product.id === id) as Product

  useEffect(() => {
    watchProducts()
  }, [])

  const value = {
    uploadProduct,
    loading,
    products,
    deleteProduct,
    getProduct,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
