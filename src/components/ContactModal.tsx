import { useState, useEffect, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { PiPaperPlaneTiltFill, PiCheckCircleFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

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
      // Call Supabase Edge Function
      const { error } = await supabase.functions.invoke('contact-us', {
        body: formData,
      });

      if (error) throw error;

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
        className="w-[95vw] max-w-[400px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] p-4 sm:p-5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-xl z-[2500] sm:mt-0 h-auto max-h-[95vh] overflow-y-auto"
      >
        <div className="relative flex flex-col h-full">
          {/* Custom Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-1 right-1 sm:top-3 sm:right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20"
            aria-label="Close modal"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Background Effects */}
          <div className="absolute inset-0 rounded-xl overflow-hidden -z-10 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-200/10 via-indigo-200/10 to-purple-200/10 animate-gradient-shift"></div>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-teal-400/20 to-purple-400/20"
                style={{
                  width: `${Math.random() * 15 + 5}px`,
                  height: `${Math.random() * 15 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float-particle ${Math.random() * 5 + 10}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <DialogHeader className="relative z-10 shrink-0 mt-1 sm:mt-0">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Connect With Us
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-xs text-gray-600 dark:text-gray-300 text-center">
              Share your thoughts, and we’ll respond promptly.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-4 sm:py-6 text-center relative z-10 grow"
              style={{ position: 'relative' }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-purple-600"
              >
                <PiCheckCircleFill className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
              </motion.div>
              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white">Thank You!</h3>
              <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 mt-1">
                Your message has been sent successfully.
              </p>
            </motion.div>
          ) : (
              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 mt-2 sm:mt-3 relative z-10 grow flex flex-col">
                {/* Honeypot Field - Hidden */}
                <div style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, overflow: 'hidden' }}>
                    <input type="text" name="bot_honey" tabIndex={-1} autoComplete="off" onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div className="space-y-0.5 sm:space-y-1">
                  <label htmlFor="modal-name" className="block text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`text-xs sm:text-xs py-1.5 sm:py-1.5 h-9 sm:h-9 bg-white/50 dark:bg-gray-700/50 border rounded-md focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all duration-300 ${errors.name ? 'border-red-500' : 'border-gray-400 dark:border-gray-600'}`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] sm:text-[10px] mt-0.5">{errors.name}</p>}
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <label htmlFor="modal-email" className="block text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={`text-xs sm:text-xs py-1.5 sm:py-1.5 h-9 sm:h-9 bg-white/50 dark:bg-gray-700/50 border rounded-md focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-gray-400 dark:border-gray-600'}`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] sm:text-[10px] mt-0.5">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div className="space-y-0.5 sm:space-y-1">
                  <label htmlFor="modal-phone" className="block text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`text-xs sm:text-xs py-1.5 sm:py-1.5 h-9 sm:h-9 bg-white/50 dark:bg-gray-700/50 border rounded-md focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all duration-300 ${errors.phone ? 'border-red-500' : 'border-gray-400 dark:border-gray-600'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] sm:text-[10px] mt-0.5">{errors.phone}</p>}
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                  <label htmlFor="modal-subject" className="block text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <select
                    id="modal-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 sm:px-3 sm:py-1.5 h-9 sm:h-9 text-xs sm:text-xs bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-700 dark:text-gray-300"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Project Consultation">Project Consultation</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Service Request">Service Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-0.5 sm:space-y-1 flex-grow">
                <label htmlFor="modal-message" className="block text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="modal-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  required
                  className={`w-full text-xs sm:text-xs bg-white/50 dark:bg-gray-700/50 border rounded-md focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all duration-300 h-20 sm:h-[80px] ${errors.message ? 'border-red-500' : 'border-gray-400 dark:border-gray-600'}`}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="text-red-500 text-[10px] sm:text-[10px] mt-0.5">{errors.message}</p>}
              </div>

              <div className="pt-1 shrink-0">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden w-full px-3 py-2 sm:px-5 sm:py-2.5 rounded-md bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold shadow-md hover:from-teal-600 hover:to-purple-700 transition-all duration-300 group text-sm sm:text-sm"
                  whileHover={{ scale: 1.01, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <PiPaperPlaneTiltFill className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;