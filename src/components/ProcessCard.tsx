
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-white overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={processImages[index]}
            alt={step.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Premium step number */}
          <div className="absolute -top-3 -left-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold shadow-lg border-4 border-white">
            {String(index + 1).padStart(2, '0')}
          </div>
          
          {/* Floating icon overlay */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-orange-600 transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {step.description}
          </p>
          
          {/* Premium accent line */}
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-orange-500 mt-4 rounded-full group-hover:w-20 transition-all duration-300"></div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProcessCard;
