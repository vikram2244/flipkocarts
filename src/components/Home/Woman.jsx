import React, { useEffect, useState } from 'react'
import { womanData } from '../Data/woman'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

const Woman = ({handleClick}) => {
  const [womanData, setWomanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleData = () => {
    setLoading(true);
    axios.get(`${baseUrl}/api/women`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setWomanData(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setError('Failed to fetch data');
      setLoading(false);
    });
  };

  useEffect(() => {
    handleData(); 
  }, []);
  const { addToCart } = useCart();
           
             const handleAddToCart = (item) => {
               addToCart(item);
               handleClick(); 
             };
  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
     <div>
      <h1>Woman's Wear</h1>
    </div>
    <div className='mobiles-grid'>
    {Array.isArray(womanData) && womanData.slice(0,4).map((data,index)=>(
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
    )
    )
}
</div>
    </>
  )
}

export default Woman