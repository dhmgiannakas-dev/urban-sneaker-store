
import "./Cart.css";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartTotalPrice,
} from "../../store/selectors/cartSelectors";

import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/slices/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();


  function handleClearCart() {
    const confirmed = window.confirm(
      "Are you sure you want to remove all products from your cart?"
    );

    if (confirmed) {
      dispatch(clearCart());
    }
  }

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
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <X size={20} strokeWidth={1.8} />
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
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
