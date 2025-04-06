import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DarkModeToggle from './components/DarkModeToggle';
import DataEntryPage from './components/DataEntryPage';

import './App.css';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const handleDataSubmit = (data) => {
    setPortfolioData(data);
    // Store data in localStorage to persist between page refreshes
    // localStorage.setItem('portfolioData', JSON.stringify(data));
  };
  
  // Load saved data on initial render
  // useEffect(() => {
  //   const savedData = localStorage.getItem('portfolioData');
  //   if (savedData) {
  //     setPortfolioData(JSON.parse(savedData));
  //   }
  // }, []);
  
  // Portfolio view component
  const PortfolioView = () => {
    if (!portfolioData) {
      return <Navigate to="/data-entry" />;
    }
    
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Navbar />
        <HeroSection 
          name={portfolioData.name} 
          shortBio={portfolioData.shortBio} 
        />
        <AboutSection 
          profilePicture={portfolioData.aboutMe.profilePicture}
          skills={portfolioData.aboutMe.skills}
          interests={portfolioData.aboutMe.interests}
          description={portfolioData.aboutMe.description}
        />
        <ProjectsSection 
          initialProjects={portfolioData.projects} 
        />
        <ContactSection />
        <Footer 
          socialMedia={portfolioData.socialMedia} 
        />
        <DarkModeToggle 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
      </div>
    );
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/data-entry" element={
          <DataEntryPage onSubmit={handleDataSubmit} />
        } />
        <Route path="/portfolio" element={<PortfolioView />} />
        <Route path="/" element={
          portfolioData ? 
            <Navigate to="/portfolio" /> : 
            <Navigate to="/data-entry" />
        } />
      </Routes>
    </Router>
  );
}

export default App;