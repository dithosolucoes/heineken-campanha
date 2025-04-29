import { useState } from 'react';

interface CampanhaMultiSelectProps {
  options: { id: string, name: string }[];
  value: string[];
  onChange: (ids: string[]) => void;
}

export default function CampanhaMultiSelect({ options, value, onChange }: CampanhaMultiSelectProps) {
  function toggle(id: string) {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700 mb-1">Campanhas</span>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt.id}
            type="button"
            className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${value.includes(opt.id) ? 'bg-heineken-green text-white border-heineken-green' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            onClick={() => toggle(opt.id)}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
