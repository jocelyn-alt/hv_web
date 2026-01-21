import React, { useState } from 'react';
import { clinics } from '../data';

const ClinicSelector = ({ selected, onSelectionChange, pageTitle }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredClinics = clinics.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.short.toLowerCase().includes(search.toLowerCase())
  );

  const toggleClinic = (id) => {
    if (id === 'all') {
      if (selected.includes('all')) {
        onSelectionChange([]);
      } else {
        onSelectionChange(['all']);
      }
    } else {
      if (selected.includes('all')) {
        onSelectionChange([id]);
      } else if (selected.includes(id)) {
        onSelectionChange(selected.filter((x) => x !== id));
      } else {
        onSelectionChange([...selected, id]);
      }
    }
  };

  const removeClinic = (id) => {
    onSelectionChange(selected.filter((x) => x !== id));
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-sm text-gray-500">Select Clinic:</span>

        {/* Selected Clinics Display */}
        <div className="flex gap-2">
          {selected.length === 0 ? (
            <span className="text-sm text-gray-400 italic">No clinic selected</span>
          ) : selected.includes('all') ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded text-sm font-medium">
              All Clinics
              <button
                onClick={() => removeClinic('all')}
                className="w-4 h-4 rounded-full bg-teal-200 hover:bg-teal-300 flex items-center justify-center text-teal-600 text-xs"
              >
                x
              </button>
            </span>
          ) : selected.length > 3 ? (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded text-sm font-medium">
              {selected.length} Clinics
              <button
                onClick={() => onSelectionChange([])}
                className="w-4 h-4 rounded-full bg-teal-200 hover:bg-teal-300 flex items-center justify-center text-teal-600 text-xs"
              >
                x
              </button>
            </span>
          ) : (
            selected.map((id) => {
              const c = clinics.find((x) => x.id === id);
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded text-sm font-medium"
                >
                  {c?.short}
                  <button
                    onClick={() => removeClinic(id)}
                    className="w-4 h-4 rounded-full bg-teal-200 hover:bg-teal-300 flex items-center justify-center text-teal-600 text-xs"
                  >
                    x
                  </button>
                </span>
              );
            })
          )}
        </div>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Select Clinics
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded border border-gray-200 shadow-lg z-50">
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search clinics..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 pr-8 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center text-white text-xs"
                    >
                      x
                    </button>
                  )}
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {filteredClinics.map((c) => {
                  const isAll = c.id === 'all';
                  const isSelected = selected.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleClinic(c.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 border-b border-gray-50 text-left ${
                        isAll ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'bg-teal-500 border-teal-500' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{c.name}</span>
                    </button>
                  );
                })}
              </div>
              <div className="p-2 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {selected.includes('all') ? 'All clinics selected' : `${selected.length} of ${clinics.length - 1} selected`}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 bg-teal-600 text-white rounded text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicSelector;
