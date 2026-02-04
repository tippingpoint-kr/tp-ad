
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isSubpage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSubpage = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isOnSubpage = isSubpage || location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTextColor = () => {
    if (isOnSubpage) return 'text-gray-800';
    return isScrolled ? 'text-gray-800' : 'text-white';
  };

  const getLogoColor = () => {
    if (isOnSubpage) return 'text-black';
    return isScrolled ? 'text-black' : 'text-white';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOnSubpage 
          ? 'bg-white shadow-sm py-4' 
          : isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' 
            : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex flex-col">
            <span className={`text-2xl font-black tracking-tighter ${getLogoColor()}`}>
              TIPPING<span className="text-tp-red">!</span>POINT
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-10">
          <Link 
            to="/"
            className={`text-sm font-bold hover:text-tp-red transition-colors ${getTextColor()}`}
          >
            서비스 소개
          </Link>
          <a 
            href={isOnSubpage ? "/#stats" : "#stats"}
            className={`text-sm font-bold hover:text-tp-red transition-colors ${getTextColor()}`}
          >
            성과 지표
          </a>
          <Link 
            to="/advertising-media"
            className={`text-sm font-bold transition-colors ${
              location.pathname === '/advertising-media' ? 'text-tp-red' : `hover:text-tp-red ${getTextColor()}`
            }`}
          >
            광고 매체
          </Link>
          <a 
            href={isOnSubpage ? "/#contact" : "#contact"}
            className={`text-sm font-bold hover:text-tp-red transition-colors ${getTextColor()}`}
          >
            문의하기
          </a>
        </nav>

        <a 
          href="https://open.kakao.com/o/sq34Yqei"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-tp-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-black transition-all inline-block"
        >
          광고 문의
        </a>
      </div>
    </header>
  );
};

export default Header;
