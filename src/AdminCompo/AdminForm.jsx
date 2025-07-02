import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_URL;

const AdminForm = ({ names }) => {
  const [data, setData] = useState({
    id: '',
    product: names,
    image: '',
    brand: '',
    model: '',
    price: '',
    category: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "product") return; // prevent editing product
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const formData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/adminedit/${names}`, data);
      alert("Tool added successfully!");
      setData({
        id: '',
        product: names,
        image: '',
        brand: '',
        model: '',
        price: '',
        category: '',
        description: ''
      });
      navigate(`/${names}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add tool.");
    }
  };

  return (
    <div className="admin-container">
      <div>Add New {names.charAt(0).toUpperCase() + names.slice(1)}</div>
      <h1>Admin Panel</h1>
      <form onSubmit={formData}>
        <div>
          <label>ID:</label>
          <input type="number" name="id" value={data.id} onChange={handleChange} required />
        </div>
        <div>
          <label>Product:</label>
          <input name="product" value={data.product} disabled />
        </div>
        <div>
          <label>Image URL:</label>
          <input name="image" value={data.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Brand:</label>
          <input name="brand" value={data.brand} onChange={handleChange} required />
        </div>
        <div>
          <label>Model:</label>
          <input name="model" value={data.model} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={data.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <input name="category" value={data.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input name="description" value={data.description} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
