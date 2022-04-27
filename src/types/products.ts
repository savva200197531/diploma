export interface ProductFields {
  name: string
  description: string
  cost: string
  additionalDescription?: {
    [key: string]: string
  }
  imgFile: File
}

export type AdditionalDescription = {
  name: string
  value: string
}

export interface Product {
  id: string
  name: string
  cost: string
  description: string
  url: string
  additionalDescription: {
    [key: string]: string
  }
}
