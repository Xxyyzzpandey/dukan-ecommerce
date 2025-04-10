import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  // Close filter menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) =>
          data.category &&
          data.category.toLowerCase() === cat.toLowerCase()
      )
    );
    setFilterOpen(false);
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
    setFilterOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-lg font-bold">E-Dukan</Link>

        <form className="hidden md:flex items-center bg-gray-700 rounded-lg px-3 py-1" onSubmit={submitHandler}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Products..."
            className="bg-transparent focus:outline-none text-white px-2"
          />
        </form>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="relative flex items-center">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 rounded-full">
                    {cart.items.length}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="bg-blue-300 px-4 py-1 rounded-lg">Profile</Link>
              <button onClick={() => { logout(); navigate("/"); }} className="bg-red-500 px-4 py-1 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-gray-500 text-white px-4 py-1 rounded-lg">Login</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-1 rounded-lg">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4 flex flex-col items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={() => { logout(); navigate("/"); setMenuOpen(false); }} className="bg-red-500 px-4 py-1 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}

      {/* Filter Dropdown */}
      {location.pathname === "/" && (
        <div className="bg-gray-700 p-2 flex justify-items-end relative" ref={filterRef}>
          <button onClick={() => setFilterOpen(!filterOpen)} className="bg-gray-600 px-4 py-1 rounded-lg">
            Filter ▼
          </button>
          {filterOpen && (
            <div className="absolute bg-gray-800 p-2 mt-1 rounded-lg shadow-md z-50">
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => setFilteredData(products)}>No Filter</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyCategory("sports")}>sports</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyCategory("electronic gadget")}>electronic gadget</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyCategory("zym equipment")}>zym equipment</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyCategory("toy")}>toys</button>
              <hr className="my-2 border-gray-500" />
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyPrice(50)}>Above ₹49</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyPrice(199)}>Above ₹199</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyPrice(499)}>Above ₹499</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left mb-1" onClick={() => filterbyPrice(1199)}>Above ₹1199</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyPrice(9999)}>Above ₹9999</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
