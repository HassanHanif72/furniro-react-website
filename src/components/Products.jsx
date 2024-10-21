import React, { useState, useEffect } from 'react';
import { Spin } from "antd";
import { Link } from "react-router-dom";

// Filter Component
function Filter({ showCount, setShowCount, sortOption, setSortOption }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f9f3eb] p-4 space-y-4 sm:space-y-0">
      {/* Left Section (Filter + View Options + Results Count) */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto justify-between">
        <button className="flex items-center text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7.414 7.414a1 1 0 00-.293.707v3.172a1 1 0 01-1.707.707l-2.828-2.828a1 1 0 01-.293-.707V12.12a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="ml-1">Filter</span>
        </button>

        <span className="text-gray-600">Showing 1-{showCount} results</span>
      </div>

      {/* Right Section (Show Count + Sort Option) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Show</span>
          <input
            type="number"
            className="w-12 p-1 text-center border"
            value={showCount}
            onChange={(e) => setShowCount(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Sort by</span>
          <select
            className="p-1 border"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Productvip Component
function Productvip() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCount, setShowCount] = useState(8); // Show count is managed here
  const [sortOption, setSortOption] = useState('Default'); // Sort option

  const productsPerPage = showCount; // Show more products per page based on user input

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

  // Sort products based on sortOption
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'Price: Low to High') return a.price - b.price;
    if (sortOption === 'Price: High to Low') return b.price - a.price;
    return products;
  });

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
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (indexOfLastProduct < sortedProducts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
    <Filter showCount={showCount} setShowCount={setShowCount} sortOption={sortOption} setSortOption={setSortOption} />
    <div className="container mx-auto px-4 py-10">
      {/* Include the Filter Component */}
      

      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Products</h1>
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
          style={{ backgroundColor: "#b88e2f" }}
          className="mr-4 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= products.length}
          className="hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          style={{ backgroundColor: "#b88e2f" }}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default Productvip;
