import React from 'react';
import { clinics } from '../data';

const HealthierSG = ({ selected, allData }) => {
  const isAll = selected.includes('all');
  const realClinicsWithData = clinics.filter(c => c.id !== 'all' && allData[c.id]);
  const clinicsToShow = isAll ? realClinicsWithData : realClinicsWithData.filter(c => selected.includes(c.id));
  const plansDue = isAll ? 128 * clinicsToShow.length : (clinicsToShow.length * 128);
  const reportsDue = isAll ? 44 * clinicsToShow.length : (clinicsToShow.length * 44);
  const displayName = isAll ? 'All Clinics' : (clinicsToShow.length === 1 ? clinicsToShow[0]?.name : `${clinicsToShow.length} Clinics`);
  const displayShort = isAll ? 'ALL' : (clinicsToShow.length === 1 ? clinicsToShow[0]?.short : `${clinicsToShow.length}`);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl border border-rose-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 ${isAll ? 'bg-purple-100 border-purple-200' : 'bg-rose-100 border-rose-200'} rounded-2xl flex items-center justify-center`}>
            <span className="text-3xl">{isAll ? '🏢' : '🏥'}</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-xl">{displayShort}</p>
            <p className="text-sm text-gray-500">{displayName}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 text-center border border-teal-100">
            <div className="w-14 h-14 bg-teal-100 border border-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Plans Due (3m)</p>
            <p className="text-5xl font-bold text-teal-600 mt-2">{plansDue}</p>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 text-center border border-rose-100">
            <div className="w-14 h-14 bg-rose-100 border border-rose-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Reports Due (1m)</p>
            <p className="text-5xl font-bold text-rose-600 mt-2">{reportsDue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthierSG;
