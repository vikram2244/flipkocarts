import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../components/Context/CartContext';
import { useAuth } from '../../components/Context/AuthProvider';
import { PRODUCT_TYPES } from '../../PRODUCT_TYPES';
import MobilesPage from '../../components/Home/MobilesPage';
import Loading from '../../components/Loading/Loading';
const baseUrl = import.meta.env.VITE_API_URL;

const MainCard = ({ handleClick, productType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const productEndpoints = {
    mobiles: '/mobiles',
    acs: '/ac',
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

  const handleData = async () => {
    try {
      setLoading(true);
      if (!PRODUCT_TYPES.includes(productType.toLowerCase())) {
        throw new Error(`Invalid product type: ${productType}`);
      }
      const endpoint = productEndpoints[productType.toLowerCase()];
      console.log('Fetching data for productType:', productType, 'Endpoint:', endpoint);
      if (!endpoint) {
        throw new Error('Invalid product type');
      }
      const res = await axios.get(`${baseUrl}/api${endpoint}`, {
        headers: { Accept: 'application/json' }
      });
      console.log('API Response:', res.data);
      setData(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error('Error fetching data:', err.message, err.response?.data);
      setError(`Failed to fetch product details. Status: ${err.response?.status || 'Unknown'}`);
    } finally {
      setLoading(false);
    }
  };

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

  const findGadget = data.find(item => String(item.id) === String(id));

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!findGadget) {
    return <div>No product found with ID: {id}</div>;
  }

  return (
    <>    <div className="container">
      <div className="card-footer">
        <Link to={`/editadmin/${productType}/${findGadget.id}`}>
          <button>Edit</button>
        </Link>
      </div>
      <div className="img-container">
        <img src={findGadget.image} alt={findGadget.model || 'Product'} />
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
    <div>
      <MobilesPage />
    </div>
    </>

  );
};

export default MainCard;