import React, { useState, useEffect } from 'react';

interface Document {
  id: number;
  title: string;
  document_type: string;
  description: string | null;
  file_url: string;
  file_name: string;
  is_active: boolean;
  created_at: string;
}

const documentTypes = [
  { id: 'company_intro', name: '회사 소개서' },
  { id: 'media_mix', name: '미디어 믹스 제안서' },
];

const AdminDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    document_type: 'company_intro',
    description: '',
    is_active: true,
  });
  const [file, setFile] = useState<File | null>(null);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents/all', {
        credentials: 'include',
      });
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingDocument && !file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('document_type', formData.document_type);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('is_active', String(formData.is_active));
    if (file) {
      formDataToSend.append('file', file);
    }

    try {
      const url = editingDocument
        ? `/api/documents/${editingDocument.id}`
        : '/api/documents';
      const method = editingDocument ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        credentials: 'include',
        body: formDataToSend,
      });

      setShowModal(false);
      setEditingDocument(null);
      resetForm();
      fetchDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleEdit = (doc: Document) => {
    setEditingDocument(doc);
    setFormData({
      title: doc.title,
      document_type: doc.document_type,
      description: doc.description || '',
      is_active: doc.is_active,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      document_type: 'company_intro',
      description: '',
      is_active: true,
    });
    setFile(null);
  };

  const openNewModal = () => {
    setEditingDocument(null);
    resetForm();
    setShowModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const getTypeName = (type: string) => {
    return documentTypes.find(t => t.id === type)?.name || type;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">문서 관리</h1>
        <button
          onClick={openNewModal}
          className="bg-[#E2002D] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          + 문서 업로드
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : documents.length === 0 ? (
          <div className="p-8 text-center text-gray-500">등록된 문서가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">문서 유형</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">제목</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">파일명</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">등록일</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">상태</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {getTypeName(doc.document_type)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{doc.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{doc.file_name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(doc.created_at)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.is_active ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          다운로드
                        </a>
                        <button
                          onClick={() => handleEdit(doc)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
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
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingDocument ? '문서 수정' : '문서 업로드'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">문서 유형 *</label>
                <select
                  value={formData.document_type}
                  onChange={(e) => setFormData({ ...formData, document_type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                >
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 티핑포인트 회사소개서 2026"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#E2002D]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  파일 {editingDocument ? '' : '*'} (PDF, Excel, Word)
                </label>
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {editingDocument && (
                  <p className="text-sm text-gray-500 mt-1">
                    현재 파일: {editingDocument.file_name}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 text-[#E2002D] rounded"
                />
                <label htmlFor="is_active" className="text-sm text-gray-700">
                  웹사이트에 표시 (활성화)
                </label>
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
                  {editingDocument ? '수정' : '업로드'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocuments;
