import { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Clock } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import { motion } from 'framer-motion';
import { Textarea } from '../components/ui/textarea';
import { useContactModal } from '../hooks/use-contact-modal';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';
import emailjs from '@emailjs/browser';
import { Input } from '../components/ui/input';

// Error Boundary (unchanged)
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error('ErrorBoundary caught an error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Please try refreshing the page or contact support.</p>
            <Button onClick={() => window.location.reload()} className="bg-teal-500 text-white hover:bg-teal-600">
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
  name: string; email: string; phone: string; subject: string; message: string;
}

interface ContactItem {
  icon: JSX.Element;
  title: string;
  content?: string;
  link?: string;
  linkText?: string;
  emails?: { label: string; email: string; url?: string }[];
  phones?: string[];
  hours?: string;
  days?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const contactModal = useContactModal();

  useEffect(() => {
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;
    if (!userID) {
      console.error('EmailJS userID is missing');
      toast({ title: "Configuration Error", description: "EmailJS userID missing.", variant: "destructive" });
      return;
    }
    emailjs.init(userID);
  }, [toast]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      toast({ title: "Error", description: "Email configuration missing.", variant: "destructive" });
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
      await Promise.all([
        emailjs.send(serviceID, customerTemplateID, { ...templateParams, to_email: formData.email }),
        emailjs.send(serviceID, ownerTemplateID, { ...templateParams, to_email: 'naga240324@gmail.com' })
      ]);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast({ title: "Success!", description: "Message sent successfully!" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      toast({ title: "Error", description: "Failed to send message.", variant: "destructive" });
      console.error(error);
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
      <SEO title="Contact" description="Reach out to GVS Controls..." canonical="/contact" />

      <main className="overflow-hidden pt-[84px] lg:pt-[128px]">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-teal-600 via-indigo-600 to-purple-700 min-h-[50vh] flex items-center overflow-hidden">
          <Particles />
          <div className="relative z-10 py-16 md:py-20 w-full">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <motion.span variants={fadeInUp} className="inline-block px-4 py-1 sm:px-6 sm:py-2 mb-6 sm:mb-8 text-xs sm:text-base font-semibold text-white bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
                  Get in Touch
                </motion.span>
                <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-200 to-purple-200 drop-shadow-md">
                  Contact GVS Controls
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                  Get expert consultation for Electrical Panels, PLC Automation & Turnkey EPC Solutions. Custom quote within 24 hours.
                </motion.p>
                <motion.div variants={fadeInUp} className="mt-6 sm:mt-8 md:mt-10">
                  <Button variant="gradient" size="lg" onClick={contactModal.onOpen}
                    className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:from-teal-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2 sm:px-8 sm:py-3 rounded-full border-none">
                    Request a Quote
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4 Perfect Cards */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16"
            >


              {[
                {
                  icon: <MapPin size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Office & Works',
                  content: 'Plot No.1476, Segundram Main Road,\nGokulapuram-MaraimalaiNagar,\nChengalpattu-(District),\nPin:603209',
                  link: 'https://www.google.com/maps/place/12%C2%B046\'13.5%22N+80%C2%B002\'10.0%22E/@12.7704061,80.0335333,17z/data=!3m1!4b1!4m4!3m3!8m2!3d12.7704061!4d80.0361082?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D',
                  linkText: 'View on Map',
                },
                {
                  icon: <MapPin size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Reg. Office',
                  content: 'No.46/1, 5th Cross Street,\nBagavathy Nagar Govindarajapuram,\nNandhivaram,\nGuduvanchery – 603202,\nChengalpattu-(Dist)',
                  link: 'https://maps.google.com/?q=Govindarajapuram+Nandhivaram+Guduvanchery',
                  linkText: 'View on Map',
                },
                {
                  icon: <Mail size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Email Us',
                  emails: [
                    { label: 'Projects', email: 'projects@gvscontrols.com' },
                    { label: 'General', email: 'gvscontrols@gmail.com' },
                    { label: 'Website', email: 'www.gvscontrols.com', url: 'https://www.gvscontrols.com' },
                  ],
                },
                {
                  icon: <Phone size={24} className="sm:w-8 sm:h-8" />,
                  title: 'Call Us',
                  phones: ['+91 7338880027', '+91 9884001597'],
                  hours: '9:30 AM to 5:30 PM',
                  days: 'Monday to Saturday',
                },
              ].map((item: ContactItem, index: number) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-purple-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-xl"></div>
                  <div className="relative z-10 text-center">
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

                    {/* Address */}
                    {item.content && (
                      <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    )}

                    {/* Emails */}
                    {item.emails && (
                      <div className="space-y-3 text-xs sm:text-sm">
                        {item.emails.map((e, i: number) => (
                          <div key={i}>
                            <span className="block text-gray-500 dark:text-gray-400">{e.label}:</span>
                            {e.url ? (
                              <a href={e.url} target="_blank" rel="noopener noreferrer" className="font-medium text-teal-600 hover:text-purple-600 break-all">
                                {e.email}
                              </a>
                            ) : (
                              <a href={`mailto:${e.email}`} className="font-medium text-teal-600 hover:text-purple-600 break-all">
                                {e.email}
                              </a>
                            )}
                          </div>
                        ))}
                        <a href="mailto:projects@gvscontrols.com" className="inline-block mt-4 text-teal-600 font-semibold hover:text-purple-600">
                          Send an Email →
                        </a>
                      </div>
                    )}

                    {/* Call Us + Working Hours */}
                    {item.phones && (
                      <div className="space-y-3 text-xs sm:text-sm">
                        {item.phones.map((p: string, i: number) => (
                          <div key={i}>
                            <span className="block text-gray-500 dark:text-gray-400">Mobile:</span>
                            <a href={`tel:${p.replace(/[^0-9+]/g, '')}`} className="font-medium text-teal-600 hover:text-purple-600">
                              {p}
                            </a>
                          </div>
                        ))}
                        <div className="pt-4 mt-4 border-t border-gray-300 dark:border-gray-600">
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4 text-teal-600" />
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{item.hours}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.days}</p>
                        </div>
                        <a href="tel:+917338880027" className="inline-block mt-4 text-teal-600 font-semibold hover:text-purple-600">
                          Call Now →
                        </a>
                      </div>
                    )}

                    {/* View on Map */}
                    {item.linkText && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full mt-6 text-teal-600 font-semibold hover:text-purple-600 transition-colors duration-300 relative group/link text-sm sm:text-base"
                      >
                        <span>{item.linkText}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 group-hover/link:w-full transition-all duration-300"></span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form + Map + Social - Your Original */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
              {/* Contact Form - now flex col to match height exactly */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-teal-200 to-purple-200 dark:from-teal-800 dark:to-purple-800 backdrop-blur-md rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base">
                  We're excited to hear from you—let's get started!
                </p>
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      disabled={isSubmitting} />
                  </div>
                </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                      <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                        disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Subject</label>
                      <select id="subject" name="subject" value={formData.subject} onChange={handleChange}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                        disabled={isSubmitting}>
                        <option value="">Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Project Consultation</option>
                        <option>Product Information</option>
                        <option>Service Request</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-400 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md text-sm sm:text-base"
                      disabled={isSubmitting} />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
                    <Button type="submit" disabled={isSubmitting} className="w-full py-3 px-8 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:from-teal-600 hover:to-purple-700 transition-all duration-300">
                      {isSubmitting ? 'Sending...' : isSubmitted ? 'Sent!' : 'Send Message'} {isSubmitted && <CheckCircle className="inline ml-2" />}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>

              {/* Map + Working Hours - same exact container style */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-teal-200 to-purple-200 dark:from-teal-800 dark:to-purple-800 backdrop-blur-md rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Our Location
                </h2>

                <div className="flex-1 rounded-xl overflow-hidden shadow-inner mb-6">
                  <iframe
                    src="https://www.google.com/maps?q=12.7704061,80.0361082&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '360px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GVS Controls Location"
                  />
                </div>

                {/* Working Hours - now here */}
                <div className="bg-white/40 dark:bg-black/30 backdrop-blur-sm rounded-lg p-6 text-center border border-white/40">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Clock className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                    <span className="text-xl font-bold text-gray-800 dark:text-white">
                      9:30 AM to 5:30 PM
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Monday to Saturday
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-teal-700 via-indigo-800 to-purple-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 sm:mb-8 bg-clip-text bg-gradient-to-r from-teal-200 to-purple-200 text-transparent">
                Connect With Us
              </h2>
              <div className="flex justify-center space-x-6 sm:space-x-8">
                <motion.a href="https://www.linkedin.com/feed/update/urn:li:activity:7386648123668021248/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.15, rotate: 5, boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)" }}>
                  <Linkedin className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
};

export default Contact;