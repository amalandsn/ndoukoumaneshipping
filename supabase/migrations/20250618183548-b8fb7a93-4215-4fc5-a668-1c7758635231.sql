
-- Create storage bucket for quote files
INSERT INTO storage.buckets (id, name, public)
VALUES ('quote-files', 'quote-files', true);

-- Create storage policies for quote files
CREATE POLICY "Allow public access to quote files" ON storage.objects
FOR ALL USING (bucket_id = 'quote-files');

-- Create quotes table
CREATE TABLE public.quotes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  services TEXT[] NOT NULL,
  origin_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  volume_weight TEXT NOT NULL,
  message TEXT,
  file_url TEXT,
  language TEXT NOT NULL DEFAULT 'fr',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on quotes table
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations on quotes (since this is for public quote requests)
CREATE POLICY "Allow all operations on quotes" ON public.quotes
FOR ALL USING (true);

-- Create index for better performance
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at DESC);
CREATE INDEX idx_quotes_email ON public.quotes(email);
