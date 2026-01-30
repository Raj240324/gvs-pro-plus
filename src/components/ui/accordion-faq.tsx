"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Factory, 
  Cpu, 
  Settings, 
  Award, 
  ShoppingCart, 
  Globe, 
  Wrench, 
  Phone,
  ChevronDown,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: LucideIcon;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "What services does GVS CONTROLS provide?",
    answer: "GVS CONTROLS specializes in Electrical & Instrumentation, including Consultancy, Engineering, and Manufacturing. Our Services cover Project Management, Process Automation, and Turnkey solutions for various industries.",
    icon: Briefcase
  },
  {
    id: "2",
    question: "What industries does GVS CONTROLS serve?",
    answer: "We cater to multiple sectors, including power plants Thermal, Biomass and Renewable energy (Solar), Steel Plants, Cement plants, Material Handling, Automobile industries, Chemical plants, Process plants, Cooling towers, and water treatment plants (STP, ETP, WTP).",
    icon: Factory
  },
  {
    id: "3",
    question: "What types of automation solutions do you offer?",
    answer: "We provide Relay Logic Panels and PLC Automation for Process Plants and Machineries, Revamping and integrating Electrical Systems, Converting Relay Logic System in to PLC Based System, Supplying of Motor Control Center (MCC) Panels, PLC/VFD Panels, Process Control Panels, and Field Instruments.",
    icon: Cpu
  },
  {
    id: "4",
    question: "Do you offer customized control panel solutions?",
    answer: "Yes, we design and manufacture custom-built control panels as per IE Standards & CEIG Regulations, including Power Control Centers, Motor Control Centers, Synchronizing Panels, PLC/VFD Panels, and Machinery Control Panels.",
    icon: Settings
  },
  {
    id: "5",
    question: "What are the benefits of working with GVS CONTROLS?",
    answer: "- Experienced Team: Over 30 years of Promoter Experience in EPC Projects.\n- Cost-Effective Solutions: Tailored designs to optimize project costs.\n- Cutting-Edge Technology: Up-to-date Automation & Electrical solutions.\n- Customer-Centric Approach: Flexible and Customized Engineering services.",
    icon: Award
  },
  {
    id: "6",
    question: "Can GVS CONTROLS assist in the procurement and commissioning process?",
    answer: "Absolutely! We provide end-to-end support, including Material Selection, Procurement, Approvals, Installation, Testing, and Commissioning for Electrical and Automation systems.",
    icon: ShoppingCart
  },
  {
    id: "7",
    question: "What major projects have you executed?",
    answer: "GVS Controls (since 2017) has executed projects for Aumund Engineering, Loesche Energy, Metco Roofing, ARS Hydrojet, and Meenakshi Medical College. Our founder, with 30+ years of prior EPC experience, has worked on projects for SAIL, TISCO, RINL (Vizag), CPCL, Cochin Refinery, Sterlite Group, GMR, Aditya Birla Group, NTPC, and Indian Navy (Sea Bird Project).",
    icon: Globe
  },
  {
    id: "8",
    question: "Does GVS CONTROLS provide maintenance and troubleshooting support?",
    answer: "Yes, we offer comprehensive Maintenance, Troubleshooting, and Revamping services, including Shutdown Turnarounds, Panel Refurbishments, and upgrading Relay-Based Systems to PLC Automation.",
    icon: Wrench
  },
  {
    id: "9",
    question: "How can I contact GVS CONTROLS?",
    answer: "Office & Works: Plot No.1476, Segundram Main Road, Gokulapuram- MaraimalaiNagar, Chengalpattu-(District), Pin:603209\nReg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar Govindarajapuram, Nandhivaram, Guduvanchery – 603202, Chengalpattu-(Dist)\nMobile: 7338880027 & 9884001597\nEmail: projects@gvscontrols.com & gvscontrols@gmail.com\nWebsite: www.gvscontrols.com",
    icon: Phone
  },
];

export function AccordionFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    const newState = openId === id ? null : id;
    setOpenId(newState);
    
    // Removed auto-scroll to prevent jitter interacting with accordion animation
    // if (newState) { ... }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 relative overflow-hidden">
      {/* Dynamic Background Elements - Static optimized for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[100px]" 
        />
        <div 
          className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-wide uppercase mb-4"
          >
            Common Queries
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-6"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Everything you need to know about our services, expertise, and operational details.
          </motion.p>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-4 sm:gap-6">
          {faqs.map((item, index) => (
            <motion.div
              id={`faq-${item.id}`}
              layout
              key={item.id}
              className={cn(
                "group relative rounded-2xl border transition-all duration-300 overflow-hidden",
                openId === item.id 
                  ? "bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-900/20" 
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
              )}
            >
              <button
                onClick={() => handleToggle(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none"
              >
                <div className="flex items-center gap-3 sm:gap-6">
                  <div className={cn(
                    "relative flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-xl transition-all duration-300",
                    openId === item.id 
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40" 
                      : "bg-white/10 group-hover:bg-white/15"
                  )}>
                    <item.icon className={cn(
                      "w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-300",
                      openId === item.id ? "text-white" : "text-cyan-400 group-hover:text-cyan-300"
                    )} />
                  </div>
                  <span className={cn(
                    "text-sm sm:text-lg md:text-xl font-bold transition-colors duration-300 pr-4",
                    openId === item.id ? "text-white" : "text-slate-200 group-hover:text-white"
                  )}>
                    {item.question}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0",
                  openId === item.id ? "rotate-180 text-cyan-400" : "group-hover:text-cyan-400"
                )} />
              </button>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 sm:ml-[5.5rem] pr-2">
                      <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/30 to-transparent mb-4" />
                      <div className="text-slate-300 text-xs sm:text-base md:text-lg leading-relaxed space-y-2">
                        {item.answer.split('\n').map((line, i) => {
                           const isList = line.trim().startsWith('-');
                           const hasLabel = line.includes(':') && !isList; // distinct label for contact info
                           
                           return (
                             <div key={i} className={cn("block", isList && "flex items-start gap-3")}>
                                {isList && <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 sm:mt-2.5" />}
                                <span className="flex-1 text-slate-300">
                                  {hasLabel ? (
                                    <>
                                      <span className="text-cyan-400 font-bold block sm:inline mr-2">{line.split(':')[0]}:</span>
                                      <span>{line.split(':').slice(1).join(':')}</span>
                                    </>
                                  ) : (
                                    line.replace(/^-\s*/, '')
                                  )}
                                </span>
                             </div>
                           );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}