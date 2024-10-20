import React from 'react';
import { Link } from 'react-router-dom';

function CartSlider({ isOpen, onClose, cartItems, onCheckoutClick }) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className={`absolute right-0 top-0 bg-white w-80 h-full shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button className="absolute top-2 right-2" onClick={onClose}>Close</button>
          <div>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div key={item.id} className="flex justify-between p-2 border-b">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <Link to="/cart" className="text-blue-500" onClick={onClose}>Cart</Link>
            <Link to="/comparison" className="text-blue-500" onClick={onClose}>Comparison</Link>
            <button onClick={onCheckoutClick} className="text-blue-500">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSlider;
