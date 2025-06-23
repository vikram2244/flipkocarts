import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Nav = ({ handleLogout }) => {
  const { totalItems, userId, setUserId, userEmail, setUserEmail } = useCart();

  const onLogout = () => {
    setUserId(null);
    setUserEmail(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    handleLogout();
  };

  return (
    <nav className="nav-container">
      <div className="logo-section">
        <Link to={userEmail ? `/${encodeURIComponent(userEmail)}` : '/home'}>
          <h1 className="logo">FlipKOO</h1>
        </Link>
        <div className="cart-section">
          {userId ? (
            <button onClick={onLogout} className="cart-link">
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="cart-link in">
              Sign In
            </Link>
          )}
        </div>
        <div className="cart-section">
          <Link to="/cart" className="cart-link">
            🛒 ({totalItems})
          </Link>
        </div>
      </div>
      <div className="nav-items">
        <Link to="/mobiles"><p className="nav-item">Mobiles</p></Link>
        <Link to="/computers"><p className="nav-item">Computers</p></Link>
        <Link to="/watches"><p className="nav-item">Watches</p></Link>
        <Link to="/men"><p className="nav-item">Mens Wear</p></Link>
        <Link to="/women"><p className="nav-item">Woman Wear</p></Link>
        <Link to="/furniture"><p className="nav-item">Furniture</p></Link>
        <Link to="/kitchen"><p className="nav-item">Kitchen</p></Link>
        <Link to="/fridges"><p className="nav-item">Fridge</p></Link>
        <Link to="/books"><p className="nav-item">Books</p></Link>
        <Link to="/speakers"><p className="nav-item">Speakers</p></Link>
        <Link to="/tvs"><p className="nav-item">Tv's</p></Link>
        <Link to="/ac"><p className="nav-item">A/C</p></Link>
      </div>
    </nav>
  );
};

export default Nav;