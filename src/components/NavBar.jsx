import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="relative w-full bg-gradient-to-r from-[#57d4df] to-[#6d3dda] h-[56px] text-white px-6 py-3 flex justify-between items-center shadow">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold hover:text-gray-200">
        Canva
      </Link>

      {/* Menu */}
      <div className="flex items-center space-x-4">
        <Link to="/admin" className="hover:text-gray-200">
          Admin
        </Link>
        {/* Account Icon */}
        <div ref={menuRef} className="relative">
          <button
            className="p-2 rounded-full hover:bg-white/20"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <User className="w-6 h-6" />
          </button>

          {/* Logout */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-md shadow-lg py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
