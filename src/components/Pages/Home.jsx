import React from 'react';
import MobilesPage from './MobilesPage';
import Computers from './Computers';
import Fridge from './Fridge';
import Furniture from './Furniture';
import Men from './Men';
import Woman from './Woman';
import Speaker from './Speaker';
import Tv from './Tv';
import Watch from './Watch';1
import ProData from './ProData';
import Books from './Books';
import Kitchen from './Kitchen';
import Ac from './Ac';

const Home = () => {
  return (
    <>
    <div><MobilesPage /></div>
    <div><Computers /></div>
    <div><Fridge /></div>
    <div><Furniture/></div>
    <div><Men /></div>
    <div><Woman /></div>
    <div><Speaker /></div>
    <div><Tv /></div>
    <div><Watch /></div>
    <div><ProData /></div>
    <div><Books /></div>
    <div><Kitchen /></div>
    <div><Ac /></div>
    </>
  );
};

export default Home;