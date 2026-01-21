import React from 'react';
import { fmt, clinics } from '../data';

const Settings = ({ selected, allData, onUpdateTarget, onResetTargets }) => {
  const currentMonth = new Date().getMonth(); // 0-11
  const currentQuarter = Math.floor(currentMonth / 3); // 0-3

  const selClinics = selected
    .filter(id => id !== 'all')
    .map(id => ({
      id,
      clinic: clinics.find(c => c.id === id)?.short,
      name: clinics.find(c => c.id === id)?.name,
      yearlyTarget: (allData[id]?.target || 150000) * 12,
      mtd: allData[id]?.mtd || 0,
      today: allData[id]?.today || 0,
    }));

  const bgColors = ['bg-teal-100 border-teal-200', 'bg-purple-100 border-purple-200', 'bg-orange-100 border-orange-200', 'bg-blue-100 border-blue-200', 'bg-pink-100 border-pink-200', 'bg-emerald-100 border-emerald-200'];
  const txtColors = ['text-teal-600', 'text-purple-600', 'text-orange-600', 'text-blue-600', 'text-pink-600', 'text-emerald-600'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const quarters = [
    { name: 'Q1', label: 'Jan-Mar', months: [0, 1, 2] },
    { name: 'Q2', label: 'Apr-Jun', months: [3, 4, 5] },
    { name: 'Q3', label: 'Jul-Sep', months: [6, 7, 8] },
    { name: 'Q4', label: 'Oct-Dec', months: [9, 10, 11] },
  ];

  const handleYearlyChange = (id, yearlyValue) => {
    const monthlyValue = Math.round(parseInt(yearlyValue) / 12) || 0;
    onUpdateTarget(id, monthlyValue);
  };

  // Calculate totals for all selected clinics
  const totals = {
    yearlyTarget: selClinics.reduce((sum, c) => sum + c.yearlyTarget, 0),
    mtd: selClinics.reduce((sum, c) => sum + c.mtd, 0),
  };

  return (
    <div className="space-y-6">
      {/* Yearly Revenue Targets Input */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
            Yearly Revenue Targets
          </h3>
          <p className="text-sm text-gray-500 mt-1">Set yearly targets - monthly and quarterly will be calculated automatically</p>
        </div>
        <div className="p-5 space-y-3">
          {selClinics.map((t, i) => (
            <div key={t.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${bgColors[i % 6]} border rounded-xl flex items-center justify-center ${txtColors[i % 6]} font-bold`}>
                  {t.clinic}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{t.clinic}</p>
                  <p className="text-xs text-gray-500">{t.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">S$</span>
                <input
                  type="number"
                  defaultValue={t.yearlyTarget}
                  step="100000"
                  min="0"
                  className="w-40 px-4 py-2.5 border border-gray-200 rounded-xl text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  onChange={(e) => handleYearlyChange(t.id, e.target.value)}
                />
                <span className="text-gray-500 text-sm">/year</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Changes are saved automatically</p>
            <button
              onClick={onResetTargets}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Quarterly Breakdown with Actual vs Target */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Quarterly Targets vs Actual
          </h3>
          <p className="text-sm text-gray-500 mt-1">Current quarter: <span className="font-semibold text-purple-600">{quarters[currentQuarter].name}</span></p>
        </div>
        <div className="p-5">
          {selClinics.map((t, i) => {
            const quarterlyTarget = t.yearlyTarget / 4;
            const monthlyTarget = t.yearlyTarget / 12;
            return (
              <div key={t.id} className="mb-6 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${bgColors[i % 6]} border rounded-xl flex items-center justify-center ${txtColors[i % 6]} font-bold text-sm`}>
                    {t.clinic}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{t.clinic}</p>
                    <p className="text-xs text-gray-500">Yearly: S${fmt(t.yearlyTarget)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {quarters.map((q, qi) => {
                    const isCurrentQuarter = qi === currentQuarter;
                    // For current quarter, use MTD; for past quarters, simulate completed; for future, show 0
                    const actual = qi < currentQuarter
                      ? quarterlyTarget * (0.9 + Math.random() * 0.2) // Past: ~90-110% achieved
                      : qi === currentQuarter
                        ? t.mtd // Current: use MTD
                        : 0; // Future: 0
                    const pct = ((actual / quarterlyTarget) * 100).toFixed(1);

                    return (
                      <div
                        key={q.name}
                        className={`rounded-xl p-4 border text-center ${
                          isCurrentQuarter
                            ? 'bg-gradient-to-br from-purple-100 to-purple-50 border-purple-300 ring-2 ring-purple-200'
                            : 'bg-gradient-to-br from-purple-50 to-white border-purple-100'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <p className="text-sm font-bold text-purple-700">{q.name}</p>
                          {isCurrentQuarter && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">Now</span>}
                        </div>
                        <p className="text-xs text-gray-500">{q.label}</p>
                        <p className="text-lg font-bold text-purple-600 mt-2">S${fmt(quarterlyTarget)}</p>
                        <p className="text-xs text-gray-400">Target</p>

                        {(isCurrentQuarter || qi < currentQuarter) && (
                          <>
                            <div className="mt-3 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-emerald-500' : 'bg-purple-500'}`}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              ></div>
                            </div>
                            <p className={`text-sm font-semibold mt-2 ${pct >= 100 ? 'text-emerald-600' : 'text-gray-700'}`}>
                              S${fmt(actual)} ({pct}%)
                            </p>
                            <p className="text-xs text-gray-400">{isCurrentQuarter ? 'MTD Actual' : 'Achieved'}</p>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Breakdown with Actual vs Target */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Monthly Targets vs Actual
          </h3>
          <p className="text-sm text-gray-500 mt-1">Current month: <span className="font-semibold text-blue-600">{months[currentMonth]}</span></p>
        </div>
        <div className="p-5">
          {selClinics.map((t, i) => {
            const monthlyTarget = t.yearlyTarget / 12;
            return (
              <div key={t.id} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${bgColors[i % 6]} border rounded-xl flex items-center justify-center ${txtColors[i % 6]} font-bold text-sm`}>
                      {t.clinic}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t.clinic}</p>
                      <p className="text-xs text-gray-500">Monthly Target: S${fmt(monthlyTarget)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Current MTD</p>
                    <p className="text-xl font-bold text-blue-600">S${fmt(t.mtd)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
                  {months.map((m, mi) => {
                    const isCurrentMonth = mi === currentMonth;
                    // For current month use MTD, past months simulate, future show target only
                    const actual = mi < currentMonth
                      ? monthlyTarget * (0.85 + Math.random() * 0.3) // Past: ~85-115%
                      : mi === currentMonth
                        ? t.mtd
                        : null;
                    const pct = actual !== null ? ((actual / monthlyTarget) * 100).toFixed(0) : null;

                    return (
                      <div
                        key={m}
                        className={`rounded-xl p-2 border text-center transition-all ${
                          isCurrentMonth
                            ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300 ring-2 ring-blue-200'
                            : mi < currentMonth
                              ? 'bg-gradient-to-br from-gray-50 to-white border-gray-200'
                              : 'bg-gradient-to-br from-blue-50 to-white border-blue-100 opacity-60'
                        }`}
                      >
                        <p className={`text-xs font-medium ${isCurrentMonth ? 'text-blue-700' : 'text-gray-500'}`}>
                          {m}
                          {isCurrentMonth && <span className="block text-[10px] text-blue-500">●</span>}
                        </p>
                        <p className="text-xs font-bold text-gray-700 mt-1">
                          S${(monthlyTarget / 1000).toFixed(0)}k
                        </p>
                        {pct !== null && (
                          <div className={`text-[10px] mt-1 px-1 py-0.5 rounded ${
                            pct >= 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {pct}%
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Summary from Daily Data */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Live Progress (from Daily Summary)
          </h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selClinics.map((t, i) => {
              const monthlyTarget = t.yearlyTarget / 12;
              const pct = ((t.mtd / monthlyTarget) * 100).toFixed(1);
              const gap = monthlyTarget - t.mtd;
              const isAbove = gap <= 0;

              return (
                <div key={t.id} className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${bgColors[i % 6]} border rounded-xl flex items-center justify-center ${txtColors[i % 6]} font-bold`}>
                      {t.clinic}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{t.clinic}</p>
                      <p className="text-xs text-gray-500">{t.name}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">MTD Revenue</span>
                      <span className="font-bold text-gray-900">S${fmt(t.mtd)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly Target</span>
                      <span className="font-medium text-gray-700">S${fmt(monthlyTarget)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Today's Revenue</span>
                      <span className="font-medium text-blue-600">S${fmt(t.today)}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className={`text-lg font-bold ${pct >= 100 ? 'text-emerald-600' : 'text-gray-900'}`}>{pct}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-teal-400 to-emerald-500'}`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        ></div>
                      </div>
                      <p className={`text-sm mt-2 font-medium ${isAbove ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {isAbove ? `+S$${fmt(Math.abs(gap))} above target` : `S$${fmt(gap)} to target`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Combined Total */}
          {selClinics.length > 1 && (
            <div className="mt-6 p-5 bg-gradient-to-br from-teal-50 to-white rounded-xl border border-teal-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">Combined Total</p>
                  <p className="text-sm text-gray-500">{selClinics.length} clinics selected</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-teal-600">S${fmt(totals.mtd)}</p>
                  <p className="text-sm text-gray-500">of S${fmt(totals.yearlyTarget / 12)}/month target</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
