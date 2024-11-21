import React from 'react';
import Footer from '../Footer';
import Navbar from '../NavbarC';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './Products';
import ProductDetail from './ProductDetail';
import ProductSorting from './ProductSorting';
import Category from './Category';



function Dashboard() {
    
    return ( 
        <>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Products/>}/>
            <Route path='/detail/:id' element={<ProductDetail/>}/>
            <Route path='/product/sort' element={<ProductSorting/>}/>
            <Route path='/products/category/:category' element={<Category/>}/>
        </Routes>
        <Footer/>
        </BrowserRouter>
        </>
        
     );
}

export default Dashboard;