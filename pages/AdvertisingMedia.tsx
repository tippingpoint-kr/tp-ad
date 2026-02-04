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
  category: string;
  demographics: {
    ageRange: string;
    gender: string;
  };
  referenceUrl1: string;
  referenceUrl2: string;
}

interface NewsItem {
  title: string;
  thumbnail: string;
  url: string;
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

interface OgPreview {
  title: string;
  image: string;
  description: string;
  url: string;
}

const ChannelModal: React.FC<ChannelModalProps> = ({ channel, onClose }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [blogPreviews, setBlogPreviews] = useState<OgPreview[]>([]);
  const [loadingPreviews, setLoadingPreviews] = useState(false);

  useEffect(() => {
    if (channel?.category === 'press') {
      setLoadingNews(true);
      fetch('/api/news/trotmagazine')
        .then(res => res.json())
        .then(data => setNews(data))
        .catch(err => console.error('Error fetching news:', err))
        .finally(() => setLoadingNews(false));
    } else if (channel?.category === 'blog') {
      const urls = [channel.referenceUrl1, channel.referenceUrl2].filter(Boolean);
      if (urls.length > 0) {
        setLoadingPreviews(true);
        Promise.all(
          urls.map(url => 
            fetch(`/api/og/preview?url=${encodeURIComponent(url)}`)
              .then(res => res.json())
          )
        )
          .then(data => setBlogPreviews(data))
          .catch(err => console.error('Error fetching previews:', err))
          .finally(() => setLoadingPreviews(false));
      }
    }
  }, [channel]);

  if (!channel) return null;

  const embed1 = getEmbedUrl(channel.referenceUrl1);
  const embed2 = getEmbedUrl(channel.referenceUrl2);
  const isBlog = channel.category === 'blog';
  const hasReferences = isBlog ? (channel.referenceUrl1 || channel.referenceUrl2) : (embed1 || embed2);
  const isPress = channel.category === 'press';

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

            <p className="text-gray-600 mb-2">{isPress ? '월 평균 페이지뷰' : channel.category === 'blog' ? '일 평균 방문자수' : '구독자'} <span className="font-bold text-black">{channel.followers}</span></p>
            
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

          {isPress ? (
            <div className="border-t pt-8">
              <h3 className="text-center font-bold text-xl mb-6">최신 뉴스</h3>
              {loadingNews ? (
                <p className="text-center text-gray-400">뉴스를 불러오는 중...</p>
              ) : news.length > 0 ? (
                <div className="space-y-4">
                  {news.map((item, idx) => (
                    <a 
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {item.thumbnail ? (
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <span className="text-pink-500 text-xs font-bold">NEWS</span>
                        </div>
                      )}
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">뉴스를 불러올 수 없습니다.</p>
              )}
            </div>
          ) : hasReferences && (
            <div className="border-t pt-8">
              <h3 className="text-center font-bold text-xl mb-6">REFERENCE</h3>
              {isBlog ? (
                <div className="flex flex-col gap-4">
                  {loadingPreviews ? (
                    <p className="text-center text-gray-400">블로그 정보를 불러오는 중...</p>
                  ) : blogPreviews.length > 0 ? (
                    blogPreviews.map((preview, idx) => (
                      <a 
                        key={idx}
                        href={preview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#03C75A] hover:shadow-lg transition-all bg-white"
                      >
                        {preview.image ? (
                          <img 
                            src={preview.image} 
                            alt={preview.title}
                            className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-32 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#03C75A]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z"/>
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 line-clamp-2 mb-2">{preview.title || '네이버 블로그'}</h4>
                          {preview.description && (
                            <p className="text-sm text-gray-500 line-clamp-2">{preview.description}</p>
                          )}
                          <div className="flex items-center gap-1 mt-2 text-[#03C75A] text-xs font-medium">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.273 12.845 7.376 0H0v24h7.726V11.155L16.624 24H24V0h-7.727v12.845z"/>
                            </svg>
                            NAVER Blog
                          </div>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">블로그 정보를 불러올 수 없습니다.</p>
                  )}
                </div>
              ) : (
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
              )}
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
    { id: 'vote', name: '투표' },
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
    category: ch.category,
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
        return { subtitle: '트로트 콘텐츠의 허브', title: 'GENERAL' };
      case 'press':
        return { subtitle: '공신력 있는 언론 매체를 통한 보도', title: 'PRESS' };
      case 'blog':
        return { subtitle: '자연스러운 블로그 바이럴 마케팅', title: 'BLOG' };
      case 'reputation':
        return { subtitle: '브랜드 이미지 관리 및 평판 개선', title: 'REPUTATION' };
      case 'vote':
        return { subtitle: '트로트 팬덤 투표 및 이벤트', title: 'VOTE' };
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
              
              {activeTab === 'fandom' && (
                <>
                  <p className="text-tp-red font-bold text-lg mb-4">
                    "시니어의 마음을 가장 잘 아는 파트너, 티핑포인트입니다."
                  </p>
                  <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                    티핑포인트는 단순한 운영을 넘어, 시니어 팬덤의 정서와 문화를 깊이 파고듭니다. '대학' 시리즈 채널을 통해 구축한 탄탄한 팬덤 네트워크와 10명 이상의 베테랑 에디터들이 시니어 타겟에 최적화된 트렌디한 콘텐츠를 매일 생산합니다.
                  </p>
                  <p className="text-gray-700">
                    브랜드가 전하고 싶은 메시지를 시니어가 가장 좋아하는 언어로 번역하여, 강력한 팬덤의 지지를 이끌어내는 최상의 마케팅 솔루션을 제공합니다.
                  </p>
                </>
              )}

              {activeTab === 'general' && (
                <>
                  <p className="text-tp-red font-bold text-lg mb-4">
                    "트로트 트렌드의 중심에서 시니어의 라이프스타일을 선도합니다."
                  </p>
                  <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
                    티핑포인트는 특정 팬덤에 국한되지 않고, 트로트 산업 전반의 이슈와 다양한 아티스트의 소식을 발 빠르게 전하는 종합 미디어 채널을 운영합니다. '트롯매거진', '트롯연구소' 등 각기 다른 전문성을 가진 채널 네트워크를 통해 시니어 세대의 관심사를 정밀하게 파악하고 최적화된 콘텐츠를 매일 생산합니다.
                  </p>
                  <p className="text-gray-700">
                    시니어가 가장 신뢰하는 채널을 통해 브랜드의 메시지를 전달하여, 광범위한 시니어 시장에서 확실한 존재감을 각인시켜 드립니다.
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

            </div>

            {activeTab === 'reputation' ? (
              <div className="border-t border-gray-200 pt-12 space-y-16">
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                  <h2 className="text-2xl font-black text-center mb-8">팬덤 안정화 및 긍정 여론 구축 캠페인</h2>
                  <p className="text-center text-gray-600 mb-8">
                    최근 연예계는 탈세, 학폭, 갑질, 정치발언 등의 논란이 잦습니다.
                  </p>
                  <p className="text-center text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
                    특히 트로트 팬덤은 정보 확산 속도가 빠르고 콘텐츠 방향성에 큰 영향을 받기 때문에<br/>
                    <span className="text-tp-red font-bold">즉각적이고 적극적인 대응</span>이 필요합니다.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-3xl mb-2">😰</div>
                      <p className="text-sm text-gray-700 font-medium">논란 발생 시<br/>팬덤 이탈 조짐</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-3xl mb-2">📉</div>
                      <p className="text-sm text-gray-700 font-medium">부정 콘텐츠 증가<br/>및 시장 확산</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-3xl mb-2">📭</div>
                      <p className="text-sm text-gray-700 font-medium">긍정 콘텐츠<br/>부족</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-3xl mb-2">🤷</div>
                      <p className="text-sm text-gray-700 font-medium">팬덤 결집<br/>명분 부재</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-center mb-2">
                    <span className="text-tp-red">티핑포인트</span>는
                  </h2>
                  <p className="text-center text-gray-500 mb-8">다년간의 경험으로 위기를 기회로 바꿉니다</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    <div className="border border-gray-200 rounded-xl p-5 hover:border-tp-red transition-colors">
                      <div className="text-tp-red font-black text-2xl mb-2">14개</div>
                      <p className="text-gray-700 text-sm">트로트 특화 유튜브 채널 운영<br/><span className="text-gray-500 text-xs">(이미 리딩 채널로 콘텐츠 확산 가능)</span></p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 hover:border-tp-red transition-colors">
                      <div className="text-tp-red font-black text-2xl mb-2">50개+</div>
                      <p className="text-gray-700 text-sm">일일 쇼츠 발행량</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 hover:border-tp-red transition-colors">
                      <div className="text-tp-red font-black text-2xl mb-2">25건+</div>
                      <p className="text-gray-700 text-sm">트롯매거진 일일 기사 발행</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 hover:border-tp-red transition-colors">
                      <div className="text-tp-red font-black text-2xl mb-2">개발중</div>
                      <p className="text-gray-700 text-sm">트로트 팬덤 슈퍼앱 프로젝트</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 hover:border-tp-red transition-colors">
                      <div className="text-tp-red font-black text-2xl mb-2">다수</div>
                      <p className="text-gray-700 text-sm">부정 여론을 긍정 여론으로<br/>뒤바꾼 경험</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-5 hover:border-tp-red transition-colors">
                      <div className="text-tp-red font-black text-2xl mb-2">다수</div>
                      <p className="text-gray-700 text-sm">트로트 경연 프로그램 도중<br/>팬덤 결집 경험</p>
                    </div>
                  </div>
                </section>

                <section className="bg-gray-900 text-white rounded-2xl p-8">
                  <h2 className="text-2xl font-black text-center mb-2">캠페인 상세내용</h2>
                  <p className="text-center text-gray-400 mb-8">4주 집중 캠페인</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-tp-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                        <h3 className="font-bold">유튜브 쇼츠</h3>
                      </div>
                      <p className="text-gray-300 text-sm">하루 6개 이상, 다채널 전방위 업로드</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-tp-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                        <h3 className="font-bold">기사 발행</h3>
                      </div>
                      <p className="text-gray-300 text-sm">트롯매거진 하루 2건 이상 긍정 콘텐츠 발행</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-tp-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                        <h3 className="font-bold">팬덤 심리 케어</h3>
                      </div>
                      <p className="text-gray-300 text-sm">팬덤 결집 메시지·긍정 서사 반복 노출</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-tp-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">4</span>
                        <h3 className="font-bold">시장 리딩</h3>
                      </div>
                      <p className="text-gray-300 text-sm">타 채널 확산 효과로 긍정 여론 주도</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-black text-center mb-8">기대 효과</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100">
                      <div className="text-4xl mb-3">🛡️</div>
                      <p className="font-bold text-gray-800">팬덤 이탈 방지</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
                      <div className="text-4xl mb-3">📈</div>
                      <p className="font-bold text-gray-800">부정 여론 감소</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
                      <div className="text-4xl mb-3">✨</div>
                      <p className="font-bold text-gray-800">브랜드 이미지 회복</p>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
                      <div className="text-4xl mb-3">🔄</div>
                      <p className="font-bold text-gray-800">시장 분위기 반전</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl p-8 text-center text-white" style={{ background: 'linear-gradient(to right, #E2002D, #dc2626)' }}>
                  <h2 className="text-2xl font-black mb-4 text-white">티핑포인트는</h2>
                  <p className="text-lg mb-6 max-w-2xl mx-auto leading-relaxed text-white">
                    트로트 업계에서 <strong>가장 강력한 콘텐츠 파이프라인</strong>과 <strong>실전 경험</strong>을 보유하고 있습니다.
                  </p>
                  <p className="text-xl text-white mb-8 max-w-xl mx-auto">
                    <span className="font-black text-white text-2xl">1개월 안에</span> 여론 방향을 안정화시키고 팬덤 결집력을 회복시킬 수 있습니다.
                  </p>
                  <div className="border-t border-white/20 pt-6 mt-6">
                    <p className="text-white text-lg mb-6">
                      트로트 경연 대회에서 팬덤 결집이 필요한 상황에<br/>콘텐츠의 힘이 필요하시다면
                    </p>
                    <a 
                      href="https://open.kakao.com/o/sq34Yqei" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-tp-red font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg"
                    >
                      문의하기
                    </a>
                  </div>
                </section>
              </div>
            ) : loading ? (
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
