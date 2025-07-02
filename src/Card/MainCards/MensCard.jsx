import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import axios from 'axios';
import Men from '../../components/Home/Men';
import Loading from '../../components/Loading/Loading';
const baseUrl = import.meta.env.VITE_API_URL;

const MensCard = ({ handleClick, productType }) => {
  const [acData, setAcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const handleData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/men`, {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('API Response:', res.data);
      setAcData(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch mens data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleData();
  }, [id,productType]);
  const handleAddToCart = async (gadget) => {
      try {
        const item = {
          ...gadget,
          productType: productType.toLowerCase() || gadget.product?.toLowerCase() 
        };
        console.log('Adding to cart from mens:', item);
        await addToCart(item);
        handleClick?.();
      } catch (err) {
        console.error('Error adding to cart in mens :', err);
      }
    };

  const findGadget = acData.find(item => String(item.id) === String(id));

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!findGadget) {
    return <div>No men's product found with ID: {id}</div>;
  }

  return (
    <>    <div className="container">
      <div className="card-footer">
        <Link to={`/editadmin/${findGadget.product}/${findGadget.id}`}>
          <button>Edit</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={findGadget.image} alt={findGadget.model || 'Men\'s Product'} />
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
    <div><Men /></div>
    </>

  );
};

export default MensCard;