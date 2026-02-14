import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e2a44] to-[#2a9d8f]">
      <div className="container mx-auto px-6 pt-32 pb-20 flex flex-col items-center">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center mb-12 text-center"
        >
          <div className="bg-[#2a9d8f] rounded-full p-4 shadow-md mb-5">
            <FaShieldAlt className="text-white text-4xl" />
          </div>

          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl text-[#e0f7fa] tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-[#e0f7fa]/80 mt-3 max-w-xl">
            Protecting Your Privacy with Trust
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-8 md:p-12 text-[#1e2a44]"
        >
          <div className="prose max-w-none prose-headings:text-[#1e2a44] prose-a:text-[#2a9d8f]">

            <p className="text-right text-sm text-gray-500">
              <strong>
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>
            </p>
            <p className="mb-6">
              At <strong>M/s GVS Controls</strong> ("GVS Controls", "we", "us", or "our"), a leading provider of Electrical and Automation solutions established in 2017 with 30+ years of Promoter Experience in EPC Projects, we are committed to protecting your privacy. Our vision—"Our Vision To Your Solution"—drives our problem-solving culture that ensures optimal interaction between the Man-machine interface. Our Services span Expert Consultancy, Electrical Control Panel Manufacturing, PLC Automation, Engineering, Erection, Testing & Commissioning, Renovation & Revamping, and Turnkey Project solutions across industries including Power plants, Renewable energy, Material handling, Cement, Automotive, and Process plants. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <span className="font-semibold">www.gvscontrols.com</span>, engage with our Services, or interact with our solutions.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>1. Information We Collect</h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Personal Information</h3>
                <ul className="list-disc pl-5">
                  <li>Contact information (name, email address, phone number, postal address)</li>
                  <li>Company information (company name, job title, department, industry sector)</li>
                  <li>Project requirements, specifications, and technical details</li>
                  <li>Business inquiries and service requests</li>
                  <li>Communication preferences and correspondence history</li>
                  <li>Payment and billing information (when applicable for commercial transactions)</li>
                  <li>Professional credentials and certifications (for consultancy services)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Usage Data</h3>
                <ul className="list-disc pl-5">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent</li>
                  <li>Device information and operating system</li>
                  <li>Referral sources and search terms</li>
                  <li>Interaction with our content and features</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Cookies and Similar Technologies</h3>
                <p>We use cookies and similar tracking technologies to track activity on our website and store certain information.</p>
              </div>
            </div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected information for various purposes:
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Service Delivery</h3>
                <ul className="list-disc pl-5">
                  <li>Process and fulfill your requests for our Services (Consultancy, Manufacturing, Automation, EPC Projects)</li>
                  <li>Provide technical support, customer service, and project management</li>
                  <li>Manage and maintain client accounts and project documentation</li>
                  <li>Send service-related communications, project updates, and technical information</li>
                  <li>Coordinate with partners, suppliers, and subcontractors for project execution</li>
                  <li>Comply with IE (Indian Electricity) Standards and CEIG (Chief Electrical Inspectorate) regulations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Business Operations</h3>
                <ul className="list-disc pl-5">
                  <li>Improve our website and services</li>
                  <li>Conduct research and analysis</li>
                  <li>Monitor and prevent fraud</li>
                  <li>Ensure compliance with legal obligations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Marketing and Communications</h3>
                <ul className="list-disc pl-5">
                  <li>Send marketing communications (with your consent)</li>
                  <li>Personalize your experience</li>
                  <li>Measure the effectiveness of our marketing</li>
                  <li>Provide relevant content and offers</li>
                </ul>
              </div>
            </div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>3. Legal Basis for Processing</h2>
            <p className="mb-4">
              We process your personal information based on the following legal grounds:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Performance of a contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Legitimate business interests</li>
              <li>Your consent (where applicable)</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>4. Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Service Providers</h3>
                <p>Third-party vendors who perform services on our behalf, such as:</p>
                <ul className="list-disc pl-5">
                  <li>Website hosting and maintenance</li>
                  <li>Data analysis and analytics</li>
                  <li>Customer service and support</li>
                  <li>Payment processing and financial services</li>
                  <li>Cloud infrastructure and backend services (e.g., Vercel)</li>
                  <li>Web analytics services (e.g., Google Analytics 4)</li>
                  <li>Cloud storage and backup services</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Business Partners</h3>
                <p>Trusted partners who help us deliver our services, including:</p>
                <ul className="list-disc pl-5">
                  <li>Technology providers (PLC manufacturers, automation system vendors)</li>
                  <li>Manufacturing partners and component suppliers</li>
                  <li>EPC contractors and project consultants</li>
                  <li>Field instrument suppliers and distributors</li>
                  <li>Testing and certification agencies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Legal Requirements</h3>
                <p>We may disclose your information when required by law or to protect our rights, including:</p>
                <ul className="list-disc pl-5">
                  <li>Compliance with legal obligations</li>
                  <li>Protection of our rights and property</li>
                  <li>Prevention of fraud or illegal activity</li>
                </ul>
              </div>
            </div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and transmission</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="mb-4">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>6. Your Rights</h2>
            <motion.div
              className="my-6 p-4 bg-[#e9f7f6] border-l-4 border-[#2a9d8f] rounded-lg shadow-sm"
              whileHover={{ scale: 1.01, backgroundColor: '#d4f0ee' }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, please contact us at <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a>. We will respond to your request within 30 days.
              </p>
            </motion.div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>7. International Data Transfers</h2>
            <p className="mb-4">
              As a company operating primarily in India, your information is primarily processed within India. However, for projects involving international clients or global technology partners, your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Standard contractual clauses and data processing agreements</li>
              <li>Compliance with applicable data protection laws, including the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
              <li>Implementation of adequate technical and organizational measures</li>
              <li>Regular security assessments and audits</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>8. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, to comply with legal obligations, resolve disputes, and enforce our agreements. When your information is no longer required, we will securely delete or anonymize it in accordance with applicable laws.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>9. Children's Privacy</h2>
            <p className="mb-4">
              Our website and services are not intended for children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently received personal data from a child under 18, we will delete such information from our records immediately. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a>.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>10. Data Breach Notification</h2>
            <p className="mb-4">
              In the unlikely event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law, and take all reasonable steps to mitigate any potential impact.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>11. Updates to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. We will post the updated policy on this page and update the "Last Updated" date at the top. Material changes will be communicated through our website or via email to registered users. We encourage you to review this policy periodically for any changes. Your continued use of our website and services after any modifications indicates your acceptance of the updated Privacy Policy.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>12. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <address className="not-italic mb-4">
              <strong>GVS Controls</strong><br />
              Office & Works: Plot No.1476, Segundram Main Road, Gokulapuram- MaraimalaiNagar, Chengalpattu-(District), Pin:603209<br />
              Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar Govindarajapuram, Nandhivaram, Guduvanchery – 603202, Chengalpattu-(Dist)<br />
              Mobile: <a href="tel:+917338880027" className="underline hover:no-underline">7338880027</a> & <a href="tel:+919884001597" className="underline hover:no-underline">9884001597</a><br />
              Email: <a href="mailto:projects@gvscontrols.com" className="underline hover:no-underline">projects@gvscontrols.com</a> & <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a><br />
              Website: <a href="https://www.gvscontrols.com" className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">www.gvscontrols.com</a>
            </address>
            <div className="mt-8 pt-6 border-t border-[#2a9d8f]/20">
              <h3 className="text-lg font-semibold text-[#2a9d8f] mb-3">Website Development & Technical Contact</h3>
              <p className="mb-2">
                This website is developed and maintained by <strong>NagaDev</strong>. For any technical issues, accessibility concerns, or website-related inquiries, please contact:
              </p>
              <address className="not-italic">
                <strong>NagaDev</strong><br />
                Email: <a href="mailto:nagarajan.webdev@gmail.com" className="underline hover:no-underline">nagarajan.webdev@gmail.com</a>
              </address>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;