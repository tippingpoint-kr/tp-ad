
import React from 'react';

const Statistics: React.FC = () => {
  const stats = [
    { label: '연간 유튜브 조회수', value: '7.74억+', sub: '2025년 기준' },
    { label: '총 구독자 수', value: '100만+', sub: '전 채널 통합' },
    { label: '월 평균 방문자(매거진)', value: '400,000+', sub: '트롯매거진 웹' },
    { label: '연간 콘텐츠 제작량', value: '25,000+', sub: '2025년 기준' },
  ];

  return (
    <div className="py-24 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-4">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-5xl md:text-6xl font-black text-tp-red">{stat.value}</h3>
              <p className="text-gray-500 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
