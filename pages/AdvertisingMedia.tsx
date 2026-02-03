import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type TabType = 'viral' | 'info' | 'magazine' | 'creator' | 'press' | 'reputation';

interface Channel {
  name: string;
  image: string;
  subscribers?: string;
  description?: string;
}

const AdvertisingMedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('viral');

  const tabs = [
    { id: 'info', name: '정보채널' },
    { id: 'viral', name: '바이럴채널' },
    { id: 'magazine', name: '매거진채널' },
    { id: 'creator', name: '크리에이터' },
    { id: 'press', name: '언론보도' },
    { id: 'reputation', name: '온라인평판관리' },
  ];

  const viralChannels: Channel[] = [
    { name: '1K Good Movies', image: '/images/channel-1k.png', subscribers: '구독자 10만+', description: '영화 리뷰 및 추천 채널' },
    { name: '펭수TV', image: '/images/channel-pengsu.png', subscribers: '구독자 50만+', description: '펭수 관련 콘텐츠 채널' },
    { name: '펭수 라이프', image: '/images/channel-pengsu2.png', subscribers: '구독자 30만+', description: '펭수 일상 콘텐츠 채널' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'viral':
        return (
          <div>
            <div className="text-center mb-16">
              <p className="text-gray-500 mb-4">저비용 고효율, 자연스러운 탐색탭 노출</p>
              <h1 className="text-5xl md:text-7xl font-black italic mb-8">VIRAL</h1>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                약 10년간 다양한 콘텐츠를 만들어가며 SNS 채널을 직접 운영한 노하우를 바탕으로 각 채널별 담당자들과
                10명 이상의 에디터들이 트렌디한 콘텐츠를 제작해 최상의 채널을 유지 및 관리하고 있습니다.
              </p>
              <p className="text-gray-700">
                <span className="text-blue-600 font-bold">브랜드 타겟 맞춤 채널 추천 및 업로드</span>를 도와드리며, 
                <span className="text-blue-600 font-bold">저렴한 가격으로 자연스러운 노출</span>을 희망하는 광고주분들께 추천드립니다.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-12">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-tp-red font-bold text-xl">대표 바이럴 채널</h2>
                <span className="text-gray-400 text-sm">* 채널 로고 클릭 시 상세 페이지로 연결 됩니다.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {viralChannels.map((channel, idx) => (
                  <div key={idx} className="text-center group cursor-pointer">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-4xl font-black text-gray-400">{channel.name.charAt(0)}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{channel.name}</h3>
                    <p className="text-gray-500 text-sm">{channel.subscribers}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'info':
        return (
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-black italic mb-8">INFO</h1>
            <p className="text-gray-500">정보채널 콘텐츠가 준비 중입니다.</p>
          </div>
        );
      case 'magazine':
        return (
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-black italic mb-8">MAGAZINE</h1>
            <p className="text-gray-500">매거진채널 콘텐츠가 준비 중입니다.</p>
          </div>
        );
      case 'creator':
        return (
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-black italic mb-8">CREATOR</h1>
            <p className="text-gray-500">크리에이터 콘텐츠가 준비 중입니다.</p>
          </div>
        );
      case 'press':
        return (
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-black italic mb-8">PRESS</h1>
            <p className="text-gray-500">언론보도 콘텐츠가 준비 중입니다.</p>
          </div>
        );
      case 'reputation':
        return (
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-7xl font-black italic mb-8">REPUTATION</h1>
            <p className="text-gray-500">온라인평판관리 콘텐츠가 준비 중입니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-black tracking-tighter text-black">
              TIPPING<span className="text-tp-red">!</span>POINT
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-10">
            <Link to="/" className="text-sm font-bold text-gray-800 hover:text-tp-red transition-colors">
              홈
            </Link>
            <Link to="/advertising-media" className="text-sm font-bold text-tp-red transition-colors">
              광고 매체
            </Link>
          </nav>

          <Link 
            to="/#contact"
            className="bg-tp-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-black transition-all inline-block"
          >
            광고 문의
          </Link>
        </div>
      </header>

      <div className="pt-24 flex">
        <aside className="w-64 fixed left-0 top-24 bottom-0 bg-gray-50 border-r border-gray-100 p-8">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-12">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdvertisingMedia;
