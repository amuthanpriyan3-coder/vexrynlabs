import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TechSpotlight } from './components/TechSpotlight';
import { navigateTo } from './utils/navigation';

export default function App() {
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Website Development');

  const scrollToContact = (projectType?: string) => {
    if (projectType) {
      setSelectedProjectType(projectType);
    }
    navigateTo('/contact');
  };

  const scrollToProjects = () => {
    navigateTo('/projects');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] flex flex-col selection:bg-[#CCFF00] selection:text-black">
      {/* Subtle desktop interactive ambient tech spotlight */}
      <TechSpotlight />

      {/* Sticky Header Navigation */}
      <Navbar
        onStartProjectClick={() => scrollToContact()}
        onViewWorkClick={scrollToProjects}
      />


      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onStartProject={() => scrollToContact()}
          onViewWork={scrollToProjects}
        />

        {/* Services Section */}
        <Services
          onSelectService={(serviceTitle) => {
            let mappedType = 'Website Development';
            if (serviceTitle.toLowerCase().includes('app')) {
              mappedType = 'Mobile App Development';
            } else if (serviceTitle.toLowerCase().includes('auto')) {
              mappedType = 'Automation Projects';
            }
            scrollToContact(mappedType);
          }}
        />

        {/* Projects Section */}
        <Projects
          onInquireProject={(projectName) => {
            scrollToContact(`Custom Build: ${projectName}`);
          }}
        />

        {/* About Section */}
        <About />

        {/* Process Section */}
        <Process />

        {/* Contact Section */}
        <Contact initialProjectType={selectedProjectType} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
