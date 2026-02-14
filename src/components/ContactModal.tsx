import { useState, useEffect, FormEvent } from 'react';
import SendButton from './ui/SendButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Send, CheckCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';


interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Lock body scroll when modal is open
    if (open) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [open]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (/[0-9]/.test(value)) return 'Name should not contain numbers';
        return '';
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
        return '';
      case 'phone':
        // Allow digits, spaces, +, -, (, )
        if (value && !/^[\d\s\+\-\(\)]+$/.test(value)) return 'Invalid characters';
        // Check for reasonable digit count (e.g. 10-15)
        const digits = value.replace(/\D/g, '');
        if (value && (digits.length < 10 || digits.length > 15)) return 'Must be 10-15 digits';
        return '';
      case 'message':
        if (value.length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For phone, prevent entering invalid chars
    if (name === 'phone') {
        if (!/^[\d\s\+\-\(\)]*$/.test(value)) return; 
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key as keyof typeof formData] || '');
        if (error) {
            newErrors[key] = error;
            isValid = false;
        }
    });

    if (!formData.name || !formData.email || !formData.message) {
      isValid = false;
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.message) newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);

    if (!isValid) {
      toast({
        title: "Error",
        description: "Please check the form for errors.",
        variant: "destructive",
        className: "bg-red-500 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Call Vercel API Route
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});

      toast({
        title: "Success!",
        description: "Your message has been sent. You'll receive a confirmation email shortly.",
        className: "bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4 animate-slide-up",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        onOpenChange(false);
      }, 2000);
    } catch (error: any) {
      console.error('Submission Error:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
        className: "bg-red-500 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[95vw] max-w-[400px] sm:max-w-[500px] md:max-w-[600px] p-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-[2rem] z-[2500]"
      >
        <div className="relative flex flex-col h-full p-8 md:p-10">
          {/* Custom Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold text-center text-slate-900 dark:text-white tracking-tight">
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-base text-slate-500 dark:text-slate-400 text-center mt-2">
              Reach out for expert solutions and technical support.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400">We'll get back to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, overflow: 'hidden' }}>
                  <input type="text" name="bot_honey" tabIndex={-1} autoComplete="off" onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Arun Kumar"
                    disabled={isSubmitting}
                    className={`h-12 px-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 ${errors.name ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 font-medium ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="arun.kumar@company.com"
                    disabled={isSubmitting}
                    className={`h-12 px-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 ${errors.email ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 font-medium ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                    className="h-12 px-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Subject</label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))} 
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 text-slate-700 dark:text-slate-200 font-medium">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-2xl z-[3000]">
                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                        <SelectItem value="Project Consultation">Project Consultation</SelectItem>
                        <SelectItem value="Product Information">Product Information</SelectItem>
                        <SelectItem value="Service Request">Service Request</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  rows={4}
                  disabled={isSubmitting}
                  className={`min-h-[120px] p-4 bg-slate-50 dark:bg-slate-800/50 border-0 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 resize-none ${errors.message ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`}
                />
                {errors.message && <p className="text-xs text-red-500 font-medium ml-1">{errors.message}</p>}
              </div>

              <div className="pt-4">
                <SendButton 
                  type="submit" 
                  disabled={isSubmitting} 
                  isSubmitting={isSubmitting}
                  isSubmitted={isSubmitted}
                  className="w-full text-lg shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20" 
                  text="Send Message" 
                />
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;