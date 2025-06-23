import React, { useEffect, useState } from 'react'
import { acData } from '../Data/ac'
import Cardss from '../../Card/Cardss'
import { useCart } from '../Context/CartContext';
import axios from 'axios';
const Ac = ({handleClick}) => {
  const [acData, setAcData] = useState([]);

  const handleData = () => {
    axios.get('https://flipko-springboot-1.onrender.com/api/ac', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setAcData(res.data);
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
      <h1>Ac's</h1>
    </div>
    <div className='mobiles-grid'>
    {Array.isArray(acData) && acData.slice(0,4).map((data,index)=>(
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

export default Ac