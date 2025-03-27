// import React, { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import AppContext from "../context/AppContext";

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState(" ");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { setFilteredData, products, logout, isAuthenticated, cart } =
//     useContext(AppContext);
//   // console.log("user cart = ",cart)

//   const filterbyCategory = (cat) => {
//     setFilteredData(
//       products.filter(
//         (data) => data.category.toLowerCase() == cat.toLowerCase()
//       )
//     );
//   };
//   const filterbyPrice = (price) => {
//     setFilteredData(products.filter((data) => data.price >= price));
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     navigate(`/product/search/${searchTerm}`);
//     setSearchTerm(" ");
//   };
//   return (
//     <>
//       <div className="nav sticky-top">
//         <div className="nav_bar">
//           <Link
//             to={"/"}
//             className="left"
//             style={{ textDecoration: "none", color: "white" }}
//           >
//             <h3>MERN E - Commerce</h3>
//           </Link>
//           <form className="search_bar" onSubmit={submitHandler}>
//             <span className="material-symbols-outlined">search</span>{" "}
//             <input
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               type="text"
//               placeholder="Search Products..."
//             />
//           </form>
//           <div className="right">
//             {isAuthenticated && (
//               <>
//                 <Link
//                   to={"/cart"}
//                   type="button"
//                   className="btn btn-primary position-relative mx-3"
//                 >
//                   <span className="material-symbols-outlined">
//                     shopping_cart
//                   </span>

//                   {cart?.items?.length > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {cart?.items?.length}
//                       <span className="visually-hidden">unread messages</span>
//                     </span>
//                   )}
//                 </Link>

//                 <Link to={"/profile"} className="btn btn-info mx-3">
//                   profile
//                 </Link>
//                 <button
//                   className="btn btn-danger mx-3"
//                   onClick={() => {
//                     logout();
//                     navigate("/");
//                   }}
//                 >
//                   logout
//                 </button>
//               </>
//             )}

//             {!isAuthenticated && (
//               <>
//                 <Link to={"/login"} className="btn btn-secondary mx-3">
//                   login
//                 </Link>
//                 <Link to={"/register"} className="btn btn-info mx-3">
//                   register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {location.pathname == "/" && (
//           <div className="sub_bar">
//             <div className="items" onClick={() => setFilteredData(products)}>
//               No Filter
//             </div>
//             <div className="items" onClick={() => filterbyCategory("mobiles")}>
//               Mobiles
//             </div>
//             <div className="items" onClick={() => filterbyCategory("laptops")}>
//               Laptops
//             </div>
//             <div className="items" onClick={() => filterbyCategory("cameras")}>
//               Camera's
//             </div>
//             <div
//               className="items"
//               onClick={() => filterbyCategory("headphones")}
//             >
//               Hedphones
//             </div>
//             <div className="items" onClick={() => filterbyPrice(15999)}>
//               15999
//             </div>
//             <div className="items" onClick={() => filterbyPrice(25999)}>
//               25999
//             </div>
//             <div className="items" onClick={() => filterbyPrice(49999)}>
//               49999
//             </div>
//             <div className="items" onClick={() => filterbyPrice(69999)}>
//               69999
//             </div>
//             <div className="items" onClick={() => filterbyPrice(89999)}>
//               89999
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } = useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(products.filter((data) => data.category.toLowerCase() === cat.toLowerCase()));
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
        <Link to="/" className="text-lg font-bold">MERN E-Commerce</Link>
        
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
              <Link to="/login" className="bg-gray-500 px-4 py-1 rounded-lg">Login</Link>
              <Link to="/register" className="bg-blue-500 px-4 py-1 rounded-lg">Register</Link>
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
      
      {location.pathname === "/" && (
        <div className="bg-gray-700 p-2 flex justify-center">
          <button onClick={() => setFilterOpen(!filterOpen)} className="bg-gray-600 px-4 py-1 rounded-lg">Filter ▼</button>
          {filterOpen && (
            <div className="absolute bg-gray-800 p-2 mt-1 rounded-lg shadow-md">
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => setFilteredData(products)}>No Filter</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyCategory("mobiles")}>Mobiles</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyCategory("laptops")}>Laptops</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyCategory("cameras")}>Cameras</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyCategory("headphones")}>Headphones</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyPrice(15999)}>15999</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyPrice(25999)}>25999</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyPrice(49999)}>49999</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyPrice(69999)}>69999</button>
              <button className="block bg-gray-600 px-4 py-1 rounded-lg w-full text-left" onClick={() => filterbyPrice(89999)}>89999</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
