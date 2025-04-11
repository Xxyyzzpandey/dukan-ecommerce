import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./relatedproduct";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  const { addToCart } = useContext(AppContext);

  const navigate=useNavigate();

//   const url = "http://localhost:1000/api";
const url = "https://dukan-ecommerce-1.onrender.com/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
    //   console.log(api.data.product);
    setProduct(api.data.product)
      //   setProducts(api.data.products);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            style={{ width: "250px", height: "250px",borderRadius:'10px',border:"2px solid yellow" }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>
            {product?.price}{" "}
            {"₹"}
          </h1>
          {/* <h3>{product.category}</h3> */}
          <div className="my-5">
            <button className="btn btn-danger mx-3" style={{fontWeight:'bold'}} 
            onClick={()=>navigate("/shipping")}>Buy Now</button>
            <button className="btn btn-warning" style={{fontWeight:'bold'}}
            onClick={() =>
              addToCart(
                product?.productId,
                product.title,
                product.price / product.qty,
                1,
                product.imgSrc
              )
            }>Add To Cart</button>
          </div>
        </div>
      </div>

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
