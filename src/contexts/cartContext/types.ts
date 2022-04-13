import { CartProduct } from '../../types/cart'
import { Product } from '../../types/products'

export type AddProduct = (product: Product) => void

export type ChangeProduct = (product: CartProduct) => void

export interface CartContextProps {
  addProduct: AddProduct
  incrementProduct: ChangeProduct
  decrementProduct: ChangeProduct
  deleteProduct: ChangeProduct
  cartProducts: CartProduct[]
  loading: boolean
}
