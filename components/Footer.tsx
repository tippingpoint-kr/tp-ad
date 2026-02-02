
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://open.kakao.com/o/sq34Yqei" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800 p-8 rounded-2xl transition-all border border-white/5 hover:border-white/10"
            >
              <span className="text-xl font-bold">카카오톡 문의</span>
              <svg className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            
            <a 
              href="#" 
              className="group flex items-center justify-between bg-zinc-900/50 hover:bg-zinc-800 p-8 rounded-2xl transition-all border border-white/5 hover:border-white/10"
            >
              <span className="text-xl font-bold">회사 소개서 바로가기</span>
              <svg className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        <div className="pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <span className="text-3xl font-black tracking-tighter">
                TIPPING<span className="text-tp-red">!</span>POINT
              </span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-400">
                <div className="flex gap-4"><span className="text-gray-600 w-12 shrink-0">상호명</span><span>(주)피드코퍼레이션</span></div>
                <div className="flex gap-4"><span className="text-gray-600 w-12 shrink-0">대표</span><span>이현민</span></div>
                <div className="flex gap-4"><span className="text-gray-600 w-24 shrink-0">사업자 등록번호</span><span>571-86-02237</span></div>
                <div className="flex gap-4 col-span-2"><span className="text-gray-600 w-12 shrink-0">주소</span><span>서울특별시 성동구 연무장 5가길 25 SKV1타워 1204호</span></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
            <div className="text-xs text-gray-600 space-y-2 text-center md:text-left">
              <p>© FEED Corp. All rights reserved.</p>
              <p>(주)피드코퍼레이션의 모든 콘텐츠는 저작권법에 보호를 받으며 무단 전재 및 배포를 금합니다.</p>
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
