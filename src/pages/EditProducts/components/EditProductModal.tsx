import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import EditProductsForm from './EditProductsForm'
import { Modal } from '@mui/material'

const EditProductModal: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className="product-card-edit" onClick={handleOpen}>
        <FontAwesomeIcon icon={faPlus as any} size="2x"/>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <>
          <EditProductsForm open={open} handleClose={handleClose} />
        </>
      </Modal>
    </>
  )
}

export default EditProductModal
