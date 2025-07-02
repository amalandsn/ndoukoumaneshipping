
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const TrustIndicators = () => {
  const { language } = useLanguage();
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto mb-4 p-4 bg-blue-deep/10 rounded-full text-blue-deep w-fit">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-blue-deep mb-2">
              {language === 'fr' ? 'Sécurité Garantie' : 'Guaranteed Security'}
            </h3>
            <p className="text-gray-600">
              {language === 'fr' ?
                'Certifications ISO et protocoles de sécurité internationaux' :
                'ISO certifications and international security protocols'
              }
            </p>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto mb-4 p-4 bg-blue-deep/10 rounded-full text-blue-deep w-fit">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-blue-deep mb-2">
              {language === 'fr' ? 'Rapidité d\'Exécution' : 'Fast Execution'}
            </h3>
            <p className="text-gray-600">
              {language === 'fr' ?
                'Traitement accéléré et délais respectés sur toutes nos prestations' :
                'Accelerated processing and deadlines met on all our services'
              }
            </p>
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto mb-4 p-4 bg-blue-deep/10 rounded-full text-blue-deep w-fit">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-blue-deep mb-2">
              {language === 'fr' ? 'Innovation Continue' : 'Continuous Innovation'}
            </h3>
            <p className="text-gray-600">
              {language === 'fr' ?
                'Technologies de pointe et solutions digitales avancées' :
                'Cutting-edge technologies and advanced digital solutions'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
