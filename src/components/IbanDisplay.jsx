import React, { useState } from 'react';

export default function IbanDisplay({ ibanData, onGenerate }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!ibanData) return;
        navigator.clipboard.writeText(ibanData.iban);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">

            {/* IBAN Card */}
            <div className="relative w-full p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl mb-8 overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                {ibanData ? (
                    <div className="relative z-10 text-center animate-fade-in-up">
                        <h3 className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-2">Generated IBAN</h3>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white mb-4 tracking-wider">
                            {ibanData.format}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-indigo-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {ibanData.bankName}
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 flex flex-col items-center justify-center h-40 text-gray-500">
                        <p>Select a country and click Generate</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="flex gap-4 w-full justify-center">
                <button
                    onClick={onGenerate}
                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 text-lg w-full sm:w-auto"
                >
                    Generate New IBAN
                </button>

                {ibanData && (
                    <button
                        onClick={handleCopy}
                        className={`px-8 py-4 rounded-xl font-bold shadow-lg transition-all border-2 w-full sm:w-auto flex items-center justify-center gap-2
                ${copied
                                ? 'bg-green-500/20 border-green-500 text-green-400'
                                : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            }`}
                    >
                        {copied ? (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                Copy
                            </>
                        )}
                    </button>
                )}
            </div>

        </div>
    );
}
