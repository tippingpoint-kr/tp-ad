
import React from 'react';

const MediaSolutions: React.FC = () => {
  const channels = [
    {
      title: "유튜브 채널",
      tagline: "100만+ 구독자 네트워크",
      desc: "트로트 아티스트 별 타겟 채널과 트로트 종합 채널 운영",
      options: ["롱폼 브랜디드 콘텐츠", "숏폼 바이럴 광고", "커뮤니티 게시글 광고"],
      color: "bg-tp-red"
    },
    {
      title: "트롯매거진",
      subTitle: "(인터넷 언론 + 블로그)",
      tagline: "월 40만+ PV 공식 미디어",
      desc: "국내 최초 트로트 전문 미디어로서 신뢰도 높은 기사 및 정보 제공",
      options: ["네이티브 애드 (기사)", "전면/배너 광고", "언론 보도, 기사 송출"],
      color: "bg-black"
    },
    {
      title: "티라이브",
      tagline: "트로트 팬덤 전용 수퍼앱",
      desc: "준비 개발중",
      options: ["라이브 커머스", "인스트림 광고", "PPL"],
      color: "bg-black"
    }
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            시니어 타겟<br />
            최적의 <span className="text-tp-red">미디어 솔루션</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            티핑포인트가 보유한 다양한 매체는 시니어 타겟팅에 최적화되어 있습니다.<br className="hidden md:block"/>
            고객사의 마케팅 목표에 가장 적합한 믹스를 제안합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {channels.map((channel, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              {/* Accent line */}
              <div className={`absolute top-0 left-0 w-full h-2 ${channel.color}`}></div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 leading-tight flex items-baseline flex-wrap gap-2">
                  {channel.title}
                  {channel.subTitle && (
                    <span className="text-[15px] font-bold text-gray-400 whitespace-nowrap">
                      {channel.subTitle}
                    </span>
                  )}
                </h3>
                <p className="text-tp-red font-bold text-sm mt-2">{channel.tagline}</p>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed min-h-[3rem] font-medium">
                {channel.desc}
              </p>
              
              <div className="flex-grow">
                <ul className="space-y-4">
                  {channel.options.map((opt, i) => (
                    <li key={i} className="flex items-center text-[15px] font-bold text-gray-700">
                      <svg className="w-4 h-4 text-tp-red mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 통합 버튼 영역 - 카드 밖 중앙 배치 */}
        <div className="flex justify-center mt-12">
          <button className="bg-white border-2 border-black text-black px-12 md:px-20 py-5 rounded-2xl font-black text-xl hover:bg-black hover:text-white transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-300">
            통합 채널 소개 바로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaSolutions;
