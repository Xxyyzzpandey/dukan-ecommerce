
import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import ShowOrderProduct from '../orderproductshow';

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <>
      {/* User Information Section */}
      <div className="container text-center my-5">
        <h1 className="text-3xl font-bold text-gray-200">Welcome, {user?.name}</h1>
        <h3 className="text-lg text-gray-400">{user?.email}</h3>
        <h1 className="text-xl font-semibold text-gray-300 mt-3">
          Total Orders: <span className="text-blue-400">{userOrder?.length}</span>
        </h1>
      </div>

      {/* Order Details Table */}
      <div className="container my-5">
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border-collapse border border-gray-700">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-3 border border-gray-700">Order Items</th>
                <th className="p-3 border border-gray-700">Order Details & Shipping Address</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-white">
  {(userOrder || []).length > 0 ? (
    (userOrder || []).map((product) => (
      <tr key={product._id} className="border border-gray-700">
        <td className="p-3">
          <ShowOrderProduct items={product?.orderItems} />
        </td>
        <td className="p-3">
          <ul className="font-medium space-y-1">
            <li>📦 <span className="font-bold">Order ID:</span> {product?.orderId}</li>
            <li>💳 <span className="font-bold">Payment ID:</span> {product?.paymentId}</li>
            <li>✅ <span className="font-bold">Payment Status:</span> {product?.payStatus}</li>
            <li>👤 <span className="font-bold">Name:</span> {product?.userShipping?.fullName}</li>
            <li>📞 <span className="font-bold">Phone:</span> {product?.userShipping?.phoneNumber}</li>
            <li>🌍 <span className="font-bold">Country:</span> {product?.userShipping?.country}</li>
            <li>🏡 <span className="font-bold">State:</span> {product?.userShipping?.state}</li>
            <li>📍 <span className="font-bold">PinCode:</span> {product?.userShipping?.pincode}</li>
            <li>📌 <span className="font-bold">Near By:</span> {product?.userShipping?.address}</li>
          </ul>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2" className="p-4 text-center text-gray-400">No orders found.</td>
    </tr>
  )}
</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
