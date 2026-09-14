import { useState } from "react";
import "./Checkout.css";
import { Navigate, useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !email || !address) {
            alert("Please fill all fields.");
            return;
        }

        setOrderSubmitted(true);
        clearCart();
        navigate("/success");

    }

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );


    if (cart.length === 0 && !orderSubmitted) {
        return <Navigate to="/cart" replace />;
    }
    return (
        <main className="checkout-page">
            <h1>Checkout</h1>
            <div className="checkout-layout">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Address</label>

                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <button type="submit">
                        Place Order
                    </button>
                </form>
                <section className="order-summary">
                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div className="order-summary-item" key={item.id}>
                            <p>
                                {item.name} x {item.quantity}
                            </p>

                            <p>
                                €{(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <h3>Total: €{totalPrice.toFixed(2)}</h3>
                </section>
            </div>
        </main>
    );
}

export default Checkout;