
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import TargetInsight from './components/TargetInsight';
import MediaSolutions from './components/MediaSolutions';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section id="hero">
          <Hero />
        </section>
        
        <section id="target" className="bg-white scroll-mt-24">
          <TargetInsight />
        </section>

        <section id="stats" className="bg-black text-white scroll-mt-24">
          <Statistics />
        </section>

        <section id="media" className="bg-gray-50 scroll-mt-24">
          <MediaSolutions />
        </section>

        <section id="contact" className="bg-white py-20 scroll-mt-24">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
