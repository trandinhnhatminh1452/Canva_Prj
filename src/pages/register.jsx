import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register info:", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-[#a6a3e9] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
        <input
          type="text"
          placeholder="Họ và tên"
          className="border p-2 w-full mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
        >
          Đăng ký
        </button>
        <p className="mt-4 text-center">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-500">
            Đăng nhập
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
