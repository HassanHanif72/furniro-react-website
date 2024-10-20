import React from "react";
import image1 from "../assets/pics/image 1 (5).png";
import image2 from "../assets/pics/image 2.png";
import image3 from "../assets/pics/image 3.png";
import image4 from "../assets/pics/image 4 (1).jpg";
import image5 from "../assets/pics/image 9 (1).png";
import image6 from "../assets/pics/image 6 (4).png";
import image7 from "../assets/pics/image 7.jpg";
import image8 from "../assets/pics/image 8.jpg";
import { Button } from "antd";
import {
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const furnitureProducts = [
  {
    id: 1,
    name: "Syltherine",
    category: "Chair",
    price: "$16.00",
    image: image1,
  },
  {
    id: 2,
    name: "Leviosa",
    category: "Chair",
    price: "$21.15",
    image: image2,
  },
  {
    id: 3,
    name: "Lolito",
    category: "Sofa",
    price: "$12.00",
    image: image3,
  },
  {
    id: 4,
    name: "Respira",
    category: "Desk",
    price: "$18.40",
    image: image4,
  },
  {
    id: 5,
    name: "Grifo",
    category: "Chair",
    price: "$16.00",
    image: image5,
  },
  {
    id: 6,
    name: "Muggo",
    category: "Table",
    price: "$21.15",
    image: image6,
  },
  {
    id: 7,
    name: "Pingky",
    category: "Sofa",
    price: "$12.00",
    image: image7,
  },
  {
    id: 8,
    name: "Potty",
    category: "Desk",
    price: "$18.40",
    image: image8,
  },
];

function Cards() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {furnitureProducts.map((product) => (
            <div
              key={product.id}
              className="lg:w-1/4 md:w-1/2 p-4 w-full group"
            >
              <div className="block relative h-60 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={product.image}
                />
                {/* Hover effect starts here */}
                <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col items-center">
                    <button
                      style={{ color: "#b88e2f" }}
                      className="bg-white px-4 py-2 font-bold mb-2"
                    >
                      Go to shop
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.name}
                </h2>
                <p className="mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
        <Link to={"/Shop"}>
          <button
            style={{ borderColor: "#b88e2f", color: "#b88e2f" }}
            className="m-auto mt-9 bg-white px-6 py-2 border w-60 font-bold"
          >
            Show More
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cards;
