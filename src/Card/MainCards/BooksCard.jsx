import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import axios from 'axios';
// import { PRODUCT_TYPES } from '../../PRODUCT_TYPES';

const BooksCard = ({ handleClick, productType }) => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
const handleData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://flipko-springboot-1.onrender.com/api/books', {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('API Response:', res.data);
      setBookData(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch computer data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleData();
  }, [id]);
  const handleAddToCart = async (gadget) => {
      try {
        const item = {
          ...gadget,
          productType: productType.toLowerCase() || gadget.product?.toLowerCase()
        };
        console.log('Adding to cart from MainCard:', item);
        await addToCart(item);
        handleClick?.();
      } catch (err) {
        console.error('Error adding to cart in MainCard:', err);
      }
    };
      useEffect(() => {
        handleData();
      }, [id, productType]);

  const findGadget = bookData.find(item => String(item.id) === String(id));

  if (loading) {
    return <div>Loading book details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!findGadget) {
    return <div>No book found with ID: {id}</div>;
  }

  return (
    <div className="container">
      <div className="card-footer">
        <Link to={`/editadmin/${findGadget.product}/${findGadget.id}`}>
          <button>Edit</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={`/${findGadget.image}`} alt={findGadget.title || 'Book'} />
      </div>
      <div className="book-title">{findGadget.title}</div>
      <div className="book-author">{findGadget.author}</div>
      <div className="book-category">{findGadget.category}</div>
      <div className="book-price">${findGadget.price}</div>
      <div className="book-desc">{findGadget.description}</div>
      <div>
        <button onClick={() => handleAddToCart(findGadget)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BooksCard;