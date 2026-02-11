
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  // 사용자가 요청한 main.png 이미지의 직접 링크 주소입니다.
  const backgroundImageUrl = "/images/main.png"; 

  return (
    <div className="relative h-screen flex items-center bg-zinc-900 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImageUrl} 
          alt="Active Senior Background" 
          className="w-full h-full object-cover opacity-60"
          loading="eager"
          onError={(e) => {
            // 주소가 차단될 경우를 대비한 고화질 대체 이미지 (액티브 시니어 테마)
            const target = e.target as HTMLImageElement;
            if (target.src !== "https://images.unsplash.com/photo-1581579438747-1dc8c17bbce4?auto=format&fit=crop&q=80&w=1920") {
              target.src = "https://images.unsplash.com/photo-1581579438747-1dc8c17bbce4?auto=format&fit=crop&q=80&w=1920";
            }
          }}
        />
        {/* 그라데이션: 왼쪽 텍스트 영역은 어둡게 하여 가독성을 높이고, 오른쪽 이미지는 더 선명하게 노출 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block px-4 py-1 border border-tp-red text-tp-red rounded-full text-sm font-bold mb-8 animate-pulse bg-tp-red/10">
            Active Senior Fandom Marketing No.1
          </div>
          <h1 className="text-white text-5xl md:text-8xl font-black leading-tight mb-8 drop-shadow-2xl">
            5070 <span className="text-tp-red">액티브 시니어</span>를<br />
            움직이는 강력한 임팩트
          </h1>
          <p className="text-gray-200 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mb-10 drop-shadow-md">
            티핑포인트는 트로트 시니어 팬덤에 특화된 멀티채널 콘텐츠 파이프라인을 운영하는 디지털 미디어 기업입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://docs.google.com/spreadsheets/d/1X_QhBEIl_XvTKHIMPIKnKDGbs6SBCQ7V/edit?usp=sharing&ouid=117105025796460421401&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="bg-tp-red text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl inline-block text-center">
              미디어 믹스 제안서 받기
            </a>
            <button onClick={() => navigate('/advertising-media')} className="border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white hover:text-black transition-all backdrop-blur-sm">
              채널 바로 보기
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-tp-red rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
