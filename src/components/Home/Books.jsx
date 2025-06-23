import React from 'react'
import { booksData } from '../Data/books'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const Books = ({handleClick}) => {
   const [booksData, setBooksData] = useState([]);

  const handleData = () => {
    axios.get('https://flipko-springboot-1.onrender.com/api/books', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setBooksData(res.data);
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
      <h1>Books</h1>
    </div>
    <div className='mobiles-grid'>
    {Array.isArray(booksData) && booksData.slice(0,4).map((data,index)=>(
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

export default Books