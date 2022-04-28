import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import useSignup from '../../../hooks/useSignup'
import { Creds } from '../../../types/user'
import { FormField } from '../../../types/form'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'
import Loader from 'react-ts-loaders'
import useValidatePasswordConfirm from '../../../hooks/useValidatePasswordConfirm'
import FormFieldLayout from '../../../components/FormFieldLayout'

const Signup: React.FC = () => {
  // состояние компонента
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'login',
      name: 'Email',
      defaultValue: login,
      setState: setLogin,
      errors: [],
    },
    {
      id: 'password',
      name: 'Пароль',
      defaultValue: password,
      setState: setPassword,
      errors: [],
    },
    {
      id: 'password-confirm',
      name: 'Подтверждение пароля',
      defaultValue: passwordConfirm,
      setState: setPasswordConfirm,
      errors: [],
    },
  ])
  const [creds, setCreds] = useState<Creds>({} as Creds)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { signupErrors, loading } = useSignup(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)
  const { passwordConfirmErrors } = useValidatePasswordConfirm(creds, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      password,
      passwordConfirm,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...passwordConfirmErrors, ...emailErrors]

    if (!messages.length && formSubmit) {
      setHasErrors(false)
    }

    setFields(fields.map((field: FormField) => {
      switch (field.id) {
        case 'login':
          return {
            ...field,
            errors: emailErrors,
          }
        case 'password':
          return {
            ...field,
            errors: passwordErrors,
          }
        case 'password-confirm':
          return {
            ...field,
            errors: passwordConfirmErrors,
          }
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [emailErrors, passwordErrors, passwordConfirmErrors, signupErrors])

  // выставляю загрузку
  useEffect(() => {
    setIsLoading(loading)
    setHasErrors(true)
  }, [loading])

  // верстка
  return <>
    <form className="auth-form signup-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="spinner" size={20} /> : 'Зарегистрироваться'}
      </Button>
      <p className="form-submit-errors">{signupErrors.map((error) => error)}</p>
    </form>
  </>
}

export default Signup
