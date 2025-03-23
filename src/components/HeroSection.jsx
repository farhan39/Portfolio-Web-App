import React from 'react';

function HeroSection({ name, shortBio }) {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
        <p className="text-xl md:text-2xl mb-8">{shortBio}</p>
        <a 
          href="#projects" 
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          View My Work
        </a>
      </div>
    </section>
  );
}

export default HeroSection;