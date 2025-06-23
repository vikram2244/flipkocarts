import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import MobilesPage from './components/Pages/MobilesPage';
import Computers from './components/Pages/Computers';
import Watch from './components/Pages/Watch';
import Men from './components/Pages/Men';
import Woman from './components/Pages/Woman';
import Furniture from './components/Pages/Furniture';
import Kitchen from './components/Pages/Kitchen';
import Fridge from './components/Pages/Fridge';
import Books from './components/Pages/Books';
import Speaker from './components/Pages/Speaker';
import Tv from './components/Pages/Tv';
import Ac from './components/Pages/Ac';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import MainCard from './Card/MainCards/MainCard';
import ComputerCard from './Card/MainCards/ComputerCard';
import WatchCard from './Card/MainCards/WatchCard';
import MensCard from './Card/MainCards/MensCard';
import WomanCard from './Card/MainCards/WomanCard';
import FurnitureCard from './Card/MainCards/FurnitureCard';
import KitchenCard from './Card/MainCards/KitchenCard';
import FridgeCard from './Card/MainCards/FridgeCard';
import BooksCard from './Card/MainCards/BooksCard';
import TvCard from './Card/MainCards/TvCards';
import AcCard from './Card/MainCards/AcCard';
import SpeakersCard from './Card/MainCards/SpeakersCard';
import AdminForm from './AdminCompo/AdminForm';
import SignUp from './Register/SignUpPage/SignUp';
import LogIn from './Register/SignInPage/SignIn';
import AdminLogin from './Register/AdminSignIn/SiginIn';
import AdminSignUp from './Register/AdminSignUp/SignUp';
import EditAdmin from './AdminCompo/EditAdmin';

function App() {
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = () => {
    setValue(value + 1);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Nav handleLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />
        <Route path="/adminlogin" element={<AdminLogin handleLogin={handleLogin} />} />
        <Route path="/adminsignup" element={<AdminSignUp />} />
        <Route path="/" element={<Home handleClick={handleClick} />} />
        <Route path="/:email" element={<Home handleClick={handleClick} />} />
        <Route path="/mobiles" element={<MobilesPage handleClick={handleClick} productType="mobiles" />} />
        <Route path="/computers" element={<Computers handleClick={handleClick} productType="computers" />} />
        <Route path="/watches" element={<Watch handleClick={handleClick} productType="watches" />} />
        <Route path="/men" element={<Men handleClick={handleClick} productType="men" />} />
        <Route path="/women" element={<Woman handleClick={handleClick} productType="women" />} />
        <Route path="/furniture" element={<Furniture handleClick={handleClick} productType="furniture" />} />
        <Route path="/kitchen" element={<Kitchen handleClick={handleClick} productType="kitchen" />} />
        <Route path="/fridges" element={<Furniture handleClick={handleClick} productType="fridges" />} />
        <Route path="/books" element={<Books handleClick={handleClick} productType="books" />} />
        <Route path="/speakers" element={<Speaker handleClick={handleClick} productType="speakers" />} />
        <Route path="/tvs" element={<Tv handleClick={handleClick} productType="tvs" />} />
        <Route path="/ac" element={<Ac handleClick={handleClick} productType="ac" />} />
        <Route path="/cart" element={<Cart handleClick={handleClick} />} />
        <Route path="/mobiles/:id" element={<MainCard productType="mobiles" handleClick={handleClick} />} />
        <Route path="/computers/:id" element={<ComputerCard productType="computers" handleClick={handleClick} />} />
        <Route path="/watches/:id" element={<WatchCard productType="watches" handleClick={handleClick} />} />
        <Route path="/men/:id" element={<MensCard productType="men" handleClick={handleClick} />} />
        <Route path="/women/:id" element={<WomanCard productType="women" handleClick={handleClick} />} />
        <Route path="/furniture/:id" element={<FurnitureCard productType="furniture" handleClick={handleClick} />} />
        <Route path="/kitchen/:id" element={<KitchenCard productType="kitchen" handleClick={handleClick} />} />
        <Route path="/fridges/:id" element={<FridgeCard productType="fridges" handleClick={handleClick} />} />
        <Route path="/books/:id" element={<BooksCard productType="books" handleClick={handleClick} />} />
        <Route path="/speakers/:id" element={<SpeakersCard productType="speakers" handleClick={handleClick} />} />
        <Route path="/tvs/:id" element={<TvCard productType="tvs" handleClick={handleClick} />} />
        <Route path="/ac/:id" element={<AcCard productType="ac" handleClick={handleClick} />} />
        <Route path="/adminMobile" element={<AdminForm names="mobiles" />} />
        <Route path="/admincomputer" element={<AdminForm names="computers" />} />
        <Route path="/adminwatches" element={<AdminForm names="watches" />} />
        <Route path="/adminmen" element={<AdminForm names="men" />} />
        <Route path="/adminwomen" element={<AdminForm names="women" />} />
        <Route path="/adminfurniture" element={<AdminForm names="furniture" />} />
        <Route path="/adminkitchen" element={<AdminForm names="kitchen" />} />
        <Route path="/adminfridges" element={<AdminForm names="fridges" />} />
        <Route path="/adminbooks" element={<AdminForm names="books" />} />
        <Route path="/adminspeakers" element={<AdminForm names="speakers" />} />
        <Route path="/admintvs" element={<AdminForm names="tvs" />} />
        <Route path="/adminac" element={<AdminForm names="ac" />} />
        <Route path="/editadmin/:names/:id" element={<EditAdmin />} />
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;