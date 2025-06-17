
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { processStepsData } from '@/data/processSteps';
import ProcessDesktopSlider from './ProcessDesktopSlider';
import ProcessMobileGrid from './ProcessMobileGrid';

const ProcessTimeline = () => {
  const { language } = useLanguage();
  const steps = processStepsData[language];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4 font-serif">
            {language === 'fr' ? 'Notre Processus' : 'Our Process'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'fr' 
              ? 'Six étapes optimisées pour un service efficace et transparent'
              : 'Six optimized steps for efficient and transparent service'
            }
          </p>
        </div>

        {/* Desktop Scrolling Timeline */}
        <div className="hidden lg:block">
          <ProcessDesktopSlider steps={steps} />
        </div>

        {/* Mobile Static Grid */}
        <div className="lg:hidden">
          <ProcessMobileGrid steps={steps} />
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
