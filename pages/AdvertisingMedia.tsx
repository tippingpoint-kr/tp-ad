import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type TabType = 'fandom' | 'general' | 'press' | 'blog' | 'reputation';

interface Channel {
  id: string;
  name: string;
  handle: string;
  image: string;
  followers: string;
  tags: string[];
  description: string;
  demographics: {
    ageRange: string;
    gender: string;
  };
  references: {
    title: string;
    views: string;
    likes: string;
    comments: string;
    image: string;
  }[];
}

interface ChannelModalProps {
  channel: Channel | null;
  onClose: () => void;
}

const ChannelModal: React.FC<ChannelModalProps> = ({ channel, onClose }) => {
  if (!channel) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm mb-2">{channel.handle}</p>
            <h2 className="text-3xl font-black mb-6">{channel.name}</h2>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {channel.tags.map((tag, idx) => (
                <span key={idx} className="px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-400 text-xs mb-6">* 해당 SNS 버튼 클릭시 해당 홈페이지로 연결됩니다.</p>

            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              </svg>
            </div>

            <p className="text-gray-600 mb-2">Follower <span className="font-bold text-black">{channel.followers}</span></p>
            
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
              {channel.description}
            </p>

            <div className="flex justify-center gap-8 text-sm">
              <div>
                <span className="text-gray-500">구독자 연령층</span>
                <span className="ml-2 font-bold">{channel.demographics.ageRange}</span>
              </div>
              <div>
                <span className="text-gray-500">성비</span>
                <span className="ml-2 font-bold">{channel.demographics.gender}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-center font-bold text-xl mb-6">REFERENCE</h3>
            <div className="grid grid-cols-2 gap-4">
              {channel.references.map((ref, idx) => (
                <div key={idx} className="border rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{ref.title}</span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
                      <span>♡</span>
                      <span>💬</span>
                      <span>↗</span>
                      <span className="ml-auto">🔖</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      조회 {ref.views} · 좋아요 {ref.likes} · 댓글 {ref.comments}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvertisingMedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('fandom');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const tabs = [
    { id: 'fandom', name: '시니어 팬덤 채널' },
    { id: 'general', name: '시니어 종합 채널' },
    { id: 'press', name: '언론보도' },
    { id: 'blog', name: '블로그' },
    { id: 'reputation', name: '온라인평판관리' },
  ];

  const fandomChannels: Channel[] = [
    { 
      id: '1',
      name: '후덕남', 
      handle: '@HUDUCK_YAM',
      image: '/images/channel-huduck.png', 
      followers: '91K',
      tags: ['#유머', '#이슈', '#예능', '#먹방'],
      description: '후덕남은 음식, 먹방 등 식품에 관련된 콘텐츠와 각종 모든 이슈를 다루고 있어 폭넓은 바이럴 광고가 가능한 채널입니다.',
      demographics: { ageRange: '20-40', gender: '남 32% 여 68%' },
      references: [
        { title: '경험 없으면 절대 모른다는 대한민국 장례식의 현실..', views: '371만', likes: '1.8만', comments: '480', image: '' },
        { title: '냉부 출신이라 15초 남아도 손 안떨림', views: '410만', likes: '7.3만', comments: '215', image: '' },
      ]
    },
    { 
      id: '2',
      name: '영웅대학', 
      handle: '@HERO_UNIV',
      image: '/images/channel-hero.png', 
      followers: '120K',
      tags: ['#트로트', '#임영웅', '#팬덤'],
      description: '임영웅 팬덤을 위한 전문 채널로, 트로트 시니어 팬층에게 자연스러운 노출이 가능합니다.',
      demographics: { ageRange: '40-60', gender: '남 25% 여 75%' },
      references: [
        { title: '임영웅 콘서트 비하인드', views: '250만', likes: '3.2만', comments: '890', image: '' },
        { title: '팬들이 직접 만든 응원 영상', views: '180만', likes: '2.1만', comments: '456', image: '' },
      ]
    },
    { 
      id: '3',
      name: '트롯매거진', 
      handle: '@TROT_MAG',
      image: '/images/channel-trot.png', 
      followers: '85K',
      tags: ['#트로트', '#뉴스', '#인터뷰'],
      description: '트로트 관련 최신 뉴스와 아티스트 인터뷰를 제공하는 공식 미디어 채널입니다.',
      demographics: { ageRange: '35-55', gender: '남 40% 여 60%' },
      references: [
        { title: '2026 트로트 어워즈 현장', views: '320만', likes: '4.5만', comments: '1.2천', image: '' },
        { title: '신인 트로트 가수 특집', views: '95만', likes: '1.1만', comments: '320', image: '' },
      ]
    },
  ];

  const generalChannels: Channel[] = [
    { 
      id: '4',
      name: '시니어라이프', 
      handle: '@SENIOR_LIFE',
      image: '/images/channel-senior.png', 
      followers: '75K',
      tags: ['#시니어', '#라이프스타일', '#건강'],
      description: '5070 액티브 시니어를 위한 라이프스타일 콘텐츠를 제공합니다.',
      demographics: { ageRange: '50-70', gender: '남 45% 여 55%' },
      references: [
        { title: '건강한 노후를 위한 운동법', views: '150만', likes: '2.3만', comments: '560', image: '' },
        { title: '시니어 여행 추천 코스', views: '120만', likes: '1.8만', comments: '380', image: '' },
      ]
    },
  ];

  const getChannels = () => {
    switch (activeTab) {
      case 'fandom':
        return fandomChannels;
      case 'general':
        return generalChannels;
      default:
        return [];
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'fandom':
        return { subtitle: '트로트 팬덤 타겟, 높은 충성도의 시니어 구독자', title: 'FANDOM' };
      case 'general':
        return { subtitle: '다양한 시니어 라이프스타일 콘텐츠', title: 'GENERAL' };
      case 'press':
        return { subtitle: '공신력 있는 언론 매체를 통한 보도', title: 'PRESS' };
      case 'blog':
        return { subtitle: '자연스러운 블로그 바이럴 마케팅', title: 'BLOG' };
      case 'reputation':
        return { subtitle: '브랜드 이미지 관리 및 평판 개선', title: 'REPUTATION' };
      default:
        return { subtitle: '', title: '' };
    }
  };

  const { subtitle, title } = getTabTitle();
  const channels = getChannels();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isSubpage={true} />

      <div className="pt-24 flex flex-1">
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
            <div className="text-center mb-16">
              <p className="text-gray-500 mb-4">{subtitle}</p>
              <h1 className="text-5xl md:text-7xl font-black italic mb-8">{title}</h1>
              
              {(activeTab === 'fandom' || activeTab === 'general') && (
                <>
                  <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                    약 10년간 다양한 콘텐츠를 만들어가며 SNS 채널을 직접 운영한 노하우를 바탕으로 각 채널별 담당자들과
                    10명 이상의 에디터들이 트렌디한 콘텐츠를 제작해 최상의 채널을 유지 및 관리하고 있습니다.
                  </p>
                  <p className="text-gray-700">
                    <span className="text-blue-600 font-bold">브랜드 타겟 맞춤 채널 추천 및 업로드</span>를 도와드리며, 
                    <span className="text-blue-600 font-bold">저렴한 가격으로 자연스러운 노출</span>을 희망하는 광고주분들께 추천드립니다.
                  </p>
                </>
              )}

              {activeTab === 'press' && (
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  신뢰도 높은 언론 매체를 통해 브랜드의 공신력을 높이고, 타겟 고객에게 효과적으로 메시지를 전달합니다.
                </p>
              )}

              {activeTab === 'blog' && (
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  검색 최적화된 블로그 콘텐츠를 통해 자연스러운 브랜드 노출과 장기적인 마케팅 효과를 제공합니다.
                </p>
              )}

              {activeTab === 'reputation' && (
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  온라인 평판 모니터링 및 관리를 통해 브랜드 이미지를 개선하고 위기 상황에 신속하게 대응합니다.
                </p>
              )}
            </div>

            {channels.length > 0 && (
              <div className="border-t border-gray-200 pt-12">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-tp-red font-bold text-xl">대표 {tabs.find(t => t.id === activeTab)?.name}</h2>
                  <span className="text-gray-400 text-sm">* 채널 로고 클릭 시 상세 페이지로 연결 됩니다.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {channels.map((channel) => (
                    <div 
                      key={channel.id} 
                      className="text-center group cursor-pointer"
                      onClick={() => setSelectedChannel(channel)}
                    >
                      <div className="w-48 h-48 mx-auto mb-4 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-4xl font-black text-gray-400">{channel.name.charAt(0)}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{channel.name}</h3>
                      <p className="text-gray-500 text-sm">팔로워 {channel.followers}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {channels.length === 0 && (
              <div className="border-t border-gray-200 pt-12">
                <p className="text-center text-gray-400">콘텐츠 준비 중입니다.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <div className="ml-64">
        <Footer />
      </div>

      <ChannelModal channel={selectedChannel} onClose={() => setSelectedChannel(null)} />
    </div>
  );
};

export default AdvertisingMedia;
