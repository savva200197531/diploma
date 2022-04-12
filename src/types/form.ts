import * as React from 'react'
import { InputBaseComponentProps } from '@mui/material/InputBase/InputBase'

export type FormField = {
  id: string
  name: string
  setState: (value: string) => void
  defaultValue?: any
  errors: string[]
  inputComponent?: React.ElementType<InputBaseComponentProps>
}