import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import "./Success.css";

function Success() {
  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <Check size={34} strokeWidth={2} />
        </div>

        <p className="success-label">ORDER CONFIRMED</p>

        <h1>Thank you for your order.</h1>

        <p className="success-message">
          Your order has been successfully placed.
          We'll take care of the rest.
        </p>

        <Link to="/shop" className="success-button">
          Continue Shopping <span>→</span>
        </Link>
      </div>
    </main>
  );
}

export default Success;