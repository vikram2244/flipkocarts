import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const productEndpoints = {
  mobiles: '/mobiles',
  ac: '/ac',
  books: '/books',
  computers: '/computers',
  fridges: '/fridges',
  furniture: '/furniture',
  kitchen: '/kitchen',
  men: '/men',
  speakers: '/speakers',
  tvs: '/tvs',
  watches: '/watches',
  women: '/women',
};

const EditAdmin = () => {
  const { names, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: '',
    product: '',
    image: '',
    brand: '',
    model: '',
    price: '',
    category: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!names || !productEndpoints[names.toLowerCase()]) {
        throw new Error(`Invalid product type: ${names || 'undefined'}`);
      }
      const endpoint = productEndpoints[names.toLowerCase()];
      const res = await axios.get(`${process.env.API_URL}/api${endpoint}/${id}`, {
        headers: { Accept: 'application/json' },
      });
      if (!res.data) {
        throw new Error(`Product with ID ${id} not found`);
      }
      setData({
        id: res.data.id || '',
        product: res.data.name || res.data.product || names || '',
        image: res.data.image || '',
        brand: res.data.brand || '',
        model: res.data.model || '',
        price: res.data.price || '',
        category: res.data.category || '',
        description: res.data.description || '',
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message || 'Failed to load product data');
    } finally {
      setLoading(false);
    }
  }, [names, id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = productEndpoints[names.toLowerCase()];
      if (!endpoint) {
        throw new Error('Invalid product type');
      }
      await axios.put(`${process.env.API_URL}/api/editadmin/${names}/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Product updated successfully!');
      navigate(`/admin/${names}`);
    } catch (error) {
      console.error('Error updating product:', error);
      alert(`Failed to update product: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading product data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <h1>Edit {names ? names.charAt(0).toUpperCase() + names.slice(1) : 'Product'} (ID: {id})</h1>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>ID:</label>
          <input name="id" value={data.id} disabled />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input name="product" value={data.product} disabled />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input name="image" value={data.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input name="brand" value={data.brand} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Model:</label>
          <input name="model" value={data.model} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={data.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input name="category" value={data.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
          <button type="button" onClick={() => navigate(`/admin/${names}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;