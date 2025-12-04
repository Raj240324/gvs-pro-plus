import { useState, useEffect, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;
    if (!userID) {
      toast({
        title: "Configuration Error",
        description: "EmailJS userID is missing. Please contact support.",
        variant: "destructive",
        className: "bg-red-500 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4",
      });
      return;
    }
    try {
      emailjs.init({ publicKey: userID });
    } catch (error) {
      toast({
        title: "Configuration Error",
        description: "Failed to initialize EmailJS. Please try again later.",
        variant: "destructive",
        className: "bg-red-500 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4",
      });
    }
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive",
        className: "bg-red-500 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4",
      });
      return;
    }

    setIsSubmitting(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const customerTemplateID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
    const ownerTemplateID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID;

    if (!serviceID || !customerTemplateID || !ownerTemplateID) {
      setIsSubmitting(false);
      toast({
        title: "Configuration Error",
        description: "EmailJS configuration is missing. Please check your .env file.",
        variant: "destructive",
        className: "bg-red-500 text-white rounded-lg shadow-lg max-w-[90vw] mx-auto bottom-4",
      });
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject || 'Not provided',
      message: formData.message,
    };

    try {
      const customerPromise = emailjs.send(serviceID, customerTemplateID, {
        ...templateParams,
        to_email: formData.email,
      });
      const ownerPromise = emailjs.send(serviceID, ownerTemplateID, {
        ...templateParams,
        to_email: 'naga240324@gmail.com',
      });
      await Promise.all([customerPromise, ownerPromise]);

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

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
        className="w-[95vw] max-w-[400px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[800px] p-4 sm:p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-xl z-[2500] mt-[60px] sm:mt-0 h-auto max-h-[calc(100vh-70px)]"
      >
        <div className="relative flex flex-col h-full">
          {/* Custom Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300"
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

          <DialogHeader className="relative z-10 shrink-0 mt-2 sm:mt-0">
            <DialogTitle className="text-lg sm:text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Connect With Us
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center">
              Share your thoughts, and we’ll respond promptly.
            </DialogDescription>
          </DialogHeader>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-6 sm:py-8 text-center relative z-10 grow"
              style={{ position: 'relative' }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-purple-600"
              >
                <CheckCircle className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </motion.div>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Thank You!</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
                Your message has been sent successfully.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4 relative z-10 grow flex flex-col">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="modal-name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    className="text-xs sm:text-sm py-1 sm:py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="modal-email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    className="text-xs sm:text-sm py-1 sm:py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="modal-phone" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="text-xs sm:text-sm py-1 sm:py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <label htmlFor="modal-subject" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <select
                    id="modal-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-gray-700 dark:text-gray-300"
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

              <div className="space-y-1 sm:space-y-2 flex-grow">
                <label htmlFor="modal-message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="modal-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full text-xs sm:text-sm bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 h-[80px] sm:h-[100px]"
                  disabled={isSubmitting}
                />
              </div>

              <div className="pt-2 shrink-0">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden w-full px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold shadow-md hover:from-teal-600 hover:to-purple-700 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                        <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
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