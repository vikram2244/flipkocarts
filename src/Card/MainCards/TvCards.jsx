import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import axios from 'axios';
import { PRODUCT_TYPES } from '../../PRODUCT_TYPES';

const TvCards = ({ handleClick, productType }) => {
  const [acData, setAcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();

 const handleData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://flipko-springboot-1.onrender.com/api/tvs', {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('API Response:', res.data);
      setAcData(Array.isArray(res.data) ? res.data : res.data.data || []);
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
          productType: productType.toLowerCase() || gadget.product?.toLowerCase() // Prefer prop, fallback to product
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

  const findGadget = acData.find(item => String(item.id) === String(id));

  if (loading) {
    return <div>Loading TV details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!findGadget) {
    return <div>No TV found with ID: {id}</div>;
  }

  return (
    <div className="container">
      <div className="card-footer">
        <Link to={`/editadmin/${findGadget.product}/${findGadget.id}`}>
          <button>Edit</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={`/${findGadget.image}`} alt={findGadget.model || 'TV'} />
      </div>
      <div className="mbl-brand">{findGadget.brand}</div>
      <div className="mbl-model">{findGadget.model}</div>
      <div className="mbl-price">{findGadget.price}</div>
      <div className="mbl-desc">{findGadget.description}</div>
      <div className="mbl-desc">{findGadget.category}</div>
      <div>
        <button onClick={() => handleAddToCart(findGadget)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default TvCards;