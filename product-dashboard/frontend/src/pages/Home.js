import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <div>
            <div className="bg-primary text-white p-4 mb-4">
                <div className="container">
                    <h1>Product Dashboard</h1>
                    <p className="lead">Browse our amazing product catalog</p>
                </div>
            </div>
            <ProductList />
        </div>
    );
};

export default Home;