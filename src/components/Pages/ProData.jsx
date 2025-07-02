import React from 'react'
import { mobileData } from '../Data/proData'
import Cardss from '../../Card/Cardss'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext';
const baseUrl = import.meta.env.VITE_API_URL;


const ProData = ({handleClick}) => {
  const { addToCart } = useCart();
  
    const handleAddToCart = (item) => {
      addToCart(item);
      handleClick(); 
    };
  return (
    <>
    <div>
      <h1>proData</h1>
    </div>
    <div className='mobiles-grid'>
    {mobileData.map((data,index)=>(
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
    )
    )
}
</div>
    </>
  )
}

export default ProData