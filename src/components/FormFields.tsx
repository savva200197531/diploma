import React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { FormField } from '../types/form'

type Props = {
  fields: FormField[]
}

const FormFields: React.FC<Props> = ({ fields }) => {
  return (
    <>
      {fields.map(({ id, name, errors, setState, ...props }) => (
        <FormControl key={id}>
          <InputLabel color="primary" htmlFor={id}>
            {name}
          </InputLabel>
          <Input
            {...props}
            color="primary"
            id={id}
            aria-describedby={id}
            onChange={(event) => setState(event.target.value)}
          />
          <FormHelperText
            id={id}
            error
          >
            {errors?.map((error: string, index: number) =>
              <React.Fragment key={index}>{index !== 0 && ' '}{error}</React.Fragment>,
            )}
          </FormHelperText>
        </FormControl>
      ))}
    </>
  )
}

export default FormFields
