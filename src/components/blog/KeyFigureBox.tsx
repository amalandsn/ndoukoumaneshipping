
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface KeyFigureBoxProps {
  figure: string;
  language: 'fr' | 'en';
}

const KeyFigureBox = ({ figure, language }: KeyFigureBoxProps) => {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 border-l-4 border-orange-500 rounded-lg shadow-md">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-900 rounded-full">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-1">
            {language === 'fr' ? 'Chiffre Clé Ndoukoumane' : 'Ndoukoumane Key Figure'}
          </h3>
          <p className="text-xl font-semibold text-orange-600">{figure}</p>
        </div>
      </div>
    </div>
  );
};

export default KeyFigureBox;
