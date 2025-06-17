
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { processImages } from '@/data/processSteps';

interface ProcessCardProps {
  step: {
    title: string;
    description: string;
  };
  index: number;
  delay?: number;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ step, index, delay = 0 }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-80"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-40 w-full rounded-t-xl overflow-hidden">
          <img
            src={processImages[index % processImages.length]}
            alt={step.title}
            className="h-full w-full object-cover rounded-t-xl"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002A5Ccc] via-transparent rounded-t-xl" />
          <div className="absolute left-3 top-3 bg-[#FF7A00] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow">
            {String((index % processImages.length) + 1).padStart(2, '0')}
          </div>
        </div>
        <CardContent className="p-8 text-center pt-4">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">{step.title}</h3>
          <p className="text-gray-600 leading-relaxed">{step.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProcessCard;
