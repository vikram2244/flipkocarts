import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MobilesPage from './MobilesPage';
import Computers from './Computers';
import Fridge from './Fridge';
import Furniture from './Furniture';
import Men from './Men';
import Woman from './Woman';
import Speaker from './Speaker';
import Tv from './Tv';
import Watch from './Watch';
// import ProData from './ProData';
import Books from './Books';
import Kitchen from './Kitchen';
import Ac from './Ac';
import Loading from '../Loading/Loading';

const Home = ({ handleClick }) => {
  const [loading, setLoading] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1>Welcome to FlipKOO, {email ? decodeURIComponent(email) : 'Guest'}!</h1>
      <div><MobilesPage handleClick={handleClick} productType="mobiles" /></div>
      <div><Computers handleClick={handleClick} productType="computers" /></div>
      <div><Fridge handleClick={handleClick} productType="fridges" /></div>
      <div><Furniture handleClick={handleClick} productType="furniture" /></div>
      <div><Men handleClick={handleClick} productType="men" /></div>
      <div><Woman handleClick={handleClick} productType="women" /></div>
      <div><Speaker handleClick={handleClick} productType="speakers" /></div>
      <div><Tv handleClick={handleClick} productType="tvs" /></div>
      <div><Watch handleClick={handleClick} productType="watches" /></div>
      {/* <div><ProData handleClick={handleClick} /></div> */}
      <div><Books handleClick={handleClick} productType="books" /></div>
      <div><Kitchen handleClick={handleClick} productType="kitchen" /></div>
      <div><Ac handleClick={handleClick} productType="ac" /></div>
    </>
  );
};

export default Home;
