import React from "react";

function Features() {
  return (
    <section className="features container">
      <div className="feature-box">
        <div className="feature-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/Screenshot 2024-11-05 at 6.47.33 PM.png`} // Ensure the correct path
            alt="Feature 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="feature-content">
          <h4>Feature 1</h4>
          <p>Feature 1 description goes here. It provides users with the ability to do XYZ.</p>
        </div>
      </div>
      <div className="feature-box">
        <div className="feature-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/Screenshot 2024-11-05 at 6.33.25 PM.png`} // Adjust paths for other images if necessary
            alt="Feature 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="feature-content">
          <h4>Feature 2</h4>
          <p>Feature 2 description goes here. It provides users with the ability to do XYZ.</p>
        </div>
      </div>
      <div className="feature-box">
        <div className="feature-image">
          <img
            src={`${process.env.PUBLIC_URL}/images/Screenshot 2024-11-05 at 6.56.54 PM.png`} // Adjust paths for other images if necessary
            alt="Feature 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="feature-content">
          <h4>Feature 3</h4>
          <p>Feature 3 description goes here. It provides users with the ability to do XYZ.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
