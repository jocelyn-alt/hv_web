import React from 'react';

const WhatsAppTab = () => {
  const stats = [
    { label: 'Sent', value: '1,240', sub: 'MTD', bg: 'from-emerald-50 to-white', border: 'border-emerald-100', iconBg: 'bg-emerald-100 border-emerald-200', icon: 'text-emerald-600' },
    { label: 'Delivered', value: '90%', sub: '1,112', bg: 'from-teal-50 to-white', border: 'border-teal-100', iconBg: 'bg-teal-100 border-teal-200', icon: 'text-teal-600' },
    { label: 'Read', value: '73%', sub: '892', bg: 'from-blue-50 to-white', border: 'border-blue-100', iconBg: 'bg-blue-100 border-blue-200', icon: 'text-blue-600' },
    { label: 'Replied', value: '21%', sub: '268', bg: 'from-purple-50 to-white', border: 'border-purple-100', iconBg: 'bg-purple-100 border-purple-200', icon: 'text-purple-600' },
    { label: 'Avg Response', value: '2h 14m', sub: '', bg: 'from-amber-50 to-white', border: 'border-amber-100', iconBg: 'bg-amber-100 border-amber-200', icon: 'text-amber-600' },
  ];

  const messages = [
    { name: 'John T', coach: 'Sulin', time: 'Today 11:05', status: 'Replied', statusBg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { name: 'Mdm Wong', coach: 'Aida', time: 'Yesterday', status: 'Read', statusBg: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Mr Lim', coach: 'Hana', time: 'Yesterday', status: 'Sent', statusBg: 'bg-gray-100 text-gray-600 border-gray-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.bg} rounded-2xl p-5 border ${s.border} shadow-sm text-center`}>
            <div className={`w-12 h-12 ${s.iconBg} border rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <svg className={`w-6 h-6 ${s.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
            {s.sub && <p className="text-xs text-gray-400 mt-1">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Recent Messages
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {messages.map((m) => (
            <div key={m.name} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-600 font-bold">
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.coach} • {m.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 ${m.statusBg} border text-xs font-semibold rounded-full`}>{m.status}</span>
                <button className="px-4 py-1.5 bg-teal-50 text-teal-600 border border-teal-200 text-xs font-semibold rounded-full hover:bg-teal-100 transition-colors">
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppTab;
