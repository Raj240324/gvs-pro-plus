import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs: { question: string; answer: string }[] = [
    {
      question: "What services does GVS CONTROLS provide?",
      answer: "GVS CONTROLS specializes in electrical & automation solutions, including consultancy, engineering, and manufacturing. Our services cover project management, control panel manufacturing, process automation, and turnkey solutions for various industries."
    },
    {
      question: "What industries does GVS CONTROLS serve?",
      answer: "We cater to multiple sectors, including power plants (thermal, biomass, solar), renewable energy, steel & cement plants, automobile industries, chemical plants, process plants, cooling towers, and water treatment plants (STP, ETP, WTP)."
    },
    {
      question: "What types of automation solutions do you offer?",
      answer: "We provide relay logic and PLC automation for process plants and machineries, revamping and integrating electrical systems, and supplying motor control center (MCC) panels, VFD panels, relay logic panels, and field instruments."
    },
    {
      question: "Do you offer customized control panel solutions?",
      answer: "Yes, we design and manufacture custom-built control panels as per IE Standards & CEIG regulations, including power control centers, motor control centers, synchronizing panels, PLC panels, and special-purpose panels."
    },
    {
      question: "What are the benefits of working with GVS CONTROLS?",
      answer: "- Experienced Team: Over 30 years of industry experience.\n- Cost-Effective Solutions: Tailored designs to optimize project costs.\n- Cutting-Edge Technology: Up-to-date automation & electrical solutions.\n- Customer-Centric Approach: Flexible and customized engineering services."
    },
    {
      question: "Can GVS CONTROLS assist in the procurement and commissioning process?",
      answer: "Absolutely! We provide end-to-end support, including material selection, procurement, approvals, installation, testing, and commissioning for electrical and automation systems."
    },
    {
      question: "What major projects have you executed?",
      answer: "We have successfully executed projects for SAIL, TISCO, Rastriya Ispat Nigam Ltd (Vizag), CPCL, MRL, Cochin Refinery, Sterlite Group, GMR, Aditya Birla Group, and Indian Navy (Sea Bird Project)."
    },
    {
      question: "Does GVS CONTROLS provide maintenance and troubleshooting support?",
      answer: "Yes, we offer comprehensive maintenance, troubleshooting, and revamping services, including shutdown turnarounds, panel refurbishments, and upgrading relay-based systems to PLC automation."
    },
    {
      question: "How can I contact GVS CONTROLS?",
      answer: "📍 Office: No.9/14, First Floor, EWS Plot, Gudalur, Maraimalai Nagar, Chengalpattu – 603209\n📍 Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar, Govindarajapuram, Guduvanchery – 603202, Kanchipuram\n📞 Mobile: +91 9087772798\n✉️ Email: gvscontrols@gmail.com"
    }
  ];

  // Animation variants for the answer
  const answerVariants = {
    hidden: { 
      opacity: 0, 
      rotateX: -90, 
      scale: 0.9, 
      transformOrigin: "top" 
    },
    visible: { 
      opacity: 1, 
      rotateX: 0, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        when: "beforeChildren"
      } 
    },
    exit: { 
      opacity: 0, 
      rotateX: 90, 
      scale: 0.9, 
      transition: { 
        duration: 0.4, 
        ease: "easeIn" 
      } 
    }
  };

  // Glowing edge animation for the answer
  const glowVariants = {
    visible: { 
      boxShadow: [
        "0 0 10px rgba(0, 255, 255, 0.5)",
        "0 0 20px rgba(0, 255, 255, 0.8)",
        "0 0 10px rgba(0, 255, 255, 0.5)"
      ],
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.25, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <motion.span 
            className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 text-white rounded-full text-sm sm:text-base font-bold tracking-wider mb-4 sm:mb-6 backdrop-blur-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            Frequently Asked Questions
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
            Got Questions?{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 text-transparent bg-clip-text">
              We’ve Got Answers
            </span>
          </h2>
          <motion.p 
            className="text-gray-200 max-w-xl sm:max-w-2xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore common queries about our services, expertise, and partnerships.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 sm:mb-6"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 sm:p-5 md:p-6 bg-gray-800/80 rounded-xl sm:rounded-2xl shadow-xl flex justify-between items-center transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-purple-500/30 group relative overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Hover Glow Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300 relative z-10">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 transition-transform duration-300 relative z-10 ${openFAQ === index ? 'rotate-180' : ''}`}
                />
              </motion.button>

              {/* Animated Answer with Flip and Glow */}
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 sm:p-5 md:p-6 bg-gray-700/90 rounded-b-xl sm:rounded-b-2xl text-gray-100 text-sm sm:text-base md:text-lg relative overflow-hidden"
                  >
                    {/* Glowing Edge */}
                    <motion.div
                      className="absolute inset-0"
                      variants={glowVariants}
                      animate="visible"
                    />
                    <div className="relative z-10">
                      {faq.answer.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">{line}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;