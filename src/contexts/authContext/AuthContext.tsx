import React, { useContext, useEffect, useState } from 'react'
import { AuthAction, AuthContextProps, User } from './types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, set, get, child } from 'firebase/database'
import { auth, db } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)
// контекст аунтефикации
export const AuthProvider: React.FC = ({ children }) => {
  const navigate = useNavigate()

  // ссылка на базу данных
  const userRef = (id: string) => ref(db, `users/${id}`)

  const [user, setUser] = useState({} as User)
  const [loading, setLoading] = useState<boolean>(true)

  // забираю пользователя из бд при входе на сайт
  const getUser = (uid: string, email: string | null) => {
    get(userRef(uid)).then(snapshot => {
      if (!snapshot.exists()) {
        console.log('No user data available')
        getUser(uid, email)
        return
      }
      setUser({
        uid,
        email,
        admin: !!snapshot.val().admin,
      })
    }).finally(() => {
      setLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }

  // отправка данных при регистрации
  const signup: AuthAction = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(value => {
          set(userRef(value.user.uid), {
            email,
          }).catch(error => {
            console.log(error)
          })
          navigate('/')
        })
  }

  // отправка данных при входе
  const login: AuthAction = (login, password) =>
    signInWithEmailAndPassword(auth, login, password)
        .then(() => {
          navigate('/')
        })

  // выход с аккаунта
  const logout = () => signOut(auth).then(() => navigate('/auth/login')).catch((error) => console.log(error))

  // слежу за состоянием пользователя (вышел/вошел/зарегистрировался)
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoading(true)
      if (!currentUser) {
        setUser({} as User)
        setLoading(false)
        return
      }

      getUser(currentUser.uid, currentUser.email)
    })
  }, [])

  // вывожу состояние и функции для использования по всему приложению
  const value = {
    signup,
    login,
    logout,
    user,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
