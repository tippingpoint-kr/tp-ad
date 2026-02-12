
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-white py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* Contact Us Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-10">
            Contact us<span className="text-tp-red">.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="https://drive.google.com/file/d/1_PklXE0-RKqkAEo6-9aNNp4TO5uru_fE/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800 p-6 rounded-2xl transition-all border border-white/5 hover:border-white/10"
            >
              <span className="text-lg font-bold">회사 소개서 바로가기</span>
              <svg className="w-5 h-5 flex-shrink-0 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            <a 
              href="https://docs.google.com/spreadsheets/d/1X_QhBEIl_XvTKHIMPIKnKDGbs6SBCQ7V/edit?usp=sharing&ouid=117105025796460421401&rtpof=true&sd=true" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800 p-6 rounded-2xl transition-all border border-white/5 hover:border-white/10"
            >
              <span className="text-lg font-bold">채널 단가 안내 바로가기</span>
              <svg className="w-5 h-5 flex-shrink-0 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            
            <a 
              href="https://open.kakao.com/o/sq34Yqei" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800 p-6 rounded-2xl transition-all border border-white/5 hover:border-white/10"
            >
              <span className="text-lg font-bold">카카오톡 문의</span>
              <svg className="w-5 h-5 flex-shrink-0 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-16 border-t border-white/10">
          <div className="space-y-6 mb-12">
            <span className="text-3xl font-black tracking-tighter">
              TIPPING<span className="text-tp-red">!</span>POINT
            </span>
            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
              티핑포인트는 시니어 팬덤 트래픽을 넘어, 시니어 팬덤 플랫폼으로 나아가는 디지털 미디어 기업입니다.
            </p>
          </div>

          <div className="pt-8 border-t border-white/5 space-y-1 text-xs text-gray-500">
            <p>회사명: 티핑포인트 | 대표이사: 남시우 | 설립일: 2024.01.22</p>
            <p>주소: 경기도 평택시 고덕여염로 118, SBC 716호 | 사업영역: 미디어콘텐츠창작업, 포털 및 기타 인터넷 정보 매개 서비스업</p>
            <p>© 2025 Tippingpoint C<a href="/admin/login" className="hover:text-gray-500">o</a>rp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
