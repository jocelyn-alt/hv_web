import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import NavTabs from './components/NavTabs';
import ClinicSelector from './components/ClinicSelector';
import DailySummary from './components/DailySummary';
import RevenueTarget from './components/RevenueTarget';
import PatientFlow from './components/PatientFlow';
import ComparePerformance from './components/ComparePerformance';
import Services from './components/Services';
import HealthierSG from './components/HealthierSG';
import WhatsAppTab from './components/WhatsAppTab';
import AskEva from './components/AskEva';
import Settings from './components/Settings';
import { clinics, initialData, generateClinicData, payLabels, tabs } from './data';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selected, setSelected] = useState(['msg']);
  const [data, setData] = useState(() => generateClinicData(clinics, initialData));

  const updateTarget = (id, value) => {
    setData(prev => ({
      ...prev,
      [id]: { ...prev[id], target: parseInt(value) || 0 }
    }));
  };

  const updateTrial = (id, value) => {
    setData(prev => ({
      ...prev,
      [id]: { ...prev[id], trial: parseInt(value) || 0 }
    }));
  };

  const resetTargets = () => {
    setData(prev => ({
      ...prev,
      msg: { ...prev.msg, target: 200000, trial: 230000 },
      mmp: { ...prev.mmp, target: 150000, trial: 172500 },
      rdh: { ...prev.rdh, target: 150000, trial: 172500 },
    }));
  };

  const aggregatedData = useMemo(() => {
    if (selected.length === 0) {
      return {
        mtd: 0,
        target: 0,
        trial: 0,
        variance: 0,
        today: 0,
        daily: 0,
        patients: 0,
        doctors: [],
        payments: Object.keys(payLabels).reduce((a, k) => {
          a[k] = 0;
          return a;
        }, {}),
        mtdFromClosing: 0,
      };
    }

    if (selected.length === 1 && !selected.includes('all')) {
      return data[selected[0]];
    }

    const realClinics = clinics.filter((c) => c.id !== 'all').map((c) => c.id);
    const activeIds = selected.includes('all') ? realClinics.filter((id) => data[id]) : selected;

    return {
      mtd: activeIds.reduce((s, id) => s + (data[id]?.mtd || 0), 0),
      target: activeIds.reduce((s, id) => s + (data[id]?.target || 0), 0),
      trial: activeIds.reduce((s, id) => s + (data[id]?.trial || Math.round((data[id]?.target || 0) * 1.15)), 0),
      variance: activeIds.reduce((s, id) => s + (data[id]?.variance || 0), 0),
      today: activeIds.reduce((s, id) => s + (data[id]?.today || 0), 0),
      daily: activeIds.reduce((s, id) => s + (data[id]?.daily || 0), 0),
      patients: activeIds.reduce((s, id) => s + (data[id]?.patients || 0), 0),
      doctors: activeIds.flatMap((id) => data[id]?.doctors || []),
      payments: Object.keys(payLabels).reduce((a, k) => {
        a[k] = activeIds.reduce((s, id) => s + (data[id]?.payments?.[k] || 0), 0);
        return a;
      }, {}),
      mtdFromClosing: activeIds.reduce((s, id) => s + (data[id]?.mtdFromClosing || data[id]?.mtd || 0), 0),
    };
  }, [selected, data]);

  const getClinicDisplayName = () => {
    if (selected.length === 0) return 'No Clinic Selected';
    if (selected.includes('all')) return 'All Clinics';
    if (selected.length === 1) return clinics.find((c) => c.id === selected[0])?.name;
    return `${selected.length} Clinics`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'daily':
        return <DailySummary data={aggregatedData} clinicName={getClinicDisplayName()} />;
      case 'revenue':
        return (
          <RevenueTarget
            data={aggregatedData}
            selected={selected}
            allData={data}
            onUpdateTarget={updateTarget}
            onUpdateTrial={updateTrial}
          />
        );
      case 'flow':
        return <PatientFlow data={aggregatedData} />;
      case 'compare':
        return <ComparePerformance selected={selected} allData={data} />;
      case 'services':
        return <Services />;
      case 'healthiersg':
        return <HealthierSG selected={selected} allData={data} />;
      case 'whatsapp':
        return <WhatsAppTab />;
      case 'askeva':
        return <AskEva />;
      case 'settings':
        return (
          <Settings
            selected={selected}
            allData={data}
            onUpdateTarget={updateTarget}
            onResetTargets={resetTargets}
          />
        );
      default:
        return (
          <div className="bg-white rounded border border-gray-200 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{activeTab}</h3>
            <p className="text-gray-500">Content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header clinicName={getClinicDisplayName()} />
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ClinicSelector selected={selected} onSelectionChange={setSelected} pageTitle={tabs.find(t => t.id === activeTab)?.title || tabs.find(t => t.id === activeTab)?.label || 'Dashboard'} />

      {/* Date Bar */}
      {['daily', 'revenue'].includes(activeTab) && (
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <span className="text-sm text-gray-900">
            <span className="font-medium">Monday, 19 Jan 2026</span>
            <span className="text-gray-500"> • Today is Tuesday, 20 Jan 2026</span>
          </span>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <span>🎉</span>
            <span>Great Performance!</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4">{renderContent()}</div>

      {/* Focused View Toggle */}
      <div className="fixed bottom-4 right-4 bg-red-500 text-white px-3 py-1.5 rounded text-xs font-medium">
        Focused View: OFF
      </div>
    </div>
  );
};

export default Dashboard;
