import { useEffect, useState, Component, ErrorInfo, ReactNode } from 'react';
import SendButton from '../components/ui/SendButton';
import { Mail, Phone, MapPin, Send, Linkedin, Clock, ArrowRight, MessageSquare, Globe, Building2 } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '../components/ui/textarea';
import { useContactModal } from '../hooks/use-contact-modal';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { Input } from '../components/ui/input';

// --- Error Boundary ---
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error('ErrorBoundary caught an error:', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">We're sorry, but the contact page encountered an error.</p>
            <Button onClick={() => window.location.reload()} className="w-full bg-slate-900 text-white hover:bg-slate-800">
              Reload Page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

interface FormData {
  name: string; email: string; phone: string; subject: string; message: string; bot_honey?: string;
}

// --- Animation Variants ---
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const bentoScale = { hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();
  const contactModal = useContactModal();

  useEffect(() => {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
       console.error('Supabase keys missing');
    }
  }, []);

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
        if (value && !/^[\d\s\+\-\(\)]+$/.test(value)) return 'Invalid characters in phone number';
        const digits = value.replace(/\D/g, '');
        if (value && (digits.length < 10 || digits.length > 15)) return 'Phone number must be 10-15 digits';
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
    if (name === 'phone' && !/^[\d\s\+\-\(\)]*$/.test(value)) return; 
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
        if (key === 'bot_honey') return;
        const error = validateField(key, formData[key as keyof FormData] || '');
        if (error) { newErrors[key] = error; isValid = false; }
    });

    if (!formData.name || !formData.email || !formData.message) {
       isValid = false;
       if (!formData.name) newErrors.name = 'Name is required';
       if (!formData.email) newErrors.email = 'Email is required';
       if (!formData.message) newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    if (!isValid) {
      toast({ title: "Check your form", description: "Please fix the highlighted errors.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('contact-us', { body: formData });
      if (error) throw error;

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      toast({ title: "Received!", description: "We'll be in touch shortly.", className: "bg-teal-500 text-white border-0" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      toast({ title: "Error", description: "Could not send message. Please try again.", variant: "destructive" });
      console.error(error);
    }
  };

  // Original Content Data
  const officeAddress = "Plot No.1476, Segundram Main Road,\nGokulapuram-MaraimalaiNagar,\nChengalpattu-(District),\nPin:603209";
  const regAddress = "No.46/1, 5th Cross Street,\nBagavathy Nagar Govindarajapuram,\nNandhivaram,\nGuduvanchery – 603202,\nChengalpattu-(Dist)";
  const phoneNumbers = ["+91 7338880027", "+91 9884001597"];
  const emails = [
    { label: "Projects", val: "projects@gvscontrols.com" },
    { label: "General", val: "gvscontrols@gmail.com" }
  ];

  return (
    <ErrorBoundary>
      <SEO title="Contact" description="Get expert consultation for Electrical Panels, PLC Automation & Turnkey EPC Solutions." canonical="/contact" />

      <main className="bg-slate-50 dark:bg-black pt-[84px] lg:pt-[128px] min-h-screen">
        
        {/* --- Hero Section (Preserved Background & Smaller Text) --- */}
        <section className="relative overflow-hidden min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-teal-600 via-indigo-600 to-purple-700 pb-32">
           {/* Abstract Shapes (Subtle) */}
           <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] mix-blend-overlay animate-pulse-slow" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400 rounded-full blur-[100px] mix-blend-overlay" />
           </div>

           <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium mb-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                   Available for New Inquiries
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4">
                   Let’s Engineer <br />
                   <span className="text-teal-200">Your Vision.</span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-base md:text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                   Connect with GVS Controls for world-class automation and electrical solutions. 
                   We typically respond within 2 hours.
                </motion.p>
              </motion.div>
           </div>
        </section>


        {/* --- Content Area --- */}
        <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-20 pb-20">
           
           {/* Bento Grid Layout (Restored Content) */}
           <motion.div 
             variants={staggerContainer}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
           >
              {/* Card 1: Office & Works */}
              <motion.div variants={bentoScale} className="col-span-1 md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col justify-between min-h-[280px] group hover:shadow-2xl transition-all">
                 <div className="flex items-start justify-between">
                    <div>
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                           <MapPin size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Office & Works</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line">
                           {officeAddress}
                        </p>
                    </div>
                 </div>
                 <a href="https://www.google.com/maps/place/12%C2%B046'13.5%22N+80%C2%B002'10.0%22E/@12.7704061,80.0335333,17z" target="_blank" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-semibold mt-4 group/link">
                    View on Map <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/link:translate-x-1" />
                 </a>
              </motion.div>

              {/* Card 2: Reg Office */}
              <motion.div variants={bentoScale} className="col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col justify-between min-h-[280px] group hover:shadow-2xl transition-all">
                 <div className="flex items-start justify-between">
                    <div>
                        <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                           <Building2 size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Reg. Office</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line">
                           {regAddress}
                        </p>
                    </div>
                 </div>
                 <a href="https://maps.google.com/?q=Govindarajapuram+Nandhivaram+Guduvanchery" target="_blank" className="inline-flex items-center text-teal-600 dark:text-teal-400 text-sm font-semibold mt-4 group/link">
                    View on Map <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/link:translate-x-1" />
                 </a>
              </motion.div>

              {/* Card 3: Contact Numbers */}
              <motion.div variants={bentoScale} className="col-span-1 lg:col-span-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between min-h-[240px]">
                 <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Phone size={18} /> Call Us</h3>
                    <div className="space-y-2">
                        {phoneNumbers.map((phone, i) => (
                           <div key={i} className="text-xl md:text-2xl font-bold tracking-tight">{phone}</div>
                        ))}
                    </div>
                    <p className="text-teal-50 text-xs mt-2 opacity-90">9:30 AM to 5:30 PM (Mon-Sat)</p>
                 </div>
                 <div className="grid grid-cols-2 gap-3 mt-4">
                   <a href={`tel:${phoneNumbers[0].replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center py-2.5 bg-white text-teal-700 text-sm rounded-lg font-bold hover:bg-teal-50 transition-colors">
                      Call Now
                   </a>
                   <a href="https://wa.me/917338880027" target="_blank" className="flex items-center justify-center py-2.5 bg-teal-700/50 backdrop-blur-md text-white border border-teal-400/30 text-sm rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                      WhatsApp
                   </a>
                 </div>
              </motion.div>

               {/* Card 4: Emails */}
               <motion.div variants={bentoScale} className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between min-h-[240px]">
                 <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Mail size={18} /> Email Us</h3>
                    <div className="space-y-3">
                       {emails.map((item, i) => (
                          <div key={i}>
                             <div className="text-xs text-blue-200 uppercase tracking-wider mb-0.5">{item.label}</div>
                             <a href={`mailto:${item.val}`} className="text-base md:text-lg font-medium hover:underline decoration-blue-300 underline-offset-4">{item.val}</a>
                          </div>
                       ))}
                    </div>
                 </div>
                 <a href="https://www.gvscontrols.com" target="_blank" className="flex items-center gap-2 text-blue-200 hover:text-white text-sm mt-4 transition-colors">
                    <Globe size={14} /> www.gvscontrols.com
                 </a>
              </motion.div>

           </motion.div>

           {/* Row 2: Form & Map Split */}
           <motion.div 
             variants={fadeInUp}
             initial="hidden" 
             whileInView="visible"
             viewport={{ once: true }}
             className="grid grid-cols-1 lg:grid-cols-2 gap-6"
           >
              
              {/* Interactive Form */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                 <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send a Message</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Fill out the form below and we'll get back to you shortly.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot */}
                    <div className="hidden opacity-0 w-0 h-0 overflow-hidden">
                       <input type="text" name="bot_honey" tabIndex={-1} autoComplete="off" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Name</label>
                          <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" 
                            className="h-10 text-sm bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg transition-all font-medium text-slate-900 dark:text-white" />
                          {errors.name && <p className="text-red-500 text-[10px] ml-1">{errors.name}</p>}
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Phone</label>
                          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." 
                            className="h-10 text-sm bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg transition-all font-medium text-slate-900 dark:text-white" />
                          {errors.phone && <p className="text-red-500 text-[10px] ml-1">{errors.phone}</p>}
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Email</label>
                       <Input name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" 
                          className="h-10 text-sm bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg transition-all font-medium text-slate-900 dark:text-white" />
                       {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1">Requirements</label>
                       <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={4}
                          className="text-sm bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg transition-all font-medium text-slate-900 dark:text-white resize-none p-3" />
                       {errors.message && <p className="text-red-500 text-[10px] ml-1">{errors.message}</p>}
                    </div>

                    <div className="pt-2">
                       <SendButton 
                          type="submit" 
                          isSubmitting={isSubmitting}
                          isSubmitted={isSubmitted}
                          className="w-full h-12 text-base font-bold rounded-lg shadow-lg shadow-indigo-500/20"
                          text="Send Request"
                       />
                    </div>
                 </form>
              </div>

              {/* Map Column */}
              <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 h-full min-h-[400px] relative group">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.313100667616!2d80.03353331481997!3d12.770406090991582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5251147040843f%3A0x6d9006930514210e!2s12%C2%B046&#39;13.5%22N%2080%C2%B002&#39;10.0%22E!5e0!3m2!1sen!2sin!4v1677654321098!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 block"
                    title="GVS Controls Location"
                />
                <div className="absolute top-4 right-4">
                     <a href="https://www.linkedin.com/feed/update/urn:li:activity:7386648123668021248/" target="_blank" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                        <Linkedin size={18} />
                     </a>
                </div>
              </div>

           </motion.div>

        </div>
      </main>
    </ErrorBoundary>
  );
};

export default Contact;