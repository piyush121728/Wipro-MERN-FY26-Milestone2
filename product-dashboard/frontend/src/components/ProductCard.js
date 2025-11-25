import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                    <p className="card-text">${product.price}</p>
                    <p className="card-text text-truncate">{product.description}</p>

                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
                            View Details
                        </Link>
                        <button
                            className={`btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={toggleFavorite}
                        >
                            {isFavorite ? '★' : '☆'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;