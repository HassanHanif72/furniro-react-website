import { useEffect, useState } from "react";
import { db, auth } from "../utils/utils"; // Firebase configuration
import { collection, onSnapshot } from "firebase/firestore";
import { Spin } from "antd";
import { ClockCircleOutlined, CarOutlined, CheckCircleOutlined } from '@ant-design/icons'; // Ant Design Icons

function ToShip() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state variable to track the loading status

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    // Real-time listener for orders
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current user's uid

        const ordersData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            status: doc.data().status || "in progress", // Set default status to 'in progress'
          }))
          .filter((order) => order.cartItems[0].userId === auth.currentUser.uid); // Filter orders by user's uid

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

  // Helper function to return the icon based on order status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress':
        return <ClockCircleOutlined className="text-yellow-500" />;
      case 'On Way':
        return <CarOutlined className="text-blue-500" />;
      case 'Delivered':
        return <CheckCircleOutlined className="text-green-500" />;
      default:
        return <ClockCircleOutlined className="text-yellow-500" />; // Default to 'In Progress' icon
    }
  };

  return (
    <div className="ship p-6">
      <h2 className="text-2xl font-bold mb-4 text-center bg-[#b88e2f] text-white py-2 rounded">
        Order In Progress
      </h2>
      {isLoading ? (
        <div className="col-span-full text-center text-gray-500">
          <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="space-y-6"> {/* Apply vertical space between each card */}
          {orders.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No orders in progress
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg overflow-hidden w-full"
              >
                {/* Loop through all cartItems in the order */}
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="w-full">
                    {order.cartItems.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-center">
                        <img
                          src={item.image}
                          alt={`Order ${order.id}`}
                          className="w-full sm:w-1/3 h-20 object-cover object-center border rounded-xl" 
                          style={{width : "2cm", height :  "2cm"}} 

                        />
                        <div className="p-4 w-full sm:w-2/3">
                          <h3 className="text-lg font-semibold">
                            Order Name: {item.title}
                          </h3>
                          <p className="text-gray-600 mt-2">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Status heading and status with icon on the right side, shown only once */}
                  <div className="p-4 text-right sm:w-auto flex flex-col items-end">
                    <p className="text-gray-500 font-semibold mb-1">Status</p> {/* Status heading */}
                    <div className="flex items-center">
                      {getStatusIcon(order.status)} {/* Display status icon */}
                      <p className="ml-2 text-gray-600 font-medium">
                        {order.status}
                      </p>
                    </div>
                  </div>
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
