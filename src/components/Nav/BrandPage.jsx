import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; // Import CartContext for handleClick
import Cardss from '../../Card/Cardss';

const BrandPage = () => {
  const { brand } = useParams(); // Get the brand name from the URL
  const { handleAddToCart } = useCart(); // Assuming you have a function to add items to the cart
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://my-json-api-k70n.onrender.com/');
        const data = await response.json();
        const allProducts = Object.values(data).flat();
        const filteredProducts = allProducts.filter(
          (product) => product.brand?.toLowerCase() === brand.toLowerCase()
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [brand]);

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
            name={product.name}
            product={product.product} 
            title={product.title}
            description={product.description}
            amount={product.amount}
            image={product.image}
            handleClick={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandPage;