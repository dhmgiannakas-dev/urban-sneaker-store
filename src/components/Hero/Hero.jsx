import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-comment">
          <p>SNEAKERS FOR A BRIGHTER TOMORROW</p>
        </div>

        <p className="hero-subtitle">NEW COLLECTION</p>

        <h1>
          STEP INTO
          <br />
          YOUR STYLE.
        </h1>

        <p className="hero-description">
          Modern sneakers. Real life.
          <br />
          Endless possibilities.
        </p>

        <Link to="/shop" className="hero-button">
          <span>SHOP NOW</span>
          <span className="hero-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}

export default Hero;