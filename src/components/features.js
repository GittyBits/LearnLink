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
          <h4>Smart Study Tools for Personalized Learning</h4>
          <p>To help students study better, the website includes smart study tools that enable note editing, progress tracking, 
            and personalized suggestions for improving study habits. These tools adapt to individual learning needs, 
            making the study process more efficient and effective. With features like flashcards, mind maps, and spaced repetition,
             students can enhance their retention and achieve better academic outcomes.
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
          <h4>VideoHub for Interactive Learning</h4>
          <p>Our study website features a dynamic VideoHub that serves as a centralized resource for educational videos 
            across various subjects. Students can easily filter content by topic, bookmark videos for future reference,
             and access high-quality visual explanations to complement their studies. 
             This feature encourages interactive learning and caters to different learning styles,
              making complex concepts easier to understand.

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
          <h4>Notes Publishing and Collaboration</h4>
          <p>We provide a platform where students and educators can publish,
             share, and discover notes tailored to specific courses or topics. This collaborative
              feature fosters a community-driven learning environment, allowing users to benefit from diverse 
              perspectives and well-organized materials. Additionally, a peer-review system ensures the 
              quality of shared content, making it reliable and beneficial for everyone.

          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
