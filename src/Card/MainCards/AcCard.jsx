import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
const baseUrl = import.meta.env.VITE_API_URL;

const AcCard = ({ handleClick, productType }) => {
  const [acData, setAcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();

  const handleData = async () => {
  try {
    setLoading(true);
    setError(null); // Reset error on new fetch
    const res = await axios.get(`${baseUrl}/api/ac`, {
      headers: {
        Accept: 'application/json',
      },
    });
    
    // More robust data validation
    const data = res.data?.data || res.data || [];
    setAcData(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('Error fetching data:', err);
    setError(err.response?.data?.message || 'Failed to fetch AC data');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    handleData();
  }, [id, productType]);

  const handleAddToCart = async (gadget) => {
    try {
      const item = {
        ...gadget,
        productType: productType?.toLowerCase() || gadget.product?.toLowerCase(),
      };
      console.log('Adding to cart from AcCard:', item);
      await addToCart(item);
      handleClick?.();
    } catch (err) {
      console.error('Error adding to cart in AcCard:', err);
    }
  };

  const findGadget = acData.find(item => String(item.id) === String(id));

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!findGadget) return <div>No AC found with ID: {id}</div>;

  return (
    <div className="container">
      <div className="card-footer">
        <Link to={`/editadmin/${findGadget.product}/${findGadget.id}`}>
          <button>Edit</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={findGadget.image} alt={findGadget.model || 'AC'} />
      </div>
      <div className="mbl-brand">{findGadget.brand}</div>
      <div className="mbl-model">{findGadget.model}</div>
      <div className="mbl-price">{findGadget.price}</div>
      <div className="mbl-desc">{findGadget.category}</div>
      <div className="mbl-desc">{findGadget.description}</div>
      <div>
        <button onClick={() => handleAddToCart(findGadget)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AcCard;
