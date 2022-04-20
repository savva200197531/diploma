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
import Cart from './pages/cart/Cart'
import NotFound from './pages/NotFound/NotFound'
import About from './pages/About/About'
import Contacts from './pages/Contacts/Contacts'
import Certificates from './pages/Сertificates/Сertificates'
import Footer from './layout/Footer/Footer'
import Products from './pages/main/sections/Products/Products'
import Info from './pages/main/sections/Info/Info'
import Reviews from './pages/main/sections/Reviews/Reviews'
import Trust from './pages/Trust/Trust'
import Support from './pages/Support/Support'
import Test from './pages/Test/Test'

// корень приложения с роутером для навигации по сайту и провайдерами, для управления логикой сайта
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <Header/>
            <Routes>
              <Route path="auth" element={<Auth/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
              </Route>

              <Route path="/" element={<MainPage/>}>
                <Route
                  path="/"
                  element={
                    <>
                      <Products/>
                      <Info/>
                      <Reviews/>
                    </>
                  }
                />
                <Route path="/certificates" element={<Certificates/>}/>
                <Route path="/contacts" element={<Contacts/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/trust" element={<Trust/>}/>
                <Route path="/support" element={<Support/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/admin/products" element={<EditProducts/>}/>
                <Route path="/cart" element={<Cart/>}/>
              </Route>

              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
