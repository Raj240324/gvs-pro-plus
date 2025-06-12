import { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import { motion } from 'framer-motion';
import { Textarea } from '../components/ui/textarea';
import { useContactModal } from '../hooks/use-contact-modal';
import Button from '../components/ui/Button';
import emailjs from '@emailjs/browser';
import { Input } from '../components/ui/input';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Please try refreshing the page or contact support.</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-teal-500 text-white hover:bg-teal-600"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const contactModal = useContactModal();

  // Initialize EmailJS
  useEffect(() => {
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;
    if (!userID) {
      console.error('EmailJS userID is missing in environment variables.');
      toast({
        title: "Configuration Error",
        description: "EmailJS userID is missing. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    try {
      emailjs.init(userID);
      if (import.meta.env.DEV) {
        console.log('EmailJS initialized successfully');
      }
    } catch (error) {
      console.error('Failed to initialize EmailJS');
      toast({
        title: "Configuration Error",
        description: "Failed to initialize EmailJS. Please try again later.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Scroll animation for AOS effects
  useEffect(() => {
    document.title = 'Contact Us - GVS Controls';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reach out to GVS Controls for cutting-edge engineering solutions. Visit our Chengalpattu office or connect online.');
    }

    const handleScroll = () => {
      const elements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight * 0.75) {
          element.classList.add('aos-animate');
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const customerTemplateID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID;
    const ownerTemplateID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID;

    if (!serviceID || !customerTemplateID || !ownerTemplateID) {
      setIsSubmitting(false);
      console.error('EmailJS configuration is missing in environment variables.');
      toast({
        title: "Configuration Error",
        description: "EmailJS configuration is missing. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

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
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast({
        title: "Success!",
        description: "Your message has been sent. You'll receive a confirmation email shortly.",
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: unknown) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error('EmailJS error:', error);
      let errorText = 'No error text provided';
      let errorStatus = 'No status provided';
      if (typeof error === 'object' && error !== null) {
        if ('text' in error && typeof (error as { text?: string }).text === 'string') {
          errorText = (error as { text?: string }).text ?? errorText;
        }
        if ('status' in error && typeof (error as { status?: string }).status === 'string') {
          errorStatus = (error as { status?: string }).status ?? errorStatus;
        }
      }
      console.error('Error details:', { errorText, errorStatus });
    }
  };

  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-teal-400/30 to-purple-500/30 blur-sm"
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0.8, 0.3, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 3 }}
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );

  return (
    <ErrorBoundary>
      {/* Spacer to push content below fixed header, matching other pages */}
      <div className="h-[84px] lg:h-[140px]"></div>
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-teal-600 via-indigo-600 to-purple-700 overflow-hidden">
          <Particles />
          <div className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <motion.span
                  variants={fadeInUp}
                  className="inline-block px-4 py-1 sm:px-6 sm:py-2 mb-6 sm:mb-8 text-xs sm:text-base font-semibold text-white bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
                >
                  Let's Connect
                </motion.span>
                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-purple-200 drop-shadow-md"
                >
                  Contact GVS Controls
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
                >
                  Reach out to explore innovative solutions tailored to your needs.
                </motion.p>
                <motion.div variants={fadeInUp} className="mt-6 sm:mt-8 md:mt-10">
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={contactModal.onOpen}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:from-teal-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 sm:px-8 sm:py-3 rounded-full border-none outline-none focus:ring-0 focus:outline-none ring-0 hover:ring-0 active:ring-0 text-sm sm:text-base"
                  >
                    Start a Conversation
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16"
            >
              {[
                {
                  icon: <MapPin size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Office & Works',
                  content: 'Plot No.1476, Sengundram Main Road, Gokulapuram Chengalpattu Dist, Pin-603204 (Land Mark – Mas Robotics)',
                  link: 'https://maps.google.com/?q=Gokulapuram+Chengalpattu',
                  linkText: 'View on Map',
                },
                {
                  icon: <MapPin size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Reg. Office',
                  content: 'No.46/1, 5th Cross Street, Bagavathy Nagar, Govindarajapuram, Guduvanchery – 603202, Kanchipuram Dist',
                  link: 'https://maps.google.com/?q=Govindarajapuram+Guduvanchery',
                  linkText: 'View on Map',
                },
                {
                  icon: <Mail size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Email Us',
                  content: ['Projects: projects@gvscontrols.com', 'Services: services@gvscontrols.com', 'General: gvscontrols@gmail.com'],
                  link: 'mailto:projects@gvscontrols.com',
                  linkText: 'Send an Email',
                },
                {
                  icon: <Phone size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Call Us',
                  content: ['Mobile: +91 7338880027', 'Mobile: +91 9884001597'],
                  link: 'tel:+917338880027',
                  linkText: 'Call Now',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 p-0.5 transform group-hover:scale-110 transition-all duration-300">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                        <span className="text-teal-600 group-hover:text-purple-600 transition-colors duration-300">
                          {item.icon}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-purple-600 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
                      {Array.isArray(item.content) ? item.content.map((line, i) => <span key={i} className="block">{line}</span>) : item.content}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-teal-600 font-semibold hover:text-purple-600 transition-colors duration-300 relative group/link text-sm sm:text-base"
                    >
                      <span>{item.linkText}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 group-hover/link:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-teal-200 to-purple-200 dark:bg-gradient-to-br dark:from-teal-800 dark:to-purple-800 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
                  We're excited to hear from you—let's get started!
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-700 dark:text-gray-300 text-sm sm:text-base"
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
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      disabled={isSubmitting}
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:from-teal-600 hover:to-purple-700 transition-all duration-300 overflow-hidden group text-sm sm:text-base"
                    >
                      <span className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            Sent!
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4 sm:space-y-6"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Our Location
                </h2>
                <motion.div
                  className="relative rounded-xl overflow-hidden shadow-xl h-64 sm:h-80 md:h-96 border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31098.623780720175!2d80.00370507068343!3d12.685610674509662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b82805b7%3A0xfcf142a03e07e756!2sMaraimalai%20Nagar%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1650956281050!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GVS Controls Location"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </motion.div>
                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-lg"
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                    Business Hours
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    <div className="font-medium">Monday - Friday</div>
                    <div>9:00 AM - 6:00 PM</div>
                    <div className="font-medium">Saturday</div>
                    <div>9:00 AM - 1:00 PM</div>
                    <div className="font-medium">Sunday</div>
                    <div>Closed</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-700 via-indigo-800 to-purple-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 sm:mb-8 bg-clip-text bg-gradient-to-r from-teal-200 to-purple-200 text-transparent">
                Connect With Us
              </h2>
              <div className="flex justify-center space-x-6 sm:space-x-8">
                {[
                  {
                    icon: <Linkedin size={20} className="sm:w-7 sm:h-7" />,
                    link: "https://www.linkedin.com/company/gvs-controls",
                    name: "LinkedIn",
                    hoverColor: "#0A66C2",
                  },
                  {
                    icon: <Facebook size={20} className="sm:w-7 sm:h-7" />,
                    link: "https://www.facebook.com/gvscontrols",
                    name: "Facebook",
                    hoverColor: "#1877F2",
                  },
                  {
                    icon: <Twitter size={20} className="sm:w-7 sm:h-7" />,
                    link: "https://x.com/gvscontrols",
                    name: "Twitter",
                    hoverColor: "#1D9BF0",
                  },
                  {
                    icon: <Instagram size={20} className="sm:w-7 sm:h-7" />,
                    link: "https://www.instagram.com/gvscontrols",
                    name: "Instagram",
                    hoverColor: "#E4405F",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all duration-300"
                    style={{ '--hover-color': social.hoverColor } as React.CSSProperties}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)",
                      backgroundColor: social.hoverColor,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
};

export default Contact;