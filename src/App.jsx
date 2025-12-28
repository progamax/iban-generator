import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import IbanDisplay from './components/IbanDisplay';
import { generateFR } from './core/generators/fr';
import { generateBE } from './core/generators/be';
import { generateDE } from './core/generators/de';
import { generateES } from './core/generators/es';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('FR');
  const [ibanData, setIbanData] = useState(null);

  const handleGenerate = () => {
    let data;
    switch (selectedCountry) {
      case 'FR': data = generateFR(); break;
      case 'BE': data = generateBE(); break;
      case 'DE': data = generateDE(); break;
      case 'ES': data = generateES(); break;
      default: data = null;
    }
    setIbanData(data);
  };

  // Generate one on mount or country change? Let's wait for user action.
  // Actually, generating on country selection is nice UX.
  React.useEffect(() => {
    handleGenerate();
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-[#0f111a] text-gray-100 font-sans selection:bg-indigo-500/30">

      {/* Header */}
      <header className="pt-16 pb-8 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-4 animate-gradient-x">
          Realistic IBAN Generator
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Generate testing data with real bank codes and valid checksums for France, Belgium, Germany, and Spain.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">

        <CountrySelector
          selected={selectedCountry}
          onSelect={setSelectedCountry}
        />

        <IbanDisplay
          ibanData={ibanData}
          onGenerate={handleGenerate}
        />

        {/* Realism Note */}
        <div className="mt-20 max-w-2xl mx-auto p-6 rounded-2xl bg-gray-900/50 border border-gray-800 text-sm text-gray-400 leading-relaxed">
          <h4 className="font-bold text-gray-300 mb-2">System Constraints & Realism</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-indigo-400">France (FR):</strong> Uses real "Code Banque" from major banks (BNP, SG, etc.) + valid Key calculation.</li>
            <li><strong className="text-indigo-400">Belgium (BE):</strong> Uses valid Protocol IDs + Mod97 checks.</li>
            <li><strong className="text-indigo-400">Germany (DE):</strong> Uses real BLZ (Bankleitzahl) from top institutions.</li>
            <li><strong className="text-indigo-400">Spain (ES):</strong> Implements the national Control Digit algorithm for validity.</li>
          </ul>
        </div>

      </main>

      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>For testing purposes only. Do not use for real transactions.</p>
      </footer>
    </div>
  );
}

export default App;
