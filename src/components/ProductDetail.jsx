import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../utils/utils.js";
import { collection, addDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { Spin } from "antd";
import { CartContext } from "../context/CartContext.jsx";
import Footer from "./Footer.jsx";

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


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [detailedDescription, setDetailedDescription] = useState("");
  const auth = getAuth();
  const { addToCart: addToCartContext } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = () => {
      const productData = sampleProducts.find((p) => p.id === parseInt(id, 10));
      if (productData) {
        setProduct(productData);
        setDetailedDescription(productData.description); // Set description directly
      } else {
        console.error("Product not found.");
      }
      setLoading(false);
    };

    const checkIfInCart = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const q = query(
            collection(db, "cart"),
            where("userId", "==", userId),
            where("productId", "==", id)
          );
          const querySnapshot = await getDocs(q);
          setIsInCart(querySnapshot.docs.length > 0);
        } catch (error) {
          console.error("Error checking cart:", error);
        }
      }
    };

    const checkIfLiked = async () => {
      if (auth.currentUser) {
        try {
          const userId = auth.currentUser.uid;
          const q = query(
            collection(db, "wishlist"),
            where("userId", "==", userId),
            where("productId", "==", id)
          );
          const querySnapshot = await getDocs(q);
          setIsLiked(querySnapshot.docs.length > 0);
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };

    fetchProduct();
    checkIfInCart();
    checkIfLiked();
  }, [id, auth.currentUser]);

  const addToCart = async () => {
    if (product && auth.currentUser) {
      if (!isInCart) {
        try {
          await addDoc(collection(db, "cart"), {
            userId: auth.currentUser.uid,
            email: auth.currentUser.email,
            productId: id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1,
          });
          addToCartContext(product);
          setIsInCart(true);
          alert("Product added to cart!");
        } catch (error) {
          console.error("Error adding to cart:", error);
        }
      } else {
        alert("Product is already in the cart.");
      }
    } else {
      alert("Please log in to add items to your cart.");
      navigate("/Login");
    }
  };

  const toggleLike = async () => {
    if (auth.currentUser) {
      try {
        const userId = auth.currentUser.uid;
        const wishlistRef = collection(db, "wishlist");

        if (isLiked) {
          const q = query(wishlistRef, where("userId", "==", userId), where("productId", "==", id));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          setIsLiked(false);
          alert("Product removed from wishlist!");
        } else {
          await addDoc(wishlistRef, {
            userId: userId,
            productId: id,
            title: product.title,
            price: product.price,
            image: product.image,
            description: product.description,
          });
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    } else {
      alert("Please log in to like items.");
      navigate("/Login");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><Spin size="large" /></div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <motion.img
            src={product.image}
            alt={product.title}
            className="lg:w-1/2 w-full lg:h-full h-64 object-cover object-center rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <span className="mr-3">Price:</span>
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-bold">Detailed Description</h2>
              <p className="leading-relaxed">{detailedDescription || "No detailed description available."}</p>
            </div>
            <div className="flex">
              {isInCart ? (
                <motion.button
                  className="flex ml-auto font-bold text-white bg-amber-950 border-0 py-2 px-6 focus:outline-none rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Carted
                </motion.button>
              ) : (
                <motion.button
                  onClick={addToCart}
                  className="flex ml-auto font-bold text-white border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                  style={{ backgroundColor: "#b88e2f" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              )}
              <motion.button
                onClick={toggleLike}
                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  fill={isLiked ? "red" : "currentColor"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ProductDetail;
