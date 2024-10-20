import React, { useEffect, useState } from "react";
import { db } from "../utils/utils"; // Firebase initialization
import { collection, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ordersRef = collection(db, "orders");

    // Real-time listener for orders
    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    const orderRef = doc(db, "orders", orderId);
    try {
      await updateDoc(orderRef, {
        status: newStatus,
      });
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Admin Order Management</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer Name</th>
              <th className="py-2 px-4 border-b">Items</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.userDetails.name}</td>
                <td className="py-2 px-4 border-b">
                  {Array.isArray(order.cartItems) ? (
                    order.cartItems.map((item, index) => (
                      <p key={index}>
                        {item.title} - {item.quantity}
                      </p>
                    ))
                  ) : (
                    <p>No items available</p>
                  )}
                </td>
                <td className="py-2 px-4 border-b">${order.totalPrice}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="On Way">On Way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
