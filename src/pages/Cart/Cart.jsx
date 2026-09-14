import "./Cart.css";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart</h1>
          <p>Your cart is empty.</p>
          <Link to="/shop">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  function handleClearCart() {
    const confirmed = window.confirm(
      "Are you sure you want to remove all products from your cart?"
    );

    if (confirmed) {
      clearCart();
    }
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>

        <button
          className="clear-cart-button"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
      <div className="cart-layout">
        <section className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <div className="cart-item-top">
                  <div>
                    <h3>{item.name}</h3>
                    <p>€{item.price}</p>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X size={20} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    €{(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>€{totalPrice.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <Link to="/shop" className="continue-shopping">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;