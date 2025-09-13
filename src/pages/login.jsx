import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "../assets/images/login-background.webp";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login info:", { email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-[#bbb9e9] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white z-10 p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="border p-2 w-full mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Đăng nhập
        </button>
        <p className="mt-4 text-center">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-500">
            Đăng ký
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
