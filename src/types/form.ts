import { InputProps } from '@mui/material/Input/Input'

export interface FormField extends InputProps {
  id: string
  name: string
  setState: (value: string) => void
  errors?: string[]
}
