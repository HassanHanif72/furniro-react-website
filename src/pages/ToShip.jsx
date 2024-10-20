import { useEffect, useState } from "react";
import { db } from "../utils/utils"; // Firebase configuration
import { collection, onSnapshot } from "firebase/firestore";
import { Spin } from "antd";

function ToShip() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state variable to track the loading status

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    // Real-time listener for orders
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          status: doc.data().status || "in progress", // Set default status to 'in progress'
        }));
        setOrders(ordersData);
        setIsLoading(false); // Set isLoading to false when data is received
        console.log("Real-time ordersData ==>", ordersData);
      },
      (error) => {
        console.error("Error fetching orders: ", error);
        setIsLoading(false); // Set isLoading to false when an error occurs
      }
    );

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="ship p-6">
      <h2 className="text-2xl font-bold mb-4">Orders In Progress</h2>
      {isLoading ? (
        <div className="col-span-full text-center text-gray-500">
          <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No orders in progress
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={order.cartItems[0].image}
                  alt={`Order ${order.id}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    Order Name: {order.cartItems[0].title}
                  </h3>
                  <p className="text-gray-600 mt-2">Status: {order.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ToShip;
