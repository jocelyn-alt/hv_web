export const clinics = [
  { id: 'all', name: 'All Clinics', short: 'ALL' },
  { id: 'msg', name: 'Mediline Serangoon', short: 'MSG' },
  { id: 'mmp', name: 'Mediline Medipoint', short: 'MMP' },
  { id: 'rdh', name: 'RDH Clinic', short: 'RDH' },
  { id: 'tpy', name: 'Toa Payoh Clinic', short: 'TPY' },
  { id: 'amk', name: 'Ang Mo Kio Clinic', short: 'AMK' },
  { id: 'bd', name: 'Bedok Clinic', short: 'BD' },
  { id: 'tp', name: 'Tampines Clinic', short: 'TP' },
  { id: 'wl', name: 'Woodlands Clinic', short: 'WL' },
  { id: 'jw', name: 'Jurong West Clinic', short: 'JW' },
  { id: 'cck', name: 'Choa Chu Kang Clinic', short: 'CCK' }
];

export const initialData = {
  msg: {
    mtd: 229820.62,
    target: 200000,
    daily: 6450,
    variance: 22958.29,
    today: 10972.21,
    patients: 70,
    doctors: [
      { name: 'Dr Eugene Loke', initials: 'EL', patients: 56, revenue: 10080.31 },
      { name: 'Dr Low', initials: 'LW', patients: 14, revenue: 891.79 }
    ],
    payments: {
      app: 14236.55,
      nets: 59110.20,
      paynow: 89630.88,
      tpa: 49210.45,
      chas: 14480.55,
      healthiersg: 3151.99
    },
    mtdFromClosing: 236820.63
  },
  mmp: {
    mtd: 103571.94,
    target: 150000,
    daily: 4838.70,
    variance: 11636.64,
    today: 8738.61,
    patients: 66,
    doctors: [
      { name: 'Dr Lee Chien Nien', initials: 'LCN', patients: 31, revenue: 4951.18 },
      { name: 'Dr Andre Ng', initials: 'AN', patients: 35, revenue: 3787.43 }
    ],
    payments: {
      paynow: 3117.08,
      nets: 927.98,
      app: 356.99,
      cash: 561.51,
      tpa: 2602.89,
      chas: 491.01,
      healthiersg: 825.50
    },
    mtdFromClosing: 106500.00
  },
  rdh: {
    mtd: 103598.26,
    target: 150000,
    daily: 5770,
    variance: 17048.26,
    today: 14041.14,
    patients: 64,
    doctors: [
      { name: 'Dr Nigel', initials: 'NG', patients: 64, revenue: 14041.14 }
    ],
    payments: {
      cash: 441.27,
      amex: 94.50,
      nets: 239.03,
      visa: 2646.94,
      mastercard: 2862.34,
      paynow: 399.03,
      app: 1373.40,
      copay: 8135.89,
      healthiersg: 1276.17
    },
    mtdFromClosing: 106820.63
  }
};

export const tabs = [
  { id: 'daily', label: "Yesterday's Closing Summary" },
  { id: 'revenue', label: 'Revenue Target' },
  { id: 'flow', label: 'Patient Flow' },
  { id: 'compare', label: 'Compare Performance' },
  { id: 'services', label: 'Services' },
  { id: 'healthiersg', label: 'HSG', title: 'HealthierSG' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'askeva', label: 'Ask Eva' },
  { id: 'settings', label: 'Settings' }
];

export const services = [
  { name: 'Influenza Vaccination', icon: '💉', today: 12, week: 68, mtd: 185, trend: '+15%' },
  { name: 'Shingles Vaccination', icon: '🛡️', today: 3, week: 14, mtd: 39, trend: '+8%' },
  { name: 'Health Screening', icon: '📋', today: 7, week: 33, mtd: 92, trend: '+22%' }
];

export const promos = [
  { tag: 'NKF-RENAL', name: 'NKF Renal Screening', signups: 26, done: 18, percent: 69 },
  { tag: 'BUZUD-CGM', name: 'BUZUD CGM Promo', signups: 33, done: 25, percent: 76 }
];

export const payLabels = {
  paynow: 'PayNow',
  nets: 'NETS',
  app: '1doc App',
  copay: 'Co-pay',
  cash: 'Cash',
  tpa: 'TPA',
  chas: 'CHAS',
  visa: 'Visa',
  mastercard: 'MC',
  amex: 'AMEX',
  healthiersg: 'HealthierSG'
};

export const payColors = {
  paynow: 'bg-teal-400',
  nets: 'bg-blue-400',
  app: 'bg-violet-400',
  copay: 'bg-amber-400',
  cash: 'bg-emerald-400',
  tpa: 'bg-orange-400',
  chas: 'bg-pink-400',
  visa: 'bg-indigo-400',
  mastercard: 'bg-red-400',
  amex: 'bg-sky-400',
  healthiersg: 'bg-green-400'
};

// Generate default data for clinics without specific data
export const generateClinicData = (clinics, initialData) => {
  const data = { ...initialData };
  clinics.forEach((c, i) => {
    if (!data[c.id] && c.id !== 'all') {
      data[c.id] = {
        mtd: 80000 + i * 5000,
        target: 150000,
        daily: 4838,
        variance: 10000 + i * 1000,
        today: 5000 + i * 500,
        patients: 30 + i * 3,
        doctors: [{ name: 'Dr Smith', initials: 'SM', patients: 30 + i * 3, revenue: 5000 + i * 500 }],
        payments: { paynow: 2000, nets: 1000, app: 1500, copay: 1000, tpa: 500, chas: 200 }
      };
    }
  });
  return data;
};

export const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
