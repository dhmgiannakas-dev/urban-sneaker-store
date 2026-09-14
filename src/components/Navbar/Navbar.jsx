import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/urban-logo1.png";
import { ShoppingCart } from "lucide-react";

function Navbar({ cart }) {

  const [animateCart, setAnimateCart] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    if (totalItems === 0) return;

    setAnimateCart(true);

    const timer = setTimeout(() => {
      setAnimateCart(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="URBAN Home" />
      </Link>
      <div className="navbar-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/shop">
          Shop
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>
      </div>

      <Link to="/cart" className="cart-link">
        <ShoppingCart size={19} />

        <span className={`cart-count ${animateCart ? "cart-pop" : ""}`}>
          {totalItems}
        </span>
      </Link>
    </nav>
  );
}

export default Navbar;