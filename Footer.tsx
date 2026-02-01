
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
          <div className="space-y-6">
            <span className="text-4xl font-black tracking-tighter">
              TIPPING<span className="text-tp-red">!</span>POINT
            </span>
            <p className="text-gray-500 max-w-sm text-sm">
              티핑포인트는 시니어 팬덤 트래픽을 넘어, 시니어 팬덤 플랫폼으로 나아가는 디지털 미디어 기업입니다.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-4">
              <h5 className="font-bold text-tp-red text-sm uppercase tracking-widest">Company</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">회사소개</a></li>
                <li><a href="#" className="hover:text-white">팀 소개</a></li>
                <li><a href="#" className="hover:text-white">파트너사</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-tp-red text-sm uppercase tracking-widest">Media</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">유튜브</a></li>
                <li><a href="#" className="hover:text-white">트롯매거진</a></li>
                <li><a href="#" className="hover:text-white">블로그</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-tp-red text-sm uppercase tracking-widest">Social</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p>회사명: 티핑포인트 | 대표이사: 남시우 | 설립일: 2024.01.22</p>
            <p>주소: 경기도 평택시 고덕여염로 118, SBC 716호 | 사업영역: 미디어콘텐츠창작업, 포털 및 기타 인터넷 정보 매개 서비스업</p>
            <p>© 2025 Tippingpoint Corp. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
