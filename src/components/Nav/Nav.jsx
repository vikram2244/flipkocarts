import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Nav = ({ handleLogout }) => {
  const { totalItems, userId, setUserId, userEmail, setUserEmail } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://my-json-api-k70n.onrender.com/');
        const data = await response.json();
        const allProducts = Object.values(data).flat();
        setProducts(allProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const uniqueBrands = [...new Set(products
    .filter(product => product.brand)
    .map(product => product.brand))];
  const filteredBrands = uniqueBrands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
        <div>
          <div className="search-input">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search brands (e.g., LG, Apple, Nike)..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="brand-grid">
              {searchTerm && filteredBrands.length > 0 ? (
                filteredBrands.map((brand, index) => (
                  <Link to={`/brand/${encodeURIComponent(brand)}`} key={index} className="brand-card">
                    {brand}
                  </Link>

                ))
              ) : (
                searchTerm && !loading && <p className="no-results">No brands found</p>
              )}
            </div>
          </div>
        </div>
        <div className="cart-section">
          {userId ? (
            <button onClick={onLogout} className="cart-link">
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="cart-link">
              Sign In
            </Link>
          )}
          <Link to="/cart" className="ins">
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