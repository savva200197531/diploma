import React from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import { FormField } from '../types/form'

type Props = {
  fields: FormField[]
}

const FormFields: React.FC<Props> = ({ fields }) => {
  return (
    <>
      {fields.map(({ id, name, errors, setState, defaultValue, inputComponent, value }) => (
        <FormControl key={id}>
          <InputLabel color="primary" htmlFor={id}>
            {name}
          </InputLabel>
          <Input
            color="primary"
            id={id}
            defaultValue={defaultValue}
            value={value}
            aria-describedby={id}
            onChange={(event) => setState(event.target.value)}
            inputComponent={inputComponent || undefined}
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
