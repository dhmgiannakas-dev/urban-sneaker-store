import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">ABOUT URBAN</p>

        <h1>
          STYLE MOVES
          <br />
          WITH YOU.
        </h1>

        <p className="about-intro">
          URBAN is where sneaker culture meets everyday style.
          A curated space built around movement, individuality,
          and the pairs that define how you show up.
        </p>
      </section>

      <section className="about-story">
        <div className="about-story-title">
          <p>OUR STORY</p>
          <h2>More than sneakers.</h2>
        </div>

        <div className="about-story-text">
          <p>
            URBAN was created around one simple idea:
            style should feel effortless.
          </p>

          <p>
            We bring together modern sneakers, streetwear influence,
            and a clean shopping experience designed for people who
            see fashion as part of their everyday identity.
          </p>
        </div>
      </section>

      <section className="about-values">
        <article className="about-card">
          <span>01</span>
          <h3>Curated Style</h3>
          <p>
            A focused selection inspired by modern sneaker culture
            and everyday streetwear.
          </p>
        </article>

        <article className="about-card">
          <span>02</span>
          <h3>Simple Experience</h3>
          <p>
            Clean design, useful filters, and a shopping experience
            without unnecessary distractions.
          </p>
        </article>

        <article className="about-card">
          <span>03</span>
          <h3>Always Moving</h3>
          <p>
            New silhouettes, new colors, and new inspiration.
            URBAN is designed to keep evolving.
          </p>
        </article>
      </section>

      <section className="about-cta">
        <div className="about-cta-content">
          <p className="about-cta-label">READY FOR WHAT'S NEXT?</p>

          <h2>
            Find the pair
            <br />
            that feels like you.
          </h2>

          <p className="about-cta-text">
            Explore our latest selection of sneakers and
            discover your next everyday pair.
          </p>

          <Link to="/shop" className="about-shop-link">
            Shop Collection
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;