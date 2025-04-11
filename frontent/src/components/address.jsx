import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto border-2 border-yellow-400 rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-8">Shipping Address</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                name="fullName"
                value={fullName}
                onChange={onChangerHandler}
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Country</label>
              <input
                name="country"
                value={country}
                onChange={onChangerHandler}
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">State</label>
              <input
                name="state"
                value={state}
                onChange={onChangerHandler}
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                name="city"
                value={city}
                onChange={onChangerHandler}
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Pincode</label>
              <input
                name="pincode"
                value={pincode}
                onChange={onChangerHandler}
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                name="phoneNumber"
                value={phoneNumber}
                onChange={onChangerHandler}
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Address / Nearby</label>
            <textarea
              name="address"
              value={address}
              onChange={onChangerHandler}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold shadow"
            >
              Submit
            </button>
            {userAddress && (
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-semibold shadow"
              >
                Use Old Address
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
