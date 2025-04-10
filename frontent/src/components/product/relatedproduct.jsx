// import React, { useContext, useState } from "react";
// import AppContext from "../../context/AppContext";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";

// const RelatedProduct = ({ category }) => {
//   const { products } = useContext(AppContext);
//   const [realtedProduct, setRealtedProduct] = useState([]);
//   useEffect(() => {
//     setRealtedProduct(
//       products.filter(
//         (data) => data?.category?.toLowerCase() == category?.toLowerCase()
//       )
//     );
//   }, [category, products]);

//   return (
//     <>
//       <div className="container text-center">
//         <h1>Related Product</h1>
//         <div className="container  d-flex justify-content-center align-items-center">
//           <div className="row container d-flex justify-content-center align-items-center my-5">
//             {realtedProduct?.map((product) => (
//               <div
//                 key={product._id}
//                 className="my-3 col-md-4 
//             d-flex justify-content-center align-items-center"
//               >
//                 <div
//                   className="card bg-dark text-light text-center"
//                   style={{ width: "18rem" }}
//                 >
//                   <Link
//                     to={`/product/${product._id}`}
//                     className="d-flex justify-content-center align-items-center p-3"
//                   >
//                     <img
//                       src={product.imgSrc}
//                       className="card-img-top"
//                       alt="..."
//                       style={{
//                         width: "200px",
//                         height: "200px",
//                         borderRadius: "10px",
//                         border: "2px solid yellow",
//                       }}
//                     />
//                   </Link>
//                   <div className="card-body">
//                     <h5 className="card-title">{product.title}</h5>
//                     <div className="my-3">
//                       <button className="btn btn-primary mx-3">
//                         {product.price} {"₹"}
//                       </button>
//                       <button className="btn btn-warning">Add To Cart</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RelatedProduct;


import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setRelatedProducts(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container text-center py-5">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>

      <div className="row justify-content-center">
        {relatedProducts?.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card bg-dark text-light text-center shadow-lg rounded-lg overflow-hidden">
              <Link to={`/product/${product._id}`} className="p-3 d-flex justify-content-center">
                <img
                  src={product.imgSrc}
                  className="card-img-top img-fluid"
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title font-bold">{product.title}</h5>
                <div className="my-3 d-flex flex-column gap-2">
                  <button className="btn btn-primary w-full">{product.price} ₹</button>
                  <button className="btn btn-warning w-full">Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
