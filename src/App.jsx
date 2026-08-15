import { Toaster } from 'react-hot-toast';
import './App.css'
import About from './components/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/Carts/Cart';
import Contact from './components/Contact';
import Home from './components/Home/Home';
import Products from './components/products/Products';
import Navbar from './components/Shared/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './components/checkout/Checkout';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/dashboard/Dashboard';
import AdminProduct from './components/admin/product/AdminProduct';
import Category from './components/admin/categories/Category';
import Sellers from './components/admin/sellers/Sellers';
import PaymentConfirmation from './components/checkout/PaymentConfirmation';
import Orders from './components/admin/orders/Orders';
import UserOrders from './components/Profile/UserOrders';
import UserProfile from './components/Profile/UserProfile';
import SellerPanel from './components/admin/seller/SellerPanel';

function App() {

  return (
    <React.Fragment>
      <Router>
        <div className="app-shell">
          <Navbar />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          
          <Route path='/' element = {<PrivateRoute publicPage/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route path='/' element = {<PrivateRoute/>}>
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/order-confirm' element={<PaymentConfirmation />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/profile/orders' element={<UserOrders />} />
          </Route>

          <Route path='/' element = {<PrivateRoute sellerOnly/>}>
            <Route path='/admin/seller' element={<SellerPanel />} />
          </Route>

          <Route path='/' element = {<PrivateRoute adminOnly/>}>
            <Route path='/admin' element={<AdminLayout/>}>
              <Route path='' element={<Dashboard/>}/>
              <Route path='products' element={<AdminProduct/>}/>
              <Route path='categories' element={<Category/>}/>
              <Route path='orders' element={<Orders/>}/>
              <Route path='sellers' element={<Sellers/>}/>
            </Route>
          </Route>

          </Routes>
        </div>
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  )
}

export default App;
