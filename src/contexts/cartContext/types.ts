import { CartProduct } from '../../types/cart'
import { Product } from '../../types/products'

export type AddProduct = (product: Product) => void

export type ChangeProduct = (product: CartProduct) => void

export type DeleteProduct = (product?: CartProduct) => void

export type CartSubmit = (payload: any) => Promise<any>

export interface CartContextProps {
  addProduct: AddProduct
  incrementProduct: ChangeProduct
  decrementProduct: ChangeProduct
  deleteProduct: DeleteProduct
  cartProducts: CartProduct[]
  loading: boolean
  cartSubmit: CartSubmit
}
