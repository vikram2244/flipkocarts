import React, { useEffect, useState } from 'react'
import { tvData } from '../Data/tv'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';
import axios from 'axios';
const Tv = ({handleClick}) => {
  const [tvData, setTvData] = useState([]);

  const handleData = () => {
    axios.get('https://flipko-springboot-1.onrender.com/api/tvs', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setTvData(Array.isArray(res.data) ? res.data : res.data.data || []);
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
      <h1>Tv's</h1>
    </div>
    <div className='mobiles-grid'>
    {Array.isArray(tvData) && tvData.slice(0,4).map((data,index)=>(
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

export default Tv