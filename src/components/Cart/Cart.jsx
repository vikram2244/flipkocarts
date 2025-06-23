import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import { PRODUCT_TYPES } from '../../PRODUCT_TYPES';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely, fetchCartItems, userId } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        console.log('Fetching cart for userId:', userId || 'guest');
        await fetchCartItems(userId || 'guest'); 
        if (cartItems.length === 0) {
          console.log('No cart items found for userId:', userId || 'guest');
        }
      } catch (err) {
        console.error('Error loading cart:', err.message, err.response?.data);
        setError(`Failed to load cart. Status: ${err.response?.status || 'Unknown'}`);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [fetchCartItems, userId]);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        cartItems.map((item) => {
          if (!PRODUCT_TYPES.includes(item.productType)) {
            console.warn('Invalid productType detected:', item.productType);
            return null;
          }
          return (
            <div key={`${item.productId}-${item.productType}`} className="card-container">
              <Link to={`/${item.productType}/${item.productId}`}>
                <div className="card-img-container">
                  <img src={item.image} alt={item.model} className="card-img" />
                </div>
              </Link>
              <div className="card-details">
                <h3 className="card-title">{item.model}</h3>
                <p className="card-description">{item.description}</p>
              </div>
              <div className="card-footer">
                <span className="card-price">₹{item.price}</span>
                <div className="quantity-controls">
                  <button 
                    onClick={() => removeFromCart(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <button
                  onClick={() => removeItemCompletely(item)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cart;