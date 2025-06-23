import axios from 'axios';
import React, { useState } from 'react';

const AdminForm = ({ names }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const formData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://flipko-springboot-1.onrender.com/api/adminedit/${names}`, data);
      alert("Tool added successfully!");
      setData({
        id: '',
        product: '',
        image: '',
        brand: '',
        model: '',
        price: '',
        category: '',
        description: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add tool.");
    }
  };

  return (
    <div className="admin-container">
      <div>Add New {names.slice(0, 1).toUpperCase() + names.slice(1)}</div>
      <h1>Admin</h1>
      <form onSubmit={formData}>
        <div><label>id :</label><input name="id" value={data.id} onChange={handleChange} /></div>
        <div><label>product:</label><input name="product" value={names} onChange={handleChange} /></div>
        <div><label>image:</label><input name="image" value={data.image} onChange={handleChange} /></div>
        <div><label>brand:</label><input name="brand" value={data.brand} onChange={handleChange} /></div>
        <div><label>model:</label><input name="model" value={data.model} onChange={handleChange} /></div>
        <div><label>price:</label><input name="price" value={data.price} onChange={handleChange} /></div>
        <div><label>category:</label><input name="category" value={data.category} onChange={handleChange} /></div>
        <div><label>description:</label><input name="description" value={data.description} onChange={handleChange} /></div>
        <div><button type="submit">Submit</button></div>
      </form>
    </div>
  );
};

export default AdminForm;
