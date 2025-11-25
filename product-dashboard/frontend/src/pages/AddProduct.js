import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { dispatch } = useProduct();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Product name is required')
            .min(2, 'Name must be at least 2 characters'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be positive'),
        category: Yup.string()
            .required('Category is required'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('http://localhost:5000/products', values);
            dispatch({ type: 'ADD_PRODUCT', payload: response.data });
            resetForm();
            navigate('/');
        } catch (error) {
            console.error('Failed to add product:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add New Product</h2>
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    category: '',
                    description: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field type="number" name="price" className="form-control" step="0.01" />
                            <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <Field as="select" name="category" className="form-select">
                                <option value="">Select a category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home Appliances">Home Appliances</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Books">Books</option>
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field as="textarea" name="description" className="form-control" rows="3" />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Product'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProduct;

import React, { Suspense, lazy } from 'react';

const ProductDetail = lazy(() => import('./components/ProductDetail'));
