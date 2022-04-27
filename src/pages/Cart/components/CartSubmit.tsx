import React, { FormEvent, useEffect, useRef, useState } from 'react'
import {
  Button, FormControl, FormHelperText, Input, InputLabel,
  Modal,
} from '@mui/material'
import { FormField } from '../../../types/form'
import { PhoneMaskCustom } from '../../../components/PhoneMaskCustom'
import FormFields from '../../../components/FormFields'
import useValidateStringMinMax from '../../../hooks/useValidateStringMinMax'
import useValidateRequired from '../../../hooks/useValidateRequired'
import { CartFields } from '../../../types/cart'
import useCartSubmit from '../../../hooks/useCartSubmit'
import Loader from 'react-ts-loaders'

const CartSubmit: React.FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [phoneErrors, setPhoneErrors] = useState<string[]>([])
  const [values, setValues] = useState({} as CartFields)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'address',
      name: 'Адрес',
      defaultValue: address,
      setState: setAddress,
      errors: [],
    },
  ])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { cartSubmitErrors, loading } = useCartSubmit(values, hasErrors, handleClose)
  const { requiredErrors: addressErrors } = useValidateRequired(address, formSubmit)
  const { lengthErrors } = useValidateStringMinMax(phone, { min: 17 }, formSubmit)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setValues({
      phone,
      address,
    })
    setFormSubmit(true)
  }

  // const handleSubmit = (event: FormEvent) => {
  //   event.preventDefault()
  //   cartSubmit({}).finally(() => {
  //     deleteProduct()
  //     handleClose()
  //   })
  // }

  useEffect(() => {
    setTimeout(() => {
      if (open && formRef.current) {
        formRef.current.style.marginTop = `calc(50vh - (${formRef.current.clientHeight}px / 2))`
        formRef.current.style.opacity = '1'
      }
    })
  }, [open, formRef.current])

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...addressErrors, ...lengthErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'address':
          return {
            ...field,
            errors: addressErrors,
          }
        default:
          return field
      }
    }))

    setPhoneErrors(lengthErrors)

    setFormSubmit(false)
  }, [addressErrors, lengthErrors])

  useEffect(() => {
    setIsLoading(loading)
    setHasErrors(true)
  }, [loading])

  return (
    <div className="cart-toolbar">
      <Button onClick={handleOpen} className="cart-toolbar-button" variant="contained" color="primary">
        Оформить
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <form ref={formRef} className="cart-submit-form modal-form" onSubmit={handleSubmit}>
          <FormFields fields={fields} />

          <FormControl>
            <InputLabel color="primary" htmlFor="phone">Телефон</InputLabel>
            <Input
              inputComponent={PhoneMaskCustom as any}
              color="primary"
              id="phone"
              aria-describedby="phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value)
              }}
            />
            <FormHelperText id="phone" error>
              {phoneErrors?.map((error: string, index) =>
                <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
              )}
            </FormHelperText>
          </FormControl>

          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? <Loader className="auth-spinner" type="spinner" size={20} /> : 'Подтвреждаю'}
          </Button>
          <p className="form-submit-errors">{cartSubmitErrors.map((error) => error)}</p>
        </form>
      </Modal>
    </div>
  )
}

export default CartSubmit
