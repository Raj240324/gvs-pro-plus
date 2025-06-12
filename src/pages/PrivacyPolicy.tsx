import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#1e2a44] to-[#2a9d8f] bg-fixed"
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-24 md:pt-28 lg:pt-44 pb-16 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 sm:mb-10">
          <motion.div
            className="bg-[#2a9d8f] rounded-full p-4 shadow-lg mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FaShieldAlt className="text-white text-5xl" />
          </motion.div>
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-2 text-[#e0f7fa] drop-shadow-lg tracking-tight text-center relative">
            Privacy Policy
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6f61] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            />
          </h1>
          <p className="text-[#e0f7fa] text-lg font-medium text-center max-w-xl opacity-90">
            Protecting Your Privacy with Trust
          </p>
        </div>
        {/* Content Card */}
        <motion.div
          className="w-full max-w-4xl bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg p-8 md:p-12 text-[#1e2a44] relative z-10 border border-[#2a9d8f]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="prose max-w-none text-[#1e2a44] prose-headings:text-[#ff6f61] prose-a:text-[#2a9d8f] prose-a:hover:text-[#ff6f61] text-base leading-relaxed">
            <p className="mb-4 text-right text-sm text-[#666]">
              <strong>Last Updated: April 20, 2025</strong>
            </p>
            <p className="mb-6">
              At <strong>GVS Controls</strong>, a leading provider of electrical and automation solutions since 2017, we are committed to protecting your privacy. Our services span consultancy, engineering, manufacturing, and automation across industries such as power plants, renewable energy, cement, and automotive sectors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <span className="font-semibold">www.gvscontrols.com</span>, engage with our services, or interact with our turnkey project solutions.
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
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Company information (company name, job title, department)</li>
                  <li>Project requirements and specifications</li>
                  <li>Communication preferences</li>
                  <li>Payment information (when applicable)</li>
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
                <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. For detailed information about the cookies we use and your choices regarding cookies, please see our <a href="/cookie-policy" className="underline hover:no-underline">Cookie Policy</a>.</p>
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
                  <li>Process and fulfill your requests for our services</li>
                  <li>Provide technical support and customer service</li>
                  <li>Manage and maintain your account</li>
                  <li>Send service-related communications</li>
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
                  <li>Payment processing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Business Partners</h3>
                <p>Trusted partners who help us deliver our services, including:</p>
                <ul className="list-disc pl-5">
                  <li>Technology providers</li>
                  <li>Manufacturing partners</li>
                  <li>Distribution networks</li>
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
              Your information may be transferred to and processed in countries other than your own, particularly for projects involving global clients. We ensure appropriate safeguards are in place for such transfers, including:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Standard contractual clauses</li>
              <li>Data processing agreements</li>
              <li>Compliance with applicable data protection laws</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>8. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>The length of time we have an ongoing relationship with you</li>
              <li>Whether there is a legal obligation to which we are subject</li>
              <li>Whether retention is advisable in light of our legal position</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>9. Children's Privacy</h2>
            <p className="mb-4">
              Our website and services are not directed to children under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>10. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <address className="not-italic mb-4">
              <strong>GVS Controls</strong><br />
              Office & Works: Plot No.1476, Sengundram Main Road, Gokulapuram Chengalpattu Dist, Pin-603204<br />
              (Land Mark – Mas Robotics)<br />
              Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar, Govindarajapuram, Guduvanchery – 603202, Kanchipuram Dist<br />
              Mobile: <a href="tel:+917338880027" className="underline hover:no-underline">+91 73388 80027</a> & <a href="tel:+919884001597" className="underline hover:no-underline">+91 98840 01597</a><br />
              Email: <a href="mailto:projects@gvscontrols.com" className="underline hover:no-underline">projects@gvscontrols.com</a>, <a href="mailto:services@gvscontrols.com" className="underline hover:no-underline">services@gvscontrols.com</a>, <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a>
            </address>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;