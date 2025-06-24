import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Nav = ({ handleLogout }) => {
  const { totalItems, userId, setUserId, userEmail, setUserEmail } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false); // Consistent naming
  const navigate = useNavigate();

  // Fetch products when search query changes (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        fetch(`https://my-json-api-k70n.onrender.com/products?name=${encodeURIComponent(searchQuery)}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            return response.json();
          })
          .then((data) => {
            setSearchResults(data.slice(0, 5)); // Limit to 5 results
            setIsSearching(false);
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
            setSearchResults([]);
            setIsSearching(false);
          });
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce); // Proper cleanup
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchResults([]); // Clear suggestions
    }
  };

  const onLogout = () => {
    setUserId(null); // Use null for consistency
    setUserEmail(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    handleLogout();
  };

  return (
    <nav className="nav-container bg-white shadow-md px-4 py-3">
      <div className="logo-section flex items-center justify-between max-w-7xl mx-auto">
        <Link to={userEmail ? `/${encodeURIComponent(userEmail)}` : '/home'}>
          <h1 className="logo text-2xl font-bold text-gray-800">FlipKOO</h1>
        </Link>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-10 rounded-full border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              disabled={isSearching}
            >
              {isSearching ? '🔄' : '🔍'}
            </button>
            {searchResults.length > 0 && (
              <div className="absolute z-20 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </form>
          {/* Cart and Auth Links */}
          <div className="cart-section">
            {userId ? (
              <button onClick={onLogout} className="cart-link text-gray-600 hover:text-blue-600">
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="cart-link text-blue-600 hover:underline">
                Sign In
              </Link>
            )}
          </div>
          <div className="cart-section">
            <Link to="/cart" className="cart-link text-gray-600 hover:text-blue-600">
              🛒 ({totalItems})
            </Link>
          </div>
        </div>
      </div>
      {/* Navigation Links */}
      <div className="nav-items flex justify-center gap-4 mt-2 flex-wrap">
        <Link to="/mobiles"><p className="nav-item text-gray-600 hover:text-blue-600">Mobiles</p></Link>
        <Link to="/computers"><p className="nav-item text-gray-600 hover:text-blue-600">Computers</p></Link>
        <Link to="/watches"><p className="nav-item text-gray-600 hover:text-blue-600">Watches</p></Link>
        <Link to="/men"><p className="nav-item text-gray-600 hover:text-blue-600">Mens Wear</p></Link>
        <Link to="/women"><p className="nav-item text-gray-600 hover:text-blue-600">Woman Wear</p></Link>
        <Link to="/furniture"><p className="nav-item text-gray-600 hover:text-blue-600">Furniture</p></Link>
        <Link to="/kitchen"><p className="nav-item text-gray-600 hover:text-blue-600">Kitchen</p></Link>
        <Link to="/fridges"><p className="nav-item text-gray-600 hover:text-blue-600">Fridge</p></Link>
        <Link to="/books"><p className="nav-item text-gray-600 hover:text-blue-600">Books</p></Link>
        <Link to="/speakers"><p className="nav-item text-gray-600 hover:text-blue-600">Speakers</p></Link>
        <Link to="/tvs"><p className="nav-item text-gray-600 hover:text-blue-600">Tv's</p></Link>
        <Link to="/ac"><p className="nav-item text-gray-600 hover:text-blue-600">A/C</p></Link>
      </div>
    </nav>
  );
};

export default Nav;