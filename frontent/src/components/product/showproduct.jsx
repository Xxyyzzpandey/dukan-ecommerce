// import React, { useContext } from "react";
// import AppContext from "../../context/AppContext";
// import { Link } from "react-router-dom";

// const ShowProduct = () => {
//   const { products, filteredData, addToCart } = useContext(AppContext);
//   return (
//     <>
//       <div className="container  d-flex justify-content-center align-items-center">
//         <div className="row container d-flex justify-content-center align-items-center my-5">
//           {filteredData?.map((product) => (
//             <div
//               key={product._id}
//               className="my-3 col-md-4 
//             d-flex justify-content-center align-items-center"
//             >
//               <div
//                 className="card bg-dark text-light text-center"
//                 style={{ width: "18rem" }}
//               >
//                 <Link
//                   to={`/product/${product._id}`}
//                   className="d-flex justify-content-center align-items-center p-3"
//                 >
//                   <img
//                     src={product.imgSrc}
//                     className="card-img-top"
//                     alt="..."
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       borderRadius: "10px",
//                       border: "2px solid yellow",
//                     }}
//                   />
//                 </Link>
//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <div className="my-3">
//                     <button className="btn btn-primary mx-3">
//                       {product.price} {"₹"}
//                     </button>
//                     <button
//                       className="btn btn-warning"
//                       onClick={() =>
//                         addToCart(
//                           product._id,
//                           product.title,
//                           product.price,
//                           1,
//                           product.imgSrc
//                         )
//                       }
//                     >
//                       Add To Cart
//                     </button>
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShowProduct;


import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { products, filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {filteredData?.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div className="card bg-dark text-light text-center w-100 shadow-lg rounded">
              <Link to={`/product/${product._id}`} className="d-flex justify-content-center p-3">
                <img
                  src={product.imgSrc}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="my-3 d-flex justify-content-center gap-2 flex-wrap">
                  <button className="btn btn-primary">{product.price} ₹</button>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      addToCart(product._id, product.title, product.price, 1, product.imgSrc)
                    }
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
