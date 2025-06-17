
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { processStepsData } from '@/data/processSteps';
import ProcessCard from './ProcessCard';

const ProcessTimeline = () => {
  const { language } = useLanguage();
  const steps = processStepsData[language];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6 font-serif">
            {language === 'fr' ? 'Notre Processus' : 'Our Process'}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {language === 'fr' 
              ? 'Six étapes optimisées pour un service efficace et transparent'
              : 'Six optimized steps for efficient and transparent service'
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Premium Grid Layout - All 6 steps visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Process Flow Indicator */}
        <div className="flex justify-center items-center mt-16 space-x-4">
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-600 to-orange-500"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
