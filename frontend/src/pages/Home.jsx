import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutMe from '../components/AboutMe';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import { api } from '../api/portfolioApi';
import Loader from '../components/Loader';
import '../styles/global.css';

const Home = () => {
  const [portfolioData, setPortfolioData] = useState({
    projects: [],
    certificates: [],
    info: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projects, certificates, info] = await Promise.all([
          api.getProjects(),
          api.getCertificates(),
          api.getPortfolioInfo()
        ]);
        setPortfolioData({ projects, certificates, info });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader variant="home" />;
  }

  return (
    <div className="home-container">
      <Navbar socialLinks={portfolioData.info?.social_links} />
      <main>
        <Hero info={portfolioData.info} />
        <AboutMe aboutText={portfolioData.info?.about_text} resumeUrl={portfolioData.info?.resume_url} />
        <Skills skills={portfolioData.info?.skills} />
        <Projects projects={portfolioData.projects} />
        <Certificates certificates={portfolioData.certificates} />
        <Contact info={portfolioData.info} />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Abhishek Tripathi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
