
import React from 'react';

const TargetInsight: React.FC = () => {
  // 사용자가 제공한 channel.png 이미지 구글 드라이브 ID
  const channelImageUrl = "https://lh3.googleusercontent.com/d/1SlzJvo77NeXLLBS-yTuFNw07yIS4wK8j";

  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Visual Showcase - 인포그래픽 이미지 크기 확대 */}
          <div className="lg:w-[55%] relative w-full flex items-center justify-center">
            <div className="relative z-10 w-full group transition-all duration-500">
              <img 
                src={channelImageUrl} 
                alt="Tippingpoint Channel Infographic" 
                className="w-full h-auto rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200";
                }}
              />
            </div>
          </div>
          
          {/* Text Content - 요청사항에 따른 텍스트 수정 및 버튼 제거 */}
          <div className="lg:w-[45%] space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              168조원의<br />
              <span className="text-tp-red">액티브 시니어 시장</span>을 선점하세요
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              티핑포인트는 단순히 조회수를 넘어, 시니어 팬덤이 모이는 <strong>독자적인 채널 생태계</strong>를 보유하고 있습니다.
              콘텐츠를 자체 제작하여 충성도 높은 100만 구독자 네트워크와 전문 미디어를 통해 귀사의 브랜드를 시니어의 일상 속으로 침투시킵니다.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "압도적인 미디어 점유율", desc: "영웅대학 등 아티스트 특화 채널을 통한 타겟 집중 공략" },
                { title: "공신력 있는 트롯 매거진", desc: "웹/블로그 통합 월 40만 이상 방문자가 신뢰하는 공식 채널" },
                { title: "실질적인 전환 임팩트", desc: "단순 노출을 넘어 팬덤의 팬심을 구매 전환으로 연결하는 바이럴 전략" }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-tp-red flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-tp-red transition-colors">{point.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 버튼 제거됨 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetInsight;
