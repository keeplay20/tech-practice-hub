import "./hero-section.css";

export const HeroSection = () => {
  return (
    <div className="hero-section">
      <img
        className="hero-section-image"
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80"
        alt="hero"
      />
      <div className="hero-section-content-overlay">
        <h1>WANDER</h1>
        <span>Discover the world's most beautiful destinations</span>
        <div className="hero-section-content-overlay-buttons">
          <button>Plan your trip</button>
          <button>Explore destinations</button>
        </div>
      </div>
    </div>
  );
};
