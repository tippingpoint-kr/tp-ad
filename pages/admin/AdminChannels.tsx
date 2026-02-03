import React, { useState, useEffect } from 'react';

interface Channel {
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
  display_order: number;
}

const categories = [
  { id: 'fandom', name: '시니어 팬덤 채널' },
  { id: 'general', name: '시니어 종합 채널' },
  { id: 'press', name: '언론보도' },
  { id: 'blog', name: '블로그' },
  { id: 'reputation', name: '온라인평판관리' },
];

const AdminChannels: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    category: 'fandom',
    hashtags: '',
    subscribers: '',
    age_demographics: '',
    gender_ratio: '',
    description: '',
    reference_url: '',
    reference_url_2: '',
    display_order: 0,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const fetchChannels = async () => {
    try {
      const url = selectedCategory === 'all' 
        ? '/api/channels' 
        : `/api/channels?category=${selectedCategory}`;
      const response = await fetch(url);
      const data = await response.json();
      setChannels(data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, String(value));
    });
    if (logoFile) {
      formDataToSend.append('logo', logoFile);
    }

    try {
      const url = editingChannel 
        ? `/api/channels/${editingChannel.id}` 
        : '/api/channels';
      const method = editingChannel ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        credentials: 'include',
        body: formDataToSend,
      });

      setShowModal(false);
      setEditingChannel(null);
      resetForm();
      fetchChannels();
    } catch (error) {
      console.error('Error saving channel:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/channels/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      fetchChannels();
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  const handleEdit = (channel: Channel) => {
    setEditingChannel(channel);
    setFormData({
      name: channel.name,
      category: channel.category,
      hashtags: channel.hashtags || '',
      subscribers: channel.subscribers || '',
      age_demographics: channel.age_demographics || '',
      gender_ratio: channel.gender_ratio || '',
      description: channel.description || '',
      reference_url: channel.reference_url || '',
      reference_url_2: channel.reference_url_2 || '',
      display_order: channel.display_order,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'fandom',
      hashtags: '',
      subscribers: '',
      age_demographics: '',
      gender_ratio: '',
      description: '',
      reference_url: '',
      reference_url_2: '',
      display_order: 0,
    });
    setLogoFile(null);
  };

  const openNewModal = () => {
    setEditingChannel(null);
    resetForm();
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">채널 관리</h1>
        <button
          onClick={openNewModal}
          className="bg-[#E2002D] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          + 채널 추가
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 border-b flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : channels.length === 0 ? (
          <div className="p-8 text-center text-gray-500">등록된 채널이 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">로고</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">채널명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">카테고리</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">구독자</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">순서</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {channels.map((channel) => (
                  <tr key={channel.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {channel.logo_url ? (
                        <img src={channel.logo_url} alt={channel.name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{channel.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {categories.find(c => c.id === channel.category)?.name || channel.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{channel.subscribers || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{channel.display_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(channel)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(channel.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingChannel ? '채널 수정' : '채널 추가'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">채널명 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">로고 이미지</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {editingChannel?.logo_url && !logoFile && (
                  <p className="text-sm text-gray-500 mt-1">현재: {editingChannel.logo_url}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">해시태그</label>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  placeholder="#트로트 #팬덤 #시니어"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.category === 'press' ? '월 평균 페이지뷰' : '구독자수'}
                  </label>
                  <input
                    type="text"
                    value={formData.subscribers}
                    onChange={(e) => setFormData({ ...formData, subscribers: e.target.value })}
                    placeholder={formData.category === 'press' ? '예: 50만' : '예: 10.2만'}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">연령층</label>
                  <input
                    type="text"
                    value={formData.age_demographics}
                    onChange={(e) => setFormData({ ...formData, age_demographics: e.target.value })}
                    placeholder="예: 50-70대 85%"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">성비</label>
                  <input
                    type="text"
                    value={formData.gender_ratio}
                    onChange={(e) => setFormData({ ...formData, gender_ratio: e.target.value })}
                    placeholder="예: 여성 65% / 남성 35%"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                />
              </div>

              {formData.category !== 'press' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">레퍼런스 URL 1 (YouTube/Instagram)</label>
                    <input
                      type="url"
                      value={formData.reference_url}
                      onChange={(e) => setFormData({ ...formData, reference_url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=... 또는 https://instagram.com/p/..."
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">레퍼런스 URL 2 (YouTube/Instagram)</label>
                    <input
                      type="url"
                      value={formData.reference_url_2}
                      onChange={(e) => setFormData({ ...formData, reference_url_2: e.target.value })}
                      placeholder="https://youtube.com/watch?v=... 또는 https://instagram.com/p/..."
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">표시 순서</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E2002D] text-white rounded-lg hover:bg-red-700"
                >
                  {editingChannel ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChannels;
