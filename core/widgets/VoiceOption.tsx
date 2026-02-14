
import React from 'react';

interface VoiceOptionProps {
  selectedGender: 'male' | 'female';
  onGenderChange: (gender: 'male' | 'female') => void;
}

export const VoiceOption: React.FC<VoiceOptionProps> = ({ selectedGender, onGenderChange }) => {
  return (
    <div className="flex gap-4 w-full">
      <button
        onClick={() => onGenderChange('male')}
        className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
          selectedGender === 'male'
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-gray-200 text-textLight'
        }`}
      >
        Male
      </button>
      <button
        onClick={() => onGenderChange('female')}
        className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
          selectedGender === 'female'
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-gray-200 text-textLight'
        }`}
      >
        Female
      </button>
    </div>
  );
};
