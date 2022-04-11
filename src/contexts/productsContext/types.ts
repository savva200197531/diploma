export type UploadImg = (imgFile: File, id: string) => Promise<any>
export type UploadProduct = (name: string, description: string, cost: string, id: string) => Promise<any>

export interface ProductsContextProps {
  uploadImg: UploadImg
  uploadProduct: UploadProduct
}
