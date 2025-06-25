import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/images/fondo.jpg'; 

const HeroSection = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h2>Unlimited Movies, Documentaries & More.</h2>
        <div className="movie-info">
          <span className="genre">Action</span>
          <span className="genre">Romance</span>
          <span className="genre">Comedy</span>
          <span className="genre">Thriller</span>
          <span className="genre">Science Fiction</span>
        </div>
        <button className="cta-button">Watch Now</button>
      </div>
    </section>
  );
};

export default HeroSection;
