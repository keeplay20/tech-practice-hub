import "./destination-section.css";
import { destinations } from "./destinations";

export const DestinationSection = () => {
  const destinationsList = destinations.destinations;
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
        {destinationsList.map((destination) => (
          <div className="destination-section-card">
            <img src={destination.images[0]} alt="Desitnation image" />
            <div className="overlay-container">
              <span className="destination-section-card-title">
                {destination.name}
              </span>
              <div className="destination-section-card-description-container">
                <span className="destination-section-card-description">
                  {destination.shortDescription}
                </span>
                <span className="separator">|</span>
                <span className="destination-section-card-ratings">
                  ⭐ {destination.rating}
                </span>
              </div>
              <span className="destination-section-card-location">
                📍 {destination.country}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
