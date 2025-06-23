import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAdmin = () => {
  const { names, id } = useParams(); // Use 'names' to match App.jsx route
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
        if (!names) {
          throw new Error('Product type is missing in URL');
        }
        const endpoint = productEndpoints[names.toLowerCase()];
        if (!endpoint) {
          throw new Error(`Invalid product type: ${names}`);
        }
        const res = await axios.get(`https://flipko-springboot-1.onrender.com/api${endpoint}`, {
          headers: { Accept: 'application/json' }
        });
        const productData = Array.isArray(res.data) ? res.data.find(item => String(item.id) === String(id)) : null;
        if (!productData) {
          throw new Error(`Product with ID ${id} not found`);
        }
        setData({
          id: productData.id || '',
          product: productData.name || productData.product || names || '',
          image: productData.image || '',
          brand: productData.brand || '',
          model: productData.model || '',
          price: productData.price || '',
          category: productData.category || '',
          description: productData.description || ''
        });
        navigate(`${names}/${id}`);
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
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = productEndpoints[names.toLowerCase()];
      if (!endpoint) {
        throw new Error('Invalid product type');
      }
      await axios.put(`https://flipko-springboot-1.onrender.com/api/editadmin/${names}/${id}`, data);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
      alert(`Failed to update product: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div>Loading product data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-container">
      <h1>Edit {names ? names.charAt(0).toUpperCase() + names.slice(1) : 'Product'} (ID: {id})</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input name="id" value={data.id} onChange={handleChange} disabled />
        </div>
        <div>
          <label>Product:</label>
          <input name="product" value={data.product} onChange={handleChange} disabled />
        </div>
        <div>
          <label>Image URL:</label>
          <input name="image" value={data.image} onChange={handleChange} />
        </div>
        <div>
          <label>Brand:</label>
          <input name="brand" value={data.brand} onChange={handleChange} />
        </div>
        <div>
          <label>Model:</label>
          <input name="model" value={data.model} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input name="price" value={data.price} onChange={handleChange} type="number" />
        </div>
        <div>
          <label>Category:</label>
          <input name="category" value={data.category} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input name="description" value={data.description} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;