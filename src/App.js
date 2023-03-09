import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/HomePage/Home';
import About from './pages/AboutPage/About';
import Login from './pages/LoginPage/Login';
import Page404 from './pages/ErrorPage/Page404';
import Category from './pages/Category/Category';
import Cart from './pages/CartPage/Cart';
import './utils/utility-classes.css';
import Product from './pages/ProductPage/Product';
import Terms from "./pages/TermsPage/Terms";

function App() {
  return(
    <div className="app">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/about" component={About}/>
        <Route path="/category/:categoryName" component={Category}/>
        <Route path="/product/:productId" component={Product}/>
        <Route path="/terms-and-conditions" component={Terms}/>
        <Route path="*" component={Page404}/>
      </Switch>
    </div>
  );
}

export default App;
