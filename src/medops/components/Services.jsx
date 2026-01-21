import React from 'react';
import { services, promos } from '../data';

const Services = () => {
  const bgColors = ['bg-teal-100 border-teal-200', 'bg-purple-100 border-purple-200', 'bg-blue-100 border-blue-200'];
  const gradients = ['from-teal-50 to-white', 'from-purple-50 to-white', 'from-blue-50 to-white'];

  const promoBgColors = ['bg-emerald-100 border-emerald-200', 'bg-teal-100 border-teal-200'];
  const promoTxtColors = ['text-emerald-600', 'text-teal-600'];
  const promoGradients = ['from-emerald-50 to-white', 'from-teal-50 to-white'];

  return (
    <div className="space-y-6">
      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((s, i) => (
          <div key={s.name} className={`bg-gradient-to-br ${gradients[i % 3]} rounded-2xl border border-gray-200 shadow-sm p-6`}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${bgColors[i % 3]} border rounded-2xl flex items-center justify-center`}>
                  <span className="text-xl">{s.icon}</span>
                </div>
                <span className="font-semibold text-gray-800">{s.name}</span>
              </div>
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                {s.trend}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">Today</p>
                <p className="text-2xl font-bold text-teal-600 mt-1">{s.today}</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">7 Days</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{s.week}</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">MTD</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{s.mtd}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promos.map((p, i) => (
          <div key={p.tag} className={`bg-gradient-to-br ${promoGradients[i % 2]} rounded-2xl border border-gray-200 shadow-sm p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${promoBgColors[i % 2]} border rounded-2xl flex items-center justify-center ${promoTxtColors[i % 2]} font-bold`}>
                  {p.tag.substring(0, 3)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-lg">{p.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Signups: <span className="font-semibold text-gray-800">{p.signups}</span> &nbsp;
                    Done: <span className="font-semibold text-emerald-600">{p.done}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-teal-600">{p.percent}%</p>
                <div className="w-24 bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2.5 rounded-full" style={{ width: `${p.percent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
