import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import ShowOrderProduct from '../orderproductshow';

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
      {/* User Info */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome, {user?.name}</h1>
        <h3 className="text-lg text-gray-400">{user?.email}</h3>
        <h4 className="mt-3 text-xl font-medium text-gray-300">
          Total Orders: <span className="text-blue-400">{userOrder?.length}</span>
        </h4>
      </div>

      {/* Orders */}
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full border border-gray-700 text-sm sm:text-base">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="p-3 text-left border border-gray-700">Order Items</th>
              <th className="p-3 text-left border border-gray-700">Order & Shipping Info</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-200">
            {userOrder && userOrder.length > 0 ? (
              userOrder.map((product) => (
                <tr key={product._id} className="border-t border-gray-700">
                  <td className="p-3 align-top border-r border-gray-700 min-w-[200px]">
                    <ShowOrderProduct items={product?.orderItems} />
                  </td>
                  <td className="p-3 space-y-1 min-w-[250px]">
                    <ul className="space-y-1">
                      <li>📦 <span className="font-semibold">Order ID:</span> {product?.orderId}</li>
                      <li>💳 <span className="font-semibold">Payment ID:</span> {product?.paymentId}</li>
                      <li>✅ <span className="font-semibold">Payment Status:</span> {product?.payStatus}</li>
                      <li>👤 <span className="font-semibold">Name:</span> {product?.userShipping?.fullName}</li>
                      <li>📞 <span className="font-semibold">Phone:</span> {product?.userShipping?.phoneNumber}</li>
                      <li>🌍 <span className="font-semibold">Country:</span> {product?.userShipping?.country}</li>
                      <li>🏡 <span className="font-semibold">State:</span> {product?.userShipping?.state}</li>
                      <li>📍 <span className="font-semibold">PinCode:</span> {product?.userShipping?.pincode}</li>
                      <li>📌 <span className="font-semibold">Address:</span> {product?.userShipping?.address}</li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
