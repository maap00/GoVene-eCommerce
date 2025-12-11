import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeScene } from '../components/welcome/WelcomeScene';

export const WelcomePage = () => {
    const [city, setCity] = useState('Puerto Ordaz');
    const navigate = useNavigate();

    const handleGo = () => {
        navigate('/home');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-sans text-white">
            {/* Dynamic Background Elements */}
            {/* 3D Background Scene */}
            <WelcomeScene />

            {/* Glassmorphism Card */}
            <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all hover:scale-105 duration-300">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                        GoVene
                    </h1>
                    <p className="text-lg text-gray-300 tracking-widest uppercase text-xs">e-commerce</p>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-2">
                            Select your city
                        </label>
                        <div className="relative">
                            <select
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="block w-full pl-4 pr-10 py-3 text-base bg-black/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-xl text-white appearance-none transition-colors cursor-pointer hover:bg-black/70"
                            >
                                <option value="Puerto Ordaz">Puerto Ordaz</option>
                                <option value="Caracas">Caracas</option>
                                <option value="Maracaibo">Maracaibo</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleGo}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all active:scale-95 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
};
