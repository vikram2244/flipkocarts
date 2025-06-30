import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Cardss from '../../Card/Cardss';

const BrandPage = () => {
  const { brand } = useParams(); // Get the brand name from the URL
  const { addToCart } = useCart(); // Use addToCart instead of handleAddToCart
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://my-json-api-k70n.onrender.com/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const allProducts = Object.values(data).flat();
        const filteredProducts = allProducts.filter(
          (product) => product.brand?.toLowerCase() === brand?.toLowerCase()
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [brand]);

  // Handle add to cart with proper product mapping
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      brand: product.brand,
      model: product.name || product.title, // Map name or title to model
      price: product.amount, // Map amount to price
      image: product.image || '',
      category: product.product || product.category || 'unknown', // Fallback to 'unknown'
      description: product.description || '',
      productType: product.product || 'mobiles' // Use product field or default to 'mobiles'
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found for {brand}</p>;

  return (
    <div className="brand-page-container">
      <h2>{brand} Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <Cardss
            key={product.id}
            id={product.id}
            name={product.product}
            product={product.product}
            title={product.brand}
            description={product.category}
            amount={product.price}
            image={product.image}
            handleClick={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandPage;