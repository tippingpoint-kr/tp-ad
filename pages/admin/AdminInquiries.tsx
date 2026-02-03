import React, { useState, useEffect } from 'react';

interface Inquiry {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  content: string;
  status: string;
  created_at: string;
}

const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries', {
        credentials: 'include',
      });
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '대기';
      case 'processing':
        return '처리중';
      case 'completed':
        return '완료';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">문의 관리</h1>
        <div className="text-sm text-gray-500">
          총 {inquiries.length}건의 문의
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">접수된 문의가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">접수일시</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">회사명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">담당자</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">이메일</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">연락처</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {formatDate(inquiry.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium">{inquiry.company_name}</td>
                    <td className="px-4 py-3 text-sm">{inquiry.contact_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{inquiry.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{inquiry.phone || '-'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}
                      >
                        <option value="pending">대기</option>
                        <option value="processing">처리중</option>
                        <option value="completed">완료</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          상세
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
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

      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">문의 상세</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">접수일시</label>
                  <p className="font-medium">{formatDate(selectedInquiry.created_at)}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">상태</label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedInquiry.status)}`}>
                    {getStatusLabel(selectedInquiry.status)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">회사명</label>
                <p className="font-medium">{selectedInquiry.company_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">담당자</label>
                  <p className="font-medium">{selectedInquiry.contact_name}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">연락처</label>
                  <p className="font-medium">{selectedInquiry.phone || '-'}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">이메일</label>
                <p className="font-medium">{selectedInquiry.email}</p>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">문의 내용</label>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedInquiry.content}
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
