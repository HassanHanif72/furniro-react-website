import React, { useEffect, useState } from "react";
import { db } from "../utils/utils"; // Firebase initialization
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { Spin } from "antd";
import { auth } from "../utils/utils"; // Firebase authentication
import { signOut } from "firebase/auth";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("dashboard"); // State for page navigation

  // Fetch orders when activePage is "orders"
  useEffect(() => {
    if (activePage === "orders") {
      const ordersRef = collection(db, "orders");

      const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [activePage]);

  // Fetch users when activePage is "users"
  useEffect(() => {
    if (activePage === "users") {
      const usersRef = collection(db, "users"); // Adjust the collection name based on your Firestore structure

      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [activePage]);

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

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      window.location.href = "/login"; // Replace with your login page URL
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading && (activePage === "orders" || activePage === "users")) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <h2 className="text-xl font-semibold text-center mb-6">
            Welcome to the Dashboard
          </h2>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-6">
              Orders Dashboard
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {orders.length === 0 ? (
                <Spin />
              ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-[#b88e2f] text-white">
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
                      <tr key={order.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{order.id}</td>
                        <td className="py-2 px-4 border-b">
                          {order.userDetails.name}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {Array.isArray(order.cartItems) &&
                          order.cartItems.length > 0 ? (
                            <ul>
                              {order.cartItems.map((item, index) => (
                                <li key={index}>
                                  {item.title} - {item.quantity}{" "}
                                  {item.quantity > 1 ? "pcs" : "pc"}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>No items available</p>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          ${order.totalPrice}
                        </td>
                        <td className="py-2 px-4 border-b">{order.status}</td>
                        <td className="py-2 px-4 border-b">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value)
                            }
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#b88e2f] focus:border-transparent"
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
          </div>
        );
      case "users":
        return (
          <div>
            <h2 className="text-xl font-semibold text-center mb-6">
              Users Management
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {users.length === 0 ? (
                <Spin />
              ) : (
                <table className="min-w-full text-center bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-[#b88e2f] text-white">
                      <th className="py-2 px-4 border-b">User ID</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{user.id}</td>
                        <td className="py-2 px-4 border-b">{user.username}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#b88e2f] text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <a
            href="#"
            onClick={() => setActivePage("dashboard")}
            className={`block py-2.5 px-4 hover:bg-[#aa8328] ${
              activePage === "dashboard" ? "bg-[#aa8328]" : ""
            }`}
          >
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => setActivePage("orders")}
            className={`block py-2.5 px-4 hover:bg-[#aa8328] ${
              activePage === "orders" ? "bg-[#aa8328]" : ""
            }`}
          >
            Orders
          </a>
          <a
            href="#"
            onClick={() => setActivePage("users")}
            className={`block py-2.5 px-4 hover:bg-[#aa8328] ${
              activePage === "users" ? "bg-[#aa8328]" : ""
            }`}
          >
            Users
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow py-4 px-6 flex justify-end items-center">
          <button
            onClick={handleLogout}
            className="ml-4 bg-[#b88e2f] text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-100">{renderContent()}</main>
      </div>
    </div>
  );
}

export default AdminPanel;
