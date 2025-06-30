import React, { useEffect, useState, useMemo } from 'react';
import Cardss from '../../Card/Cardss';
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Ac = ({ handleClick, productType }) => {
  const [acData, setAcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { addToCart } = useCart();

  // Fetch data from API
  const handleData = () => {
    setLoading(true);
    axios
      .get('https://flipko-springboot-1.onrender.com/api/ac', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        setAcData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Error fetching product data.');
        setLoading(false);
      });
  };

  useEffect(() => {
    handleData();
  }, [id, productType]);

  // Filter data based on productType using useMemo
  const filteredData = useMemo(() => {
    if (!productType) return acData;
    return acData.filter(
      (item) =>
        item.product &&
        item.product.toLowerCase() === productType.toLowerCase()
    );
  }, [acData, productType]);

  // Add to cart handler
  const handleAddToCart = async (gadget) => {
    try {
      const item = {
        ...gadget,
        productType: productType
          ? productType.toLowerCase()
          : gadget.product?.toLowerCase(),
      };
      console.log('Adding to cart from MainCard:', item);
      await addToCart(item);
      handleClick?.();
    } catch (err) {
      console.error('Error adding to cart in MainCard:', err);
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <h1>AC'S</h1>
      </div>
      <div>
        <button>
          <Link to="/adminac">New Tool</Link>
        </button>
      </div>
      <div className="mobiles-grid">
        {filteredData.map((data, index) => (
          <Cardss
            key={index}
            id={data.id}
            name={data.product}
            title={data.brand}
            image={data.image}
            description={data.category}
            amount={data.price}
            product={data.product}
            handleClick={() => handleAddToCart(data)}
          />
        ))}
      </div>
    </>
  );
};

export default Ac;
