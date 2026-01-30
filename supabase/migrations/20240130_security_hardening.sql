-- Add client_ip column to contact_requests table for rate limiting
ALTER TABLE public.contact_requests 
ADD COLUMN IF NOT EXISTS client_ip text;

-- Comment on column
COMMENT ON COLUMN public.contact_requests.client_ip IS 'IP address of the client submitting the form for rate limiting purposes';
