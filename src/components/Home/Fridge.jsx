import React, { useEffect } from 'react'
import { fridgeData } from '../Data/fridge'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';
import { useState } from 'react';
import axios from 'axios';

const Fridge = ({handleClick}) => {
  const [fridgeData, setFridgeData] = useState([]);

  const handleData = () => {
    axios.get('https://flipko-springboot-1.onrender.com/api/fridges', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setFridgeData(res.data);
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
  return (
    <>
    <div>
      <h1>Refrigerators</h1>
    </div>
    <div className='mobiles-grid'>
    {Array.isArray(fridgeData) && fridgeData.slice(0,4).map((data,index)=>(
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

export default Fridge