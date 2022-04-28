import React, { FormEvent, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Creds } from '../../../types/user'
import useValidateEmail from '../../../hooks/useValidateEmail'
import useValidatePassword from '../../../hooks/useValidatePassword'
import Loader from 'react-ts-loaders'
import useLogin from '../../../hooks/useLogin'
import { FormField } from '../../../types/form'
import FormFieldLayout from '../../../components/FormFieldLayout'

const Login: React.FC = () => {
  // состояние компонента
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
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
  ])
  const [creds, setCreds] = useState<Creds>({} as Creds)
  const [formSubmit, setFormSubmit] = useState<boolean>(false)
  const [hasErrors, setHasErrors] = useState<boolean>(true)

  // валидации
  const { loginErrors, loading } = useLogin(creds, hasErrors)
  const { emailErrors } = useValidateEmail(creds.login, formSubmit)
  const { passwordErrors } = useValidatePassword(creds.password, formSubmit)

  // сабмит формы
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCreds({
      login,
      password,
    })
    setFormSubmit(true)
  }

  // расставляю ошибки, если они есть
  useEffect(() => {
    const messages: string[] = [...passwordErrors, ...emailErrors]

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
        default:
          return field
      }
    }))

    setFormSubmit(false)
  }, [emailErrors, passwordErrors, loginErrors])

  // выставляю загрузку
  useEffect(() => {
    setIsLoading(loading)
    setHasErrors(true)
  }, [loading])

  // верстка
  return <>
    <form className="auth-form login-form" onSubmit={handleSubmit}>
      {fields.map(field => <FormFieldLayout key={field.id} field={field} />)}

      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? <Loader className="auth-spinner" type="spinner" size={20} /> : 'Войти'}
        {/*<Loader className="auth-spinner" type="spinner" size={20} />*/}
      </Button>
      <p className="form-submit-errors">{loginErrors.map((error) => error)}</p>
    </form>
  </>
}

export default Login
