import React from 'react';

const countries = [
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
];

export default function CountrySelector({ selected, onSelect }) {
    return (
        <div className="flex justify-center gap-4 mb-8">
            {countries.map((country) => (
                <button
                    key={country.code}
                    onClick={() => onSelect(country.code)}
                    className={`
            flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 transition-all duration-300
            ${selected === country.code
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105'
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800 hover:scale-105'}
          `}
                >
                    <span className="text-4xl mb-2">{country.flag}</span>
                    <span className="font-semibold text-sm text-gray-300">{country.name}</span>
                </button>
            ))}
        </div>
    );
}
