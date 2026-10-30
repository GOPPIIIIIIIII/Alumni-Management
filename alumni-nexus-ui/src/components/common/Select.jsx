import React from 'react';

export const Select = ({
  label,
  options = [],
  error,
  icon: Icon,
  className = '',
  id,
  placeholder = 'Select option...',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <select
          id={selectId}
          className={`block w-full rounded-xl bg-slate-900/80 border ${
            error ? 'border-rose-500/80' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500'
          } ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-10 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-opacity-50 appearance-none transition duration-150 ease-in-out`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-200">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
};
