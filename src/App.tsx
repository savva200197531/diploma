import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layout/Header/Header'
import { AuthProvider } from './contexts/authContext/AuthContext'
import { CartProvider } from './contexts/cartContext/CartContext'
import { ProductsProvider } from './contexts/productsContext/ProductsContext'
import NotFound from './pages/NotFound/NotFound'
import About from './pages/About/About'
import Contacts from './pages/Contacts/Contacts'
import Certificates from './pages/Сertificates/Сertificates'
import Trust from './pages/Trust/Trust'
import Support from './pages/Support/Support'
import Test from './pages/Test/Test'
import EditProducts from './pages/EditProducts/EditProducts'
import MainPage from './pages/MainPage/MainPage'
import Products from './pages/MainPage/sections/Products/Products'
import Info from './pages/MainPage/sections/Info/Info'
import Reviews from './pages/MainPage/sections/Reviews/Reviews'
import Cart from './pages/Cart/Cart'
import Auth from './pages/Auth/Auth'
import Login from './pages/Auth/sections/Login'
import Signup from './pages/Auth/sections/Signup'
import Product from './pages/Product/Product'
import { YMaps } from 'react-yandex-maps'

// корень приложения с роутером для навигации по сайту и провайдерами, для управления логикой сайта
function App() {
  return (
    <BrowserRouter>
      <YMaps>
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
                  <Route path="/product/:id" element={<Product/>}/>
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
      </YMaps>
    </BrowserRouter>
  )
}

export default App
