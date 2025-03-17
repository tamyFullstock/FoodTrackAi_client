import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import ProductsList from './features/ingredients/ProductsList'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element = {<Home/>}/>
        <Route path="dashboard" element = {<Dashboard/>}/>
        <Route path = "features">
          <Route path = "products" element = {<ProductsList/>}/>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
