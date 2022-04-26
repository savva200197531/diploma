import { useState, useEffect } from 'react'
import { CartFields } from '../types/cart'
import { useCart } from '../contexts/cartContext/CartContext'

type UseCartSubmit = (
  values: CartFields,
  errors: boolean,
  handleClose: () => void
) => ({
  cartSubmitErrors: string[]
  loading: boolean
})

const useCartSubmit: UseCartSubmit = (values, errors, handleClose) => {
  // state
  const [cartSubmitErrors, setCartSubmitErrors] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // other
  const { cartSubmit } = useCart()

  useEffect(() => {
    if (errors) return
    createProduct()
  }, [values, errors])

  const createProduct = () => {
    const errors: string[] = []
    setCartSubmitErrors([])
    setLoading(true)

    cartSubmit(values)
        .then(() => {
          handleClose()
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          error.push('Не удалось оформить заказ!')
          setLoading(false)
        })

    setCartSubmitErrors(errors)
  }

  return { cartSubmitErrors, loading }
}

export default useCartSubmit
