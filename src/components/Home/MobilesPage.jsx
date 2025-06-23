import React, { useEffect, useState } from 'react'
import Cardss from '../../Card/Cardss'
import { mobileData } from '../Data/mobiles'
import { useCart } from "../../components/Context/CartContext";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const MobilesPage = ({ handleClick,productType }) => {
  const [mobileData, setMobileData] = useState([]);
    const { id } = useParams();

  const handleData = () => {
    axios.get('https://flipko-springboot-1.onrender.com/api/mobiles', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setMobileData(res.data);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    handleData(); 
  }, [id, productType]);
       const { addToCart } = useCart();
   const handleAddToCart = async (gadget) => {
  try {
    const item = {
      ...gadget,
      productType: productType.toLowerCase() || gadget.product?.toLowerCase() 
    };
    console.log('Adding to cart from MainCard:', item);
    await addToCart(item);
    handleClick?.();
  } catch (err) {
    console.error('Error adding to cart in MainCard:', err);
  }
};


  return (
    <>
      <div>
        <h1>Mobiles</h1>
      </div>
      <div className='mobiles-grid'>
        {Array.isArray(mobileData) && mobileData.slice(0, 4).map((data, index) => (
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

export default MobilesPage