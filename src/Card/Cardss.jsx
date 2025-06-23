import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_TYPES } from '../PRODUCT_TYPES';

const Cardss = ({ id, name, product, title, description, amount, image, handleClick, mode }) => {
  const handleDelete = async () => {
    try {
      if (!PRODUCT_TYPES.includes(product)) {
        throw new Error(`Invalid product type: ${product}`);
      }
      await axios.delete(`https://flipko-springboot-1.onrender.com/api/${product}/${id}`);
      console.log('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
      console.error(`Failed to delete product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="card-container">
      <Link to={`/${product}/${id}`}>
        <div className="card-img-container">
          <img src={image} alt={title} className="card-img" />
        </div>
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </Link>
      <div className="card-footer">
        <span className="card-price">${amount}</span>
        <button className="card-button" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
      {mode === 'admin' && (
        <div className="card-footer">
          <button className="card-button" onClick={handleDelete}>
            Delete
          </button>
          <Link to={`/editadmin/${product}/${id}`} className="card-button">
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cardss;