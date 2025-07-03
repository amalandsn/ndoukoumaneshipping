import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Send, Upload } from 'lucide-react';

// Schéma Zod avec messages d'erreur bilingues
const createQuoteSchema = (language: 'fr' | 'en') => z.object({
  fullName: z.string().min(2, language === 'fr' ? 'Le nom doit contenir au moins 2 caractères' : 'Name must be at least 2 characters'),
  email: z.string().email(language === 'fr' ? 'Adresse e-mail invalide' : 'Invalid email address'),
  phone: z.string().min(10, language === 'fr' ? 'Le numéro de téléphone doit contenir au moins 10 caractères' : 'Phone number must be at least 10 characters'),
  services: z.array(z.string()).min(1, language === 'fr' ? 'Veuillez sélectionner au moins un service' : 'Please select at least one service'),
  from: z.string().min(2, language === 'fr' ? 'Le lieu de départ est requis' : 'Origin location is required'),
  to: z.string().min(2, language === 'fr' ? 'La destination est requise' : 'Destination is required'),
  volume: z.string().min(1, language === 'fr' ? 'Le volume/poids est requis' : 'Volume/weight is required'),
  message: z.string().optional(),
});

const QuoteForm = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<ReturnType<typeof createQuoteSchema>>>({
    resolver: zodResolver(createQuoteSchema(language)),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      services: [],
      from: '',
      to: '',
      volume: '',
      message: '',
    },
  });

  const serviceOptions = [
    { value: 'maritime', labelFr: 'Maritime', labelEn: 'Maritime' },
    { value: 'aerien', labelFr: 'Aérien', labelEn: 'Air freight' },
    { value: 'transit', labelFr: 'Transit', labelEn: 'Transit' },
    { value: 'groupage', labelFr: 'Groupage', labelEn: 'Groupage' },
    { value: 'autre', labelFr: 'Autre', labelEn: 'Other' },
  ];

  const onSubmit = async (data: z.infer<ReturnType<typeof createQuoteSchema>>) => {
    setIsSubmitting(true);
    try {
      // Call the edge function to handle the quote request
      const { data: result, error } = await supabase.functions.invoke('request-quote', {
        body: {
          ...data,
          language,
          file: file ? await fileToBase64(file) : null,
          fileName: file?.name || null,
        },
      });

      if (error) throw error;

      // Track analytics if gtag is available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quote_request_submitted', {
          quote_id: result.quoteId,
        });
      }

      toast.success(
        language === 'fr' 
          ? 'Demande envoyée avec succès !' 
          : 'Request sent successfully!'
      );
      
      navigate(`/devis/succes?ref=${result.quoteId}`);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error(
        language === 'fr' 
          ? 'Erreur lors de l\'envoi. Veuillez réessayer.' 
          : 'Error sending request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(
          language === 'fr' 
            ? 'Le fichier doit faire moins de 10 Mo' 
            : 'File must be less than 10 MB'
        );
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-serif">
            {language === 'fr' ? 'Demande de devis' : 'Quote request'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr' 
              ? 'Remplissez ce formulaire pour recevoir votre devis personnalisé'
              : 'Fill out this form to receive your personalized quote'
            }
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Nom & Prénom' : 'Full name'} *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'E-mail professionnel' : 'Business e-mail'} *
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Téléphone (+ indicatif)' : 'Phone (+country code)'} *
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Volume / poids' : 'Volume / weight'} *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={language === 'fr' ? 'Ex: 20 m³, 5 tonnes' : 'Ex: 20 m³, 5 tons'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <FormLabel>
                    {language === 'fr' ? 'Type d\'expédition' : 'Shipment type'} *
                  </FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {serviceOptions.map((service) => (
                      <FormField
                        key={service.value}
                        control={form.control}
                        name="services"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(service.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, service.value])
                                    : field.onChange(field.value?.filter((value) => value !== service.value))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {language === 'fr' ? service.labelFr : service.labelEn}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Lieu de départ' : 'Origin location'} *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'fr' ? 'Destination' : 'Destination'} *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === 'fr' ? 'Message complémentaire' : 'Additional details'}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={4}
                      placeholder={language === 'fr' ? 'Détails supplémentaires...' : 'Additional details...'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Pièce jointe (pdf/jpg, 10 Mo max)' : 'Attachment (pdf/jpg, 10 MB max)'}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {language === 'fr' ? 'Choisir un fichier' : 'Choose file'}
                </label>
                {file && (
                  <span className="text-sm text-gray-600">{file.name}</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-900 hover:bg-blue-800 px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {language === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Envoyer ma demande' : 'Send request'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default QuoteForm;
