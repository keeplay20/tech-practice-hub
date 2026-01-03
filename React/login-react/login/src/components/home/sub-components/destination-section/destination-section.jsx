import "./destination-section.css";

export const DestinationSection = () => {
  return (
    <div className="destination-section">
      <div className="destination-section-content">
        <p className="destination-section-content-title">Top Destinations</p>
        <p className="destination-section-content-description">
          From island escapes to cool mountain towns, discover where your next
          journey will take you.
        </p>
      </div>
      <div className="destination-section-cards">
        <div className="destination-section-card">
          <img
            src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"
            alt="Santorini white-washed buildings overlooking the sea"
          />
          <div className="overlay-container">
            <span className="destination-section-card-title">Santorini</span>
            <div className="destination-section-card-description-container">
              <span className="destination-section-card-description">
                White washed buildings
              </span>
              <span className="separator">|</span>
              <span className="destination-section-card-ratings">⭐ 4.8</span>
            </div>
            <span className="destination-section-card-location">📍 Greece</span>
          </div>
        </div>
      </div>
    </div>
  );
};
