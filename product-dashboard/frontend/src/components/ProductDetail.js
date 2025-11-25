import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <Link to="/" className="btn btn-secondary">← Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-secondary mb-3">← Back to Products</Link>

            {product && (
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                        <p className="card-text h4 text-primary">${product.price}</p>
                        <p className="card-text">{product.description}</p>
                        <div className="mt-3">
                            <span className="badge bg-info">ID: {product.id}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;