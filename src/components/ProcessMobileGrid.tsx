
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { processImages } from '@/data/processSteps';

interface ProcessMobileGridProps {
  steps: Array<{
    title: string;
    description: string;
  }>;
}

const ProcessMobileGrid: React.FC<ProcessMobileGridProps> = ({ steps }) => {
  return (
    <div className="grid gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="border-0 shadow-lg">
            <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
              <img
                src={processImages[index]}
                alt={step.title}
                className="h-full w-full object-cover rounded-t-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002A5Ccc] via-transparent rounded-t-xl" />
              <div className="absolute left-3 top-3 bg-[#FF7A00] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
            <CardContent className="p-6 text-center pt-3">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessMobileGrid;
