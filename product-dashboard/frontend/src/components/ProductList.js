import React, { Component } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            error: null
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:5000/products');
            this.setState({
                products: response.data,
                loading: false
            });
        } catch (error) {
            this.setState({
                error: 'Failed to load products',
                loading: false
            });
        }
    }

    render() {
        const { products, loading, error } = this.state;

        if (loading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            );
        }

        return (
            <div className="container mt-4">
                <h2>Product Catalog</h2>
                <div className="row">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ProductList;