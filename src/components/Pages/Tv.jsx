import React, { useEffect, useState } from 'react';
import Cardss from '../../Card/Cardss';
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
const baseUrl = import.meta.env.VITE_API_URL;

const Tv = ({ handleClick, productType }) => {
  const [tvData, setTvData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  const { id } = useParams();

  const handleData = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/tvs`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        setTvData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleData();
  }, [id, productType]);

  const { addToCart } = useCart();
  const handleAddToCart = async (gadget) => {
    try {
      const item = {
        ...gadget,
        productType: (productType ? productType.toLowerCase() : gadget.product?.toLowerCase())
      };
      console.log('Adding to cart from MainCard:', item);
      await addToCart(item);
      handleClick?.();
    } catch (err) {
      console.error('Error adding to cart in MainCard:', err);
    }
  };
  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <h1>TV'S</h1>
      </div>
      <div>
        <button>
          <Link to="/admintvs">New Tool</Link>
        </button>
      </div>
      <div className="mobiles-grid">
        {tvData.map((data, index) => (
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

export default Tv;