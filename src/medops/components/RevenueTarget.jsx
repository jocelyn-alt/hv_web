import React from 'react';
import { fmt, clinics } from '../data';

const RevenueTarget = ({ data, selected, allData, onUpdateTarget, onUpdateTrial }) => {
  const targetVal = selected.length === 1 ? allData[selected[0]]?.target || 0 : selected.reduce((s, id) => s + (allData[id]?.target || 0), 0);
  const trialVal = selected.length === 1
    ? (allData[selected[0]]?.trial || Math.round(targetVal * 1.15))
    : selected.reduce((s, id) => s + (allData[id]?.trial || Math.round((allData[id]?.target || 0) * 1.15)), 0);
  const mtd = data.mtd;
  const gap = Math.max(0, targetVal - mtd);
  const delta = trialVal - targetVal;
  const daysLeft = 31 - new Date().getDate();

  const servicesList = [
    { name: 'Sick Review', price: 60, icon: '🩺' },
    { name: 'Influenza Vaccination', price: 45, icon: '💉' },
    { name: 'Shingles Vaccination', price: 280, icon: '🛡️' },
    { name: 'Health Screening Package', price: 180, icon: '📋' },
    { name: 'NKF Renal Screening', price: 25, icon: '🫘' },
    { name: 'Buzud CGM Promo', price: 90, icon: '📊' },
  ];

  const bgColors = ['bg-teal-100 border-teal-200', 'bg-purple-100 border-purple-200', 'bg-orange-100 border-orange-200', 'bg-blue-100 border-blue-200'];
  const txtColors = ['text-teal-600', 'text-purple-600', 'text-orange-600', 'text-blue-600'];
  const gradients = ['from-teal-50 to-white', 'from-purple-50 to-white', 'from-orange-50 to-white', 'from-blue-50 to-white'];
  const tableBgColors = ['bg-teal-50 border-teal-100', 'bg-purple-50 border-purple-100', 'bg-blue-50 border-blue-100', 'bg-orange-50 border-orange-100', 'bg-pink-50 border-pink-100', 'bg-emerald-50 border-emerald-100'];

  let totalAdditionalUnits = 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 border border-teal-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-teal-100 border border-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Target</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">S${Math.round(targetVal / 1000)}k</p>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-purple-100 border border-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">MTD</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">S${Math.round(mtd / 1000)}k</p>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Gap</p>
          <p className={`text-2xl font-bold ${mtd >= targetVal ? 'text-emerald-600' : 'text-amber-600'} mt-1`}>
            {mtd >= targetVal ? `+S$${Math.round((mtd - targetVal) / 1000)}k` : `S$${Math.round(gap / 1000)}k`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Trial</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">S${Math.round(trialVal / 1000)}k</p>
        </div>

        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Delta</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">S${Math.round(delta / 1000)}k</p>
        </div>

        <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-rose-100 border border-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Days Left</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{daysLeft}</p>
        </div>
      </div>

      {/* Set Targets */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            Set Targets
          </h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selected.filter(id => id !== 'all').map((id, i) => {
              const c = clinics.find(x => x.id === id);
              return (
                <div key={id} className={`p-5 bg-gradient-to-br ${gradients[i % 4]} rounded-xl border border-gray-100`}>
                  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-100">
                    <div className={`w-14 h-14 ${bgColors[i % 4]} border rounded-2xl flex items-center justify-center ${txtColors[i % 4]} font-bold text-lg shadow-sm`}>
                      {c?.short}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{c?.short}</p>
                      <p className="text-sm text-gray-500">{c?.name}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                      <label className="text-sm font-medium text-gray-600">Monthly Target</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">S$</span>
                        <input
                          type="number"
                          defaultValue={allData[id]?.target || 150000}
                          step="10000"
                          min="0"
                          className="w-32 px-4 py-2.5 border border-gray-200 rounded-xl text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                          onChange={(e) => onUpdateTarget(id, e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                      <label className="text-sm font-medium text-gray-600">Trial Target</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">S$</span>
                        <input
                          type="number"
                          defaultValue={allData[id]?.trial || Math.round((allData[id]?.target || 150000) * 1.15)}
                          step="10000"
                          min="0"
                          className="w-32 px-4 py-2.5 border border-emerald-200 rounded-xl text-right font-bold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50"
                          onChange={(e) => onUpdateTrial(id, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI-Estimated Additional Services */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 border border-purple-200 rounded-xl flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">AI-Estimated Additional Services Needed</h3>
              <p className="text-xs text-gray-500">Based on current gap to targets</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium text-center">Unit Price</th>
                <th className="px-5 py-3 font-medium text-center">Required (Base)</th>
                <th className="px-5 py-3 font-medium text-center">Additional (Trial)</th>
                <th className="px-5 py-3 font-medium text-center">Per Day</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {servicesList.map((s, i) => {
                const baseGap = Math.max(0, targetVal - mtd);
                const trialGap = Math.max(0, trialVal - mtd);
                const required = Math.ceil(baseGap / s.price / servicesList.length);
                const additional = Math.ceil(trialGap / s.price / servicesList.length);
                totalAdditionalUnits += additional;
                const perDay = Math.ceil(required / Math.max(daysLeft, 1));
                return (
                  <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${tableBgColors[i % 6]} border rounded-lg flex items-center justify-center text-sm`}>
                          {s.icon}
                        </div>
                        <span className="font-medium text-gray-800">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 text-center">S${s.price.toFixed(2)}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">{required}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full font-semibold">{additional}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">{perDay}/day</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <p className="text-sm text-gray-600">
              AI simulation: Reaching trial target of <span className="font-semibold text-gray-800">S${fmt(trialVal)}</span> requires roughly{' '}
              <span className="font-semibold text-purple-600">{totalAdditionalUnits}</span> extra service units.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTarget;
