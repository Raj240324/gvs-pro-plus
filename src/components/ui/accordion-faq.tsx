"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: "1",
    question: "What services does GVS CONTROLS provide?",
    answer:
      "GVS CONTROLS specializes in Electrical & Instrumentation, including consultancy, engineering, and manufacturing. Our services cover project management, Process automation, and turnkey solutions for various industries.",
  },
  {
    id: "2",
    question: "What industries does GVS CONTROLS serve?",
    answer:
      "We cater to multiple sectors, including power plants Thermal, Biomass and Renewable energy (Solar), Steel Plants, Cement plants, Material Handling, Automobile industries, Chemical plants, Process plants, Cooling towers, and water treatment plants (STP, ETP, WTP).",
  },
  {
    id: "3",
    question: "What types of automation solutions do you offer?",
    answer:
      "We provide Relay logic Panels and PLC automation for process plants and machineries, Revamping and integrating electrical systems, Converting Relay Logic System in to PLC Based System, supplying of Motor control center (MCC) Panels, PLC/VFD panels, Process Control Panels, and field instruments.",
  },
  {
    id: "4",
    question: "Do you offer customized control panel solutions?",
    answer:
      "Yes, we design and manufacture custom-built control panels as per IE Standards & CEIG regulations, including power control centers, motor control centers, synchronizing panels, PLC/VFD Panels, and Machinery Control Panels.",
  },
  {
    id: "5",
    question: "What are the benefits of working with GVS CONTROLS?",
    answer:
      "- Experienced Team: Over 30 years of industry experience.\n- Cost-Effective Solutions: Tailored designs to optimize project costs.\n- Cutting-Edge Technology: Up-to-date automation & electrical solutions.\n- Customer-Centric Approach: Flexible and customized engineering services.",
  },
  {
    id: "6",
    question: "Can GVS CONTROLS assist in the procurement and commissioning process?",
    answer:
      "Absolutely! We provide end-to-end support, including material selection, procurement, approvals, installation, testing, and commissioning for electrical and automation systems.",
  },
  {
    id: "7",
    question: "What major projects have you executed?",
    answer:
      "We have successfully executed projects for SAIL, TISCO, Rastriya Ispat Nigam Ltd (Vizag), CPCL, MRL, Cochin Refinery, Sterlite Group, GMR, Aditya Birla Group, BHEL, NMDC, NTPC and Indian Navy (Sea Bird Project).",
  },
  {
    id: "8",
    question: "Does GVS CONTROLS provide maintenance and troubleshooting support?",
    answer:
      "Yes, we offer comprehensive maintenance, troubleshooting, and revamping services, including shutdown turnarounds, panel refurbishments, and upgrading relay-based systems to PLC automation.",
  },
  {
    id: "9",
    question: "How can I contact GVS CONTROLS?",
    answer:
      "Office & Works: Plot No.1476, Segundram Main Road, Gokulapuram- MaraimalaiNagar, Chengalpattu-(District), Pin:603209\nReg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar Govindarajapuram, Nandhivaram, Guduvanchery – 603202, Chengalpattu-(Dist)\nMobile: 7338880027 & 9884001597\nEmail: projects@gvscontrols.com & gvscontrols@gmail.com\nWebsite: www.gvscontrols.com",
  },
];

export function AccordionFAQ() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 relative overflow-hidden">
      {/* Optional subtle background blobs (pure Tailwind) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <span className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 text-white rounded-full text-sm sm:text-base font-bold tracking-wider mb-4 sm:mb-6 backdrop-blur-lg shadow-lg">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
            Got Questions?{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-400 text-transparent bg-clip-text">
              We've Got Answers
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl">
            Explore common queries about our services, expertise, and partnerships.
          </p>
        </div>

        {/* Accordion – matches accordion-05 design */}
        <div className="w-full max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-gray-700/50 hover:border-cyan-500/30 transition-colors duration-300"
              >
                <AccordionTrigger
                  className={cn(
                    "text-left pl-4 sm:pl-6 md:pl-10 lg:pl-14 hover:no-underline cursor-pointer group transition-all duration-300 py-4 sm:py-5 md:py-6 [&>svg]:text-white [&>svg]:hover:text-cyan-400 [&>svg]:transition-colors [&>svg]:duration-300 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6"
                  )}
                >
                  <div className="flex flex-1 items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    <div className="flex-shrink-0 mt-1">
                      <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs sm:text-sm md:text-base font-bold shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 group-hover:scale-110 transition-all duration-300">
                        {item.id}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-blue-400 group-hover:to-purple-400 text-white transition-all duration-300">
                      {item.question}
                    </h3>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-8 pl-6 sm:pl-8 md:pl-20 pr-4 sm:pr-6 md:pr-8">
                  <div className="text-gray-100 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl space-y-3">
                    {item.answer.split("\n").map((line, i) => {
                      // Check if line starts with bullet point
                      if (line.trim().startsWith("-")) {
                        return (
                          <div key={i} className="flex items-start gap-2 sm:gap-3 pl-2">
                            <span className="text-cyan-400 font-bold mt-1 sm:mt-1.5 text-sm sm:text-base">•</span>
                            <p className="flex-1 text-gray-100">{line.replace(/^-\s*/, "")}</p>
                          </div>
                        );
                      }
                      return (
                        <p key={i} className={i > 0 ? "mt-3" : ""}>
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}