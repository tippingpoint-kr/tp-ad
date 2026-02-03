
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex flex-col">
            <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-black' : 'text-white'}`}>
              TIPPING<span className="text-tp-red">!</span>POINT
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-10">
          <a 
            href="#target"
            className={`text-sm font-bold hover:text-tp-red transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            서비스 소개
          </a>
          <a 
            href="#stats"
            className={`text-sm font-bold hover:text-tp-red transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            성과 지표
          </a>
          <Link 
            to="/advertising-media"
            className={`text-sm font-bold hover:text-tp-red transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            광고 매체
          </Link>
          <a 
            href="#contact"
            className={`text-sm font-bold hover:text-tp-red transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            문의하기
          </a>
        </nav>

        <a 
          href="#contact"
          className="bg-tp-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-black transition-all inline-block"
        >
          광고 문의
        </a>
      </div>
    </header>
  );
};

export default Header;
