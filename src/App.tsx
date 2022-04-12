import React from 'react'
import './App.scss'
import MainPage from './pages/main/MainPage'
import Auth from './pages/auth/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layout/Header/Header'
import { AuthProvider } from './contexts/authContext/AuthContext'
import Login from './pages/auth/sections/Login'
import Signup from './pages/auth/sections/Signup'
import { CartProvider } from './contexts/cartContext/CartContext'
import EditProducts from './pages/admin/EditProducts/EditProducts'
import { ProductsProvider } from './contexts/productsContext/ProductsContext'

// корень приложения с роутером для навигации по сайту и провайдерами, для управления логикой сайта
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Header />

            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="auth" element={<Auth />} >
                <Route path="login" element={<Login/>} />
                <Route path="signup" element={<Signup/>} />
              </Route>
              <Route path="/admin/products" element={<EditProducts />} />
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
