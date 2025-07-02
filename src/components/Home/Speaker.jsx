import React, { useEffect, useState } from 'react'
import { speakerData } from '../Data/speaker'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_URL;

const Speaker = ({handleClick}) => {
  const [speakerData, setSpeakerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleData = () => {
    setLoading(true);
    axios.get(`${baseUrl}/api/speakers`, {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setSpeakerData(Array.isArray(res.data) ? res.data : res.data.data || []);
      setLoading(false);
    })
    .catch(err => console.log(err));
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
      <h1>Speaker's</h1>
    </div>
    <div className='mobiles-grid'>
    {Array.isArray(speakerData) && speakerData.slice(0,4).map((data,index)=>(
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

export default Speaker