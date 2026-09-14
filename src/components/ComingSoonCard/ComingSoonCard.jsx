import "./ComingSoonCard.css";

function ComingSoonCard({ product }) {
  return (
    <div className="coming-soon-card">
      <div className="coming-soon-image-wrapper">
        <img src={product.image} alt={product.name} />

        <span className="coming-soon-badge">
          Coming Soon
        </span>
      </div>

      <div className="coming-soon-info">
        <p>{product.category}</p>
        <h3>{product.name}</h3>
      </div>
    </div>
  );
}

export default ComingSoonCard;