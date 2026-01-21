import React from 'react';
import { fmt, clinics } from '../data';

const ComparePerformance = ({ selected, allData }) => {
  const realClinicsWithData = clinics.filter(c => c.id !== 'all' && allData[c.id]);
  const sortedClinics = [...realClinicsWithData].sort((a, b) => (allData[b.id]?.mtd || 0) - (allData[a.id]?.mtd || 0));
  const clinicsToShow = selected.includes('all') ? sortedClinics : sortedClinics.filter(c => selected.includes(c.id));

  const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
  const cardColors = [
    { bg: 'bg-amber-100 border-amber-200', txt: 'text-amber-700', cardBg: 'from-amber-50 to-white', border: 'border-amber-300' },
    { bg: 'bg-gray-100 border-gray-200', txt: 'text-gray-600', cardBg: 'from-gray-50 to-white', border: 'border-gray-200' },
    { bg: 'bg-orange-100 border-orange-200', txt: 'text-orange-600', cardBg: 'from-orange-50 to-white', border: 'border-orange-200' },
    { bg: 'bg-teal-100 border-teal-200', txt: 'text-teal-600', cardBg: 'from-teal-50 to-white', border: 'border-teal-200' },
    { bg: 'bg-purple-100 border-purple-200', txt: 'text-purple-600', cardBg: 'from-purple-50 to-white', border: 'border-purple-200' },
    { bg: 'bg-blue-100 border-blue-200', txt: 'text-blue-600', cardBg: 'from-blue-50 to-white', border: 'border-blue-200' },
  ];

  if (clinicsToShow.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No clinics selected with data available</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clinicsToShow.map((c, i) => {
          const d = allData[c.id];
          const color = cardColors[i % cardColors.length];
          const waitTime = Math.floor(10 + Math.random() * 8);
          return (
            <div key={c.id} className={`bg-gradient-to-br ${color.cardBg} rounded-2xl border-2 ${i === 0 ? color.border + ' shadow-md' : 'border-gray-200'} shadow-sm p-6`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{rankEmojis[i] || '🏥'}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 ${color.bg} border rounded-xl flex items-center justify-center ${color.txt} font-bold text-sm`}>
                        {c.short}
                      </div>
                      <p className="font-bold text-gray-900 text-lg">{c.short}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{c.name}</p>
                  </div>
                </div>
              </div>
              <p className="text-3xl font-bold text-teal-600 mb-4">S${fmt(d.mtd)}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium">Patients</p>
                  <p className="font-bold text-gray-900 text-lg mt-1">{d.patients}/day</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium">Avg Wait</p>
                  <p className="font-bold text-gray-900 text-lg mt-1">{waitTime} min</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparePerformance;
