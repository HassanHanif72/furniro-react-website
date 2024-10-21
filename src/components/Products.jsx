import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Productvip component
function Productvip() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Adjust this to show more or fewer products per page

  // Fetch data from the dummy JSON API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading indicator while fetching
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  // Function to truncate the description
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (indexOfLastProduct < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map((product, index) => (
          <Link
            to={`/product/${product.id}`}
            key={index}
            className="border p-5 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-56 object-cover rounded-md mb-5"
            />
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {truncateText(product.description, 100)} {/* Limit description to 100 characters */}
            </p>
            <p className="text-red-500 font-bold text-lg mb-2">
              ${product.price}
            </p>
            {product.rating && (
              <p className="text-yellow-500 font-medium">
                ⭐ {product.rating.rate} / 5
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{backgroundColor : "#b88e2f"}}
          className="mr-4 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= products.length}
          className=" hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          style={{backgroundColor : "#b88e2f"}}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Productvip;
