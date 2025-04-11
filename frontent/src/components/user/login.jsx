import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #1e1e2f 0%, #111 100%)",
        padding: "2rem",
        color: "#f0f0f0",
      }}
    >
      <div
        className="card p-4 shadow border-0"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#212529",
          color: "#f0f0f0",
          borderRadius: "1rem",
        }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#8ec5fc" }}>
          Welcome Back
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label fw-semibold">
              Email
            </label>
            <input
              name="email"
              value={email}
              onChange={onChangerHandler}
              type="email"
              className="form-control bg-dark text-light border-secondary rounded-3"
              id="inputEmail"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="inputPassword" className="form-label fw-semibold">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={onChangerHandler}
              type="password"
              className="form-control bg-dark text-light border-secondary rounded-3"
              id="inputPassword"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary w-100 py-2 rounded-3 fw-bold"
            style={{ borderColor: "#8ec5fc", color: "#8ec5fc" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
