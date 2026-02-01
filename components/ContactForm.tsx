
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
    setFormData({ company: '', name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto bg-black rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="md:w-1/2 p-12 bg-tp-red text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-black mb-6">당신의 비즈니스를<br />티핑포인트 하세요.</h2>
            <p className="text-white/80 leading-relaxed mb-8">
              시니어 마케팅, 어떻게 시작해야 할지 고민이신가요?<br />
              티핑포인트의 미디어 전문가들이 최적의 전략을 제안해 드립니다.
            </p>
          </div>
          <div className="space-y-6">
            {/* Location Icon & Address */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-base font-semibold">경기도 평택시 고덕여염로 118, SBC 716호</p>
            </div>
            
            {/* Email Icon & Address */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base font-semibold">tippingpoint.kr@gmail.com</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:w-1/2 p-12 bg-white space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-500">회사명</label>
              <input 
                required
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="티핑포인트"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:border-tp-red focus:ring-1 focus:ring-tp-red focus:outline-none transition-all placeholder:text-gray-300 text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-500">담당자 성함</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="홍길동"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:border-tp-red focus:ring-1 focus:ring-tp-red focus:outline-none transition-all placeholder:text-gray-300 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500">이메일 주소</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="example@company.com"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:border-tp-red focus:ring-1 focus:ring-tp-red focus:outline-none transition-all placeholder:text-gray-300 text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500">연락처</label>
            <input 
              required
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="010-0000-0000"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:border-tp-red focus:ring-1 focus:ring-tp-red focus:outline-none transition-all placeholder:text-gray-300 text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-500">문의 내용</label>
            <textarea 
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="협업 제안 또는 광고 문의 내용을 작성해주세요."
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:border-tp-red focus:ring-1 focus:ring-tp-red focus:outline-none transition-all placeholder:text-gray-300 text-gray-800 resize-none"
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-5 rounded-xl font-black text-lg hover:bg-tp-red transition-all mt-4 active:scale-[0.98]">
            문의 보내기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
