import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, Modal } from '@mui/material'
import { FormField } from '../../../types/form'
import useValidateRequired from '../../../hooks/useValidateRequired'
import FormFieldLayout from '../../../components/FormFieldLayout'

type Props = {
  openChildModal: boolean
  handleCloseChildModal: () => void
  handleSubmit: (name: string) => void
}

const ChildModalForm: React.FC<Props> = ({ openChildModal, handleCloseChildModal, handleSubmit }) => {
  const [name, setName] = useState<string>('')
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'name',
      name: 'Название',
      defaultValue: name,
      setState: setName,
      errors: [],
    },
  ])

  const formRef = useRef<HTMLFormElement>(null)

  const { requiredErrors } = useValidateRequired(name, formSubmit)

  const handleSubmitChildForm = (event: FormEvent) => {
    event.preventDefault()
    setFormSubmit(true)
  }

  useEffect(() => {
    const messages: string[] = [...requiredErrors]

    if (!messages.length && formSubmit) {
      handleSubmit(name)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'name':
          return {
            ...field,
            errors: requiredErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [requiredErrors])

  useEffect(() => {
    setTimeout(() => {
      if (openChildModal && formRef.current) {
        formRef.current.style.marginTop = `calc(50vh - (${formRef.current.clientHeight}px / 2))`
        formRef.current.style.opacity = '1'
      }
    })
  }, [openChildModal, formRef.current])

  return (
    <Modal
      open={openChildModal}
      onClose={handleCloseChildModal}
    >
      <form
        ref={formRef}
        className="modal-form child-modal-form"
        onSubmit={handleSubmitChildForm}
      >
        {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

        <Button type="submit" variant="contained">
          Сохранить
        </Button>
      </form>
    </Modal>
  )
}

export default ChildModalForm
