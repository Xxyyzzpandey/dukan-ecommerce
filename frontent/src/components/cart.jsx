import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handleRemoveClick = (productId) => {
    setSelectedProductId(productId);
    setShowConfirm(true);
  };

  const confirmRemoval = () => {
    if (selectedProductId) {
      removeFromCart(selectedProductId);
    }
    setShowConfirm(false);
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {!cart?.items || cart.items.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold">Your cart is empty 😢</h2>
            <button
              className="mt-5 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-md transition"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-5 rounded-lg shadow-lg">
              <h2 className="text-xl md:text-2xl font-semibold">
                Total Items: <span className="text-yellow-500">{qty}</span>
              </h2>
              <h2 className="text-xl md:text-2xl font-semibold">
                Total Price: <span className="text-green-400">₹{price}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {cart?.items?.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col items-center text-center"
                >
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-32 h-32 object-cover rounded-md border-2 border-yellow-500"
                  />
                  <h3 className="mt-3 text-lg font-semibold">{product.title}</h3>
                  <p className="text-green-400 text-lg font-semibold">₹{product.price}</p>
                  <p className="text-sm text-gray-400">Qty: {product.qty}</p>

                  <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                      className="px-3 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-md"
                      onClick={() => decreaseQty(product?.productId, 1)}
                    >
                      Qty--
                    </button>
                    <button
                      className="px-3 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-md"
                      onClick={() =>
                        addToCart(
                          product?.productId,
                          product.title,
                          product.price / product.qty,
                          1,
                          product.imgSrc
                        )
                      }
                    >
                      Qty++
                    </button>
                    <button
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md"
                      onClick={() => handleRemoveClick(product?.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-8">
              <button
                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-md"
                onClick={() => navigate("/shipping")}
              >
                Proceed to Checkout
              </button>
              <button
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-md"
                onClick={() => clearCart()}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold mb-4">Remove this item?</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                onClick={confirmRemoval}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
