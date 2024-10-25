import React, { useState, useEffect } from 'react';
import { Spin } from "antd";
import { Link } from "react-router-dom";

// Sample furniture data (20 products)
const sampleProducts = [
  {
    id: 1,
    title: "Elegant Wooden Chair",
    price: 120.99,
    description: "A beautiful wooden chair with a modern design.",
    image: "https://woodsala.com/cdn/shop/files/Z7A9243.jpg?v=1689680042&width=4000",
    rating: { rate: 4.2 }
  },
  {
    id: 2,
    title: "Classic Sofa",
    price: 350.49,
    description: "A comfortable sofa with elegant fabric.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTA1Ch36jazJ1zm-P9u_XNqfVXSpYls3UqLw&s",
    rating: { rate: 4.5 }
  },
  {
    id: 3,
    title: "Vintage Coffee Table",
    price: 199.99,
    description: "A wooden coffee table with a vintage finish.",
    image: "https://media.istockphoto.com/id/508702767/photo/round-coffee-table.jpg?s=612x612&w=0&k=20&c=KSnqxVKG1OMmBuWw8gx4FeRlEa7-8RAN8k7kM3TmeTM=",
    rating: { rate: 4.3 }
  },
  {
    id: 4,
    title: "Stylish Desk",
    price: 189.99,
    description: "A sleek, modern desk perfect for workspaces.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUpvgUz8SUGP3FlvtrhsTAPIwCqccaeW1Znw&s",
    rating: { rate: 4.7 }
  },
  {
    id: 5,
    title: "Rustic Dining Table",
    price: 599.49,
    description: "A large dining table with a rustic look.",
    image: "https://i.pinimg.com/736x/89/e3/17/89e31726976643410056b57745dec873.jpg",
    rating: { rate: 4.8 }
  },
  {
    id: 6,
    title: "Comfy Armchair",
    price: 225.99,
    description: "A cozy armchair with plush seating.",
    image: "https://img.freepik.com/premium-photo/comfortable-arm-chair-isolated-white-background_849973-121.jpg",
    rating: { rate: 4.6 }
  },
  {
    id: 7,
    title: "Minimalist Bookshelf",
    price: 99.99,
    description: "A tall, minimalist bookshelf.",
    image: "https://img.freepik.com/premium-photo/modern-bookshelf-with-open-shelves-minimalist-design-isolated-white-background_220770-59936.jpg",
    rating: { rate: 4.4 }
  },
  {
    id: 8,
    title: "Modern TV Stand",
    price: 149.99,
    description: "A modern TV stand with storage space.",
    image: "https://www.shutterstock.com/image-photo/modern-tv-table-isolated-on-260nw-2302340743.jpg",
    rating: { rate: 4.5 }
  },
  {
    id: 9,
    title: "Outdoor Patio Set",
    price: 499.99,
    description: "A set of outdoor furniture for patios.",
    image: "https://www.shutterstock.com/image-photo/set-wicker-rattan-furniture-garden-260nw-2184093107.jpg",
    rating: { rate: 4.7 }
  },
  {
    id: 10,
    title: "Comfortable Recliner",
    price: 299.99,
    description: "A recliner that offers maximum comfort.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS91365ut-BEuUy6m1PZTbdG5NgNVNz9fVnKg&s",
    rating: { rate: 4.6 }
  },
  {
    id: 11,
    title: "Office Chair",
    price: 85.99,
    description: "An ergonomic chair for office use.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3pEOQs4WV7SYzCt5CaalBhJWyNIUT-f0BIw&s",
    rating: { rate: 4.4 }
  },
  {
    id: 12,
    title: "Bed Frame",
    price: 299.99,
    description: "A sturdy bed frame with a stylish design.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSxstWLSb_UWfmJI-krU2jhd-JY1HVc4Hdww&s",
    rating: { rate: 4.8 }
  },
  {
    id: 13,
    title: "Kitchen Stool",
    price: 45.99,
    description: "A high stool for kitchen counters.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOmzoq9_6YW5moGMWNXJdPqWy9OpolK9Acg&s",
    rating: { rate: 4.2 }
  },
  {
    id: 14,
    title: "Wardrobe",
    price: 449.99,
    description: "A spacious wardrobe with multiple compartments.",
    image: "https://img.freepik.com/premium-photo/wardrobe-isolated-white-background-3d-rendering_578102-1230.jpg?w=360",
    rating: { rate: 4.5 }
  },
  {
    id: 15,
    title: "Glass Coffee Table",
    price: 175.99,
    description: "A coffee table with a glass top.",
    image: "https://lofthome.com/cdn/shop/files/modern-tempered-glass-coffee-table-2pcs-set-sharkmodernloft-home-sg-888444.jpg?v=1724156155&width=1080",
    rating: { rate: 4.3 }
  },
  {
    id: 16,
    title: "Garden Bench",
    price: 149.99,
    description: "A sturdy bench for garden seating.",
    image: "https://st2.depositphotos.com/1323882/6164/i/950/depositphotos_61644113-stock-photo-bench-on-white-background.jpg",
    rating: { rate: 4.5 }
  },
  {
    id: 17,
    title: "Bean Bag Chair",
    price: 59.99,
    description: "A comfortable bean bag chair.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUFpjElOy_CyQ3sTCqLyyX5xvCUlC81viyw&s",
    rating: { rate: 4.6 }
  },
  {
    id: 18,
    title: "Nightstand",
    price: 79.99,
    description: "A small nightstand with drawers.",
    image: "https://media.istockphoto.com/id/1309750064/photo/wooden-bedside-table-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=g82rD9vEDEBromq3M4HSYWtbThAowLuL77CaUlZmZEg=",
    rating: { rate: 4.4 }
  },
  {
    id: 19,
    title: "Dining Chair Set",
    price: 249.99,
    description: "A set of dining chairs with a classic design.",
    image: "https://www.shutterstock.com/image-photo/wooden-table-chairs-on-white-600nw-2168176325.jpg",
    rating: { rate: 4.7 }
  },
  {
    id: 20,
    title: "Shoe Rack",
    price: 59.99,
    description: "A compact shoe rack with multiple shelves.",
    image: "https://img.freepik.com/premium-photo/shoe-rack-isolated-white-background_41158-5511.jpg",
    rating: { rate: 4.3 }
  }
];


// Filter Component
function Filter({ showCount, setShowCount, sortOption, setSortOption }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f9f3eb] p-4 space-y-4 sm:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto justify-between">
        <button className="flex items-center text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7.414 7.414a1 1 0 00-.293.707v3.172a1 1 0 01-1.707.707l-2.828-2.828a1 1 0 01-.293-.707V12.12a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="ml-1">Filter</span>
        </button>

        <span className="text-gray-600">Showing 1-{showCount} results</span>
      </div>

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
  const [showCount, setShowCount] = useState(8);
  const [sortOption, setSortOption] = useState('Default');

  const productsPerPage = showCount;

  useEffect(() => {
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'Price: Low to High') return a.price - b.price;
    if (sortOption === 'Price: High to Low') return b.price - a.price;
    return products;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

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
              {truncateText(product.description, 100)}
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
