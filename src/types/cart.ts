import { Product } from './products'

export interface CartProduct extends Product {
  quantity: number
}

export type CartFields = {
  phone: string
  address: string
}
