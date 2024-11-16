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
          <h4>WHAT IS LEARNLINK?</h4>
          <p>Providing an environment that help students to keep study with the help viewing various documents related to the topics . 
            One platform for all your notes(not just yours even the toppers)
          </p>
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
          <h4>WHO IS LEARNLINK??</h4>
          <p>Helping the students to learn all the topics not just reading but visualing them with the help of VideoHub.
            Understanding concepts made so much simpler.Why search for the best youtube videos, when learnlink is on your fingertips. 
          </p>
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
          <h4>WHY IS LEARNLINK???</h4>
          <p>Being a helpful student not just for the teachers even the students by uploading your own beautiful notes and getting badges.
            Use the upload to easily forward the important documents at the last minutes instead of a whatsapp group. 
            The comment options is there to back you when you have doubts so stop wasting time and START STUDYING PEOPLE.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
