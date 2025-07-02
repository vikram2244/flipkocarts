import React, { useEffect, useState } from 'react';
import Cardss from '../../Card/Cardss';
import { useCart } from "../../components/Context/CartContext";
import axios from 'axios';
import { useParams } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_URL;


const MobilesPage = ({ handleClick, productType }) => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { addToCart } = useCart();

  const handleData = () => {
    setLoading(true);
    axios.get(`${baseUrl}/api/mobiles`, {
      headers: { Accept: 'application/json' }
    })
    .then(res => {
      setMobiles(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to load mobile data.');
      setLoading(false);
    });
  };

  useEffect(() => {
    handleData(); 
  }, [id, productType]);

  const handleAddToCart = async (gadget) => {
    try {
      const item = {
        ...gadget,
        productType: productType?.toLowerCase() || gadget.product?.toLowerCase()
      };
      console.log('Adding to cart from MainCard:', item);
      await addToCart(item);
      if (handleClick) handleClick();
    } catch (err) {
      console.error('Error adding to cart in MainCard:', err);
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <h1>Mobiles</h1>
      </div>
      <div className='mobiles-grid'>
        {Array.isArray(mobiles) && mobiles.slice(0, 4).map((data, index) => (
          <Cardss
            key={index}
            id={data.id}
            name={data.product}
            title={data.company}
            image={data.image}
            description={data.description}
            amount={data.price}
            product={data.product}
            handleClick={() => handleAddToCart(data)}
          />
        ))}
      </div>
    </>
  );
};

export default MobilesPage;
