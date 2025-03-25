import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Visa Navigator
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/all-visas">All Visas</Link>
          {user && <Link to="/add-visa">Add Visa</Link>}
          {user && <Link to="/my-visas">My Added Visas</Link>}
          {user && <Link to="/my-applications">My Applications</Link>}

          {/* Conditional Login/Register */}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span>{user.displayName}</span>
                <button
                  onClick={logoutUser}
                  className="bg-red-500 px-4 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/all-visas" onClick={() => setIsMenuOpen(false)}>
            All Visas
          </Link>
          {user && (
            <>
              <Link to="/add-visa" onClick={() => setIsMenuOpen(false)}>
                Add Visa
              </Link>
              <Link to="/my-visas" onClick={() => setIsMenuOpen(false)}>
                My Added Visas
              </Link>
              <Link to="/my-applications" onClick={() => setIsMenuOpen(false)}>
                My Applications
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-center mt-2">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-12 h-12 rounded-full mx-auto"
                />
                <p className="text-sm">{user.displayName}</p>
              </div>
              <button
                onClick={() => {
                  logoutUser();
                  setIsMenuOpen(false);
                }}
                className="bg-red-500 px-4 py-1 rounded mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
