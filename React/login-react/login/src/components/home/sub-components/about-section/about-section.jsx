import "./about-section.css";

export const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-left-section">
        <div className="about-left-section-content">
          <h3>
            Why Thousands of Travelers Choose Wander for Their Adventures?
          </h3>
          <span>
            We're not just a travel agency - we're your trusted partner for
            unforgettable journeys. We're not just a travel agency - we're your
            trusted partner for unforgettable journeys.
          </span>
          <ul>
            <li>
              <img src="src/assets/instagram.png"></img>
            </li>
            <li>
              <img src="src/assets/threads.png"></img>
            </li>
            <li>
              <img src="src/assets/facebook.png"></img>
            </li>
          </ul>
        </div>
        <div className="about-left-section-content-item">
          <div className="about-left-section-content-item-item">
            <img src="src/assets/happiness.png" alt="about-section" />
            <h6>12K</h6>
            <span>Happy Customers</span>
          </div>
          <div className="about-left-section-content-item-item">
            <img src={"src/assets/checked.png"} alt="about-section" />
            <h6>50+</h6>
            <span>Destinations covered</span>
          </div>
          <div className="about-left-section-content-item-item">
            <img src={"src/assets/location.png"} alt="about-section" />
            <h6>10 Yrs</h6>
            <span>Proven Travel Industry Experience</span>
          </div>
        </div>
      </div>
      <div className="about-right-section">
        <div className="about-right-section-item">
          <img
            src={"src/assets/review.png"}
            alt="about-section"
            className="about-right-section-item-image"
          />
          <div className="about-right-section-item-content">
            <h3>Local Expertise</h3>
            <span>
              Our team of local experts ensures you get the best experience and
              insider tips for your destination.
            </span>
          </div>
        </div>
        <img src={"src/assets/calendar.png"} alt="about-section" />
        <h3>All in One Booking</h3>
        <span>Book flights, hotels, tours, and more in one easy step.</span>
        {/* <img src={"src/assets/musical-note.png"} alt="about-section" />
        <h3>24/7 Support</h3>
        <span>
          Our dedicated support team is here to help you every step of the way.
        </span> */}
      </div>
    </div>
  );
};
