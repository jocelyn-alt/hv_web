import React from 'react';

const PatientFlow = ({ data }) => {
  const bgColors = ['bg-teal-100 border-teal-200', 'bg-purple-100 border-purple-200', 'bg-blue-100 border-blue-200'];
  const txtColors = ['text-teal-600', 'text-purple-600', 'text-blue-600'];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Avg Wait</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">15 <span className="text-lg text-gray-400 font-normal">min</span></p>
          <p className="text-sm text-amber-500 mt-2 font-medium">⚡ Efficiency target</p>
        </div>

        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-6 border border-teal-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-teal-100 border border-teal-200 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Throughput</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">31.5 <span className="text-lg text-gray-400 font-normal">min</span></p>
          <p className="text-sm text-teal-600 mt-2 font-medium">Per patient avg</p>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-purple-100 border border-purple-200 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">Total Patients</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{data.patients}</p>
          <p className="text-sm text-purple-600 mt-2 font-medium">Yesterday</p>
        </div>

        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-500">P95 Wait</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">25 <span className="text-lg text-gray-400 font-normal">min</span></p>
          <p className="text-sm text-emerald-600 mt-2 font-medium">95th percentile</p>
        </div>
      </div>

      {/* Doctor Efficiency */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Doctor Efficiency
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {data.doctors.map((doc, i) => {
            const wait = doc.patients > 40 ? 12 : 18;
            const thru = doc.patients > 40 ? 28 : 35;
            const p95 = doc.patients > 40 ? 25 : 42;
            return (
              <div key={i} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 ${bgColors[i % 3]} border rounded-2xl flex items-center justify-center ${txtColors[i % 3]} font-bold text-lg`}>
                    {doc.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.patients} patients</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 text-center border border-blue-100">
                    <p className="text-xs text-gray-500 font-medium">Patients</p>
                    <p className="text-lg font-bold text-blue-600">{doc.patients}</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-3 text-center border border-emerald-100">
                    <p className="text-xs text-gray-500 font-medium">Wait</p>
                    <p className="text-lg font-bold text-emerald-600">{wait}m</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-3 text-center border border-amber-100">
                    <p className="text-xs text-gray-500 font-medium">Throughput</p>
                    <p className="text-lg font-bold text-amber-600">{thru}m</p>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-white rounded-xl p-3 text-center border border-rose-100">
                    <p className="text-xs text-gray-500 font-medium">P95</p>
                    <p className="text-lg font-bold text-rose-600">{p95}m</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientFlow;
