import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

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
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    women: '/women'
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!names) throw new Error('Product type is missing in URL');
        const endpoint = productEndpoints[names.toLowerCase()];
        if (!endpoint) throw new Error(`Invalid product type: ${names}`);

        const res = await axios.get(`${baseUrl}/api${endpoint}`, {
          headers: { Accept: 'application/json' }
        });

        const productData = Array.isArray(res.data)
          ? res.data.find(item => String(item.id) === String(id))
          : null;

        if (!productData) throw new Error(`Product with ID ${id} not found`);

        setData({
          id: productData.id || '',
          product: productData.product || names,
          image: productData.image || '',
          brand: productData.brand || '',
          model: productData.model || '',
          price: productData.price || '',
          category: productData.category || '',
          description: productData.description || ''
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [names, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = productEndpoints[names.toLowerCase()];
      if (!endpoint) throw new Error('Invalid product type');

      await axios.put(`${baseUrl}/api/editadmin/${names}/${id}`, data);
      alert('Product updated successfully!');
      navigate(`/${names}`); // Redirect to product list
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      alert(`Failed to update product: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div>Loading product data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-container">
      <h1>Edit {names?.charAt(0).toUpperCase() + names?.slice(1)} (ID: {id})</h1>
      <form onSubmit={handleSubmit}>
        <div><label>ID:</label><input name="id" value={data.id} disabled /></div>
        <div><label>Product:</label><input name="product" value={data.product} disabled /></div>
        <div><label>Image URL:</label><input name="image" value={data.image} onChange={handleChange} required /></div>
        <div><label>Brand:</label><input name="brand" value={data.brand} onChange={handleChange} required /></div>
        <div><label>Model:</label><input name="model" value={data.model} onChange={handleChange} required /></div>
        <div><label>Price:</label><input type="number" name="price" value={data.price} onChange={handleChange} min="1" required /></div>
        <div><label>Category:</label><input name="category" value={data.category} onChange={handleChange} required /></div>
        <div><label>Description:</label><input name="description" value={data.description} onChange={handleChange} required /></div>
        <div><button type="submit">Update</button></div>
      </form>
    </div>
  );
};

export default EditAdmin;
