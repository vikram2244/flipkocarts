import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { PRODUCT_TYPES } from '../../../src/PRODUCT_TYPES';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const { user } = useAuth();

  const fetchCartItems = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching cart items for userId:', userId);
      const response = await axios.get(`https://flipko-springboot-1.onrender.com/api/user/${userId}`, {
        headers: { Accept: 'application/json' }
      });
      setCartItems(response.data || []);
      console.log('Cart items fetched:', response.data.length);
    } catch (err) {
      console.error('Error fetching cart items:', err.message, err.response?.data);
      setError(`Failed to load cart items. Status: ${err.response?.status || 'Unknown'}`);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('CartContext userId changed to:', userId);
    if (userId) {
      localStorage.setItem('userId', userId);
      fetchCartItems(userId);
    } else {
      localStorage.removeItem('userId');
    }
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userId, userEmail, fetchCartItems]);

  const addToCart = useCallback(async (item) => {
    try {
      setLoading(true);
      setError(null);
      const apiUserId = userId || 'guest';
      const productType = item.productType || 'mobiles';
      if (!PRODUCT_TYPES.includes(productType)) {
        throw new Error(`Invalid product type: ${productType}`);
      }
      console.log('Adding to cart:', { userId: apiUserId, productId: item.id, productType });
      const response = await axios.post('http://localhost:8080/api/add', { 
        brand: item.brand,
        model: item.model,
        price: Number(item.price),
        image: item.image || '',
        category: item.category,
        description: item.description || ''
      }, {
        params: {
          userId: apiUserId,
          productId: item.id,
          productType
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Added to cart:', response.data);
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (cartItem) => cartItem.productId === item.id && cartItem.productType === productType
        );
        if (existingItem) {
          return prevItems.map((cartItem) =>
            cartItem.productId === item.id && cartItem.productType === productType
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          return [
            ...prevItems,
            {
              ...response.data,
              productId: item.id,
              productType,
              quantity: 1
            }
          ];
        }
      });
    } catch (err) {
      console.error('Error adding to cart:', err.message, err.response?.data);
      setError(`Failed to add item to cart. Status: ${err.response?.status || 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const removeFromCart = useCallback(async (item) => {
    try {
      setLoading(true);
      setError(null);
      const apiUserId = userId || 'guest';
      if (!PRODUCT_TYPES.includes(item.productType)) {
        throw new Error(`Invalid product type: ${item.productType}`);
      }
      console.log('Removing from cart:', { userId: apiUserId, productId: item.productId, productType: item.productType });
      await axios.post('http://localhost:8080/api/cart/update', {
        userId: apiUserId,
        productId: item.productId,
        productType: item.productType,
        quantity: item.quantity - 1
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (cartItem) => cartItem.productId === item.productId && cartItem.productType === item.productType
        );
        if (existingItem.quantity > 1) {
          return prevItems.map((cartItem) =>
            cartItem.productId === item.productId && cartItem.productType === item.productType
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        } else {
          return prevItems.filter(
            (cartItem) => cartItem.productId !== item.productId || cartItem.productType !== item.productType
          );
        }
      });
    } catch (err) {
      console.error('Error removing from cart:', err.message, err.response?.data);
      setError(`Failed to update cart. Status: ${err.response?.status || 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const removeItemCompletely = useCallback(async (item) => {
    try {
      setLoading(true);
      setError(null);
      const apiUserId = userId || 'guest';
      if (!PRODUCT_TYPES.includes(item.productType)) {
        throw new Error(`Invalid product type: ${item.productType}`);
      }
      console.log('Removing item completely:', { userId: apiUserId, productId: item.productId, productType: item.productType });
      await axios.delete(`http://localhost:8080/api/cart/remove?userId=${apiUserId}&productId=${item.productId}&productType=${item.productType}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      setCartItems((prevItems) =>
        prevItems.filter(
          (cartItem) => cartItem.productId !== item.productId || cartItem.productType !== item.productType
        )
      );
      console.log('Item removed completely');
    } catch (err) {
      console.error('Error removing item:', err.message, err.response?.data);
      setError(`Failed to remove item from cart. Status: ${err.response?.status || 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        fetchCartItems,
        totalItems,
        loading,
        error,
        userId,
        setUserId,
        userEmail,
        setUserEmail
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};