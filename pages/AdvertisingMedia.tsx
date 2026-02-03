import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type TabType = 'fandom' | 'general' | 'press' | 'blog' | 'reputation';

interface DBChannel {
  id: number;
  name: string;
  category: string;
  logo_url: string | null;
  hashtags: string | null;
  subscribers: string | null;
  age_demographics: string | null;
  gender_ratio: string | null;
  description: string | null;
  reference_url: string | null;
  reference_url_2: string | null;
}

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
  referenceUrl1: string;
  referenceUrl2: string;
}

interface ChannelModalProps {
  channel: Channel | null;
  onClose: () => void;
}

const getEmbedUrl = (url: string): string | null => {
  if (!url) return null;
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?\/\s]+)/)?.[1];
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('instagram.com')) {
    const match = url.match(/instagram\.com\/(?:p|reel)\/([^\/\?]+)/);
    if (match) return `https://www.instagram.com/p/${match[1]}/embed`;
  }
  return null;
};

const ChannelModal: React.FC<ChannelModalProps> = ({ channel, onClose }) => {
  if (!channel) return null;

  const embed1 = getEmbedUrl(channel.referenceUrl1);
  const embed2 = getEmbedUrl(channel.referenceUrl2);
  const hasReferences = embed1 || embed2;

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


            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
              {channel.image ? (
                <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-black text-gray-400">{channel.name.charAt(0)}</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 mb-2">구독자 <span className="font-bold text-black">{channel.followers}</span></p>
            
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

          {hasReferences && (
            <div className="border-t pt-8">
              <h3 className="text-center font-bold text-xl mb-6">REFERENCE</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {embed1 && (
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe 
                      src={embed1} 
                      className="w-full h-full" 
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                )}
                {embed2 && (
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe 
                      src={embed2} 
                      className="w-full h-full" 
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdvertisingMedia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('fandom');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [dbChannels, setDbChannels] = useState<DBChannel[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'fandom', name: '시니어 팬덤 채널' },
    { id: 'general', name: '시니어 종합 채널' },
    { id: 'press', name: '언론보도' },
    { id: 'blog', name: '블로그' },
    { id: 'reputation', name: '온라인평판관리' },
  ];

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/channels?category=${activeTab}`);
        const data = await response.json();
        setDbChannels(data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChannels();
  }, [activeTab]);

  const convertDBChannel = (ch: DBChannel): Channel => ({
    id: String(ch.id),
    name: ch.name,
    handle: `@${ch.name.toUpperCase().replace(/\s/g, '_')}`,
    image: ch.logo_url || '',
    followers: ch.subscribers || '0',
    tags: ch.hashtags ? ch.hashtags.split(' ').filter(t => t) : [],
    description: ch.description || '',
    demographics: {
      ageRange: ch.age_demographics || '',
      gender: ch.gender_ratio || '',
    },
    referenceUrl1: ch.reference_url || '',
    referenceUrl2: ch.reference_url_2 || '',
  });

  const getChannels = (): Channel[] => {
    return dbChannels.map(convertDBChannel);
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
        <aside className="w-64 flex-shrink-0 bg-gray-50 border-r border-gray-100 p-8">
          <div className="sticky top-24">
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
          </div>
        </aside>

        <main className="flex-1 p-12">
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

            {loading ? (
              <div className="border-t border-gray-200 pt-12">
                <p className="text-center text-gray-400">채널을 불러오는 중...</p>
              </div>
            ) : channels.length > 0 ? (
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
                        {channel.image ? (
                          <img src={channel.image} alt={channel.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-4xl font-black text-gray-400">{channel.name.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{channel.name}</h3>
                      <p className="text-gray-500 text-sm">팔로워 {channel.followers}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-12">
                <p className="text-center text-gray-400">콘텐츠 준비 중입니다.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />

      <ChannelModal channel={selectedChannel} onClose={() => setSelectedChannel(null)} />
    </div>
  );
};

export default AdvertisingMedia;
