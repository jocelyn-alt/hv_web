import React, { useState } from 'react';

const AskEva = () => {
  const [query, setQuery] = useState('');

  const quickActions = [
    { icon: '📊', label: 'Revenue summary', bg: 'from-teal-50 to-white', border: 'border-teal-100' },
    { icon: '👥', label: 'Patient stats', bg: 'from-purple-50 to-white', border: 'border-purple-100' },
    { icon: '📅', label: 'Appointments', bg: 'from-blue-50 to-white', border: 'border-blue-100' },
    { icon: '💉', label: 'Vaccinations', bg: 'from-emerald-50 to-white', border: 'border-emerald-100' },
    { icon: '📈', label: 'Insights', bg: 'from-amber-50 to-white', border: 'border-amber-100' },
    { icon: '🏥', label: 'Clinic compare', bg: 'from-rose-50 to-white', border: 'border-rose-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-200 rounded-full flex items-center justify-center shadow-inner">
            <span className="text-3xl">✨</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-xl">Eva</p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Online • Ready to help
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
          <p className="text-gray-700">Hi! I'm Eva, your Enterprise Virtual Assistant. How can I help you today?</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {quickActions.map((q) => (
            <button
              key={q.label}
              className={`flex items-center gap-3 p-4 bg-gradient-to-br ${q.bg} border ${q.border} rounded-xl hover:shadow-md transition-all text-left`}
            >
              <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-lg">{q.icon}</span>
              </div>
              <span className="text-sm text-gray-700 font-medium">{q.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask Eva anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
          />
          <button className="px-6 py-3.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskEva;
