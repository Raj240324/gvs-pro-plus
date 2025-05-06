import { motion } from 'framer-motion';
import { FaFileContract } from 'react-icons/fa';

const TermsOfService = () => {
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
            <FaFileContract className="text-white text-5xl" />
          </motion.div>
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-2 text-[#e0f7fa] drop-shadow-lg tracking-tight text-center relative">
            Terms of Service
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6f61] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            />
          </h1>
          <p className="text-[#e0f7fa] text-lg font-medium text-center max-w-xl opacity-90">
            Governing Your Use of Our Services
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
              Welcome to <strong>www.gvscontrols.com</strong> (the "Website"), operated by GVS Controls ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of the Website and any services, information, or content provided by GVS Controls. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please refrain from using the Website.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>1. Definitions</h2>
            <p className="mb-4">
              <strong>"User"</strong> refers to any individual or entity accessing or using the Website.<br />
              <strong>"Content"</strong> means all information, text, images, graphics, logos, documents, and other materials available on the Website.<br />
              <strong>"Services"</strong> refers to consultancy, engineering, manufacturing, automation, and related services offered by GVS Controls.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>2. Use of the Website</h2>
            <p className="mb-4">
              You agree to use the Website solely for lawful purposes and in accordance with these Terms. Your responsibilities include:
            </p>
            <motion.div
              className="my-6 p-4 bg-[#e9f7f6] border-l-4 border-[#2a9d8f] rounded-lg shadow-sm"
              whileHover={{ scale: 1.01, backgroundColor: '#d4f0ee' }}
              transition={{ duration: 0.3 }}
            >
              <ul className="list-disc pl-5 mb-4">
                <li>Do not engage in any activity that could damage, disable, overburden, or impair the Website or interfere with any other party's use of the Website.</li>
                <li>Do not attempt to gain unauthorized access to any portion or feature of the Website, or any systems or networks connected to the Website.</li>
                <li>Do not transmit or upload any viruses, malware, or other harmful code.</li>
                <li>Do not use the Website to infringe upon the rights of others, including intellectual property, privacy, or contractual rights.</li>
                <li>Do not post, transmit, or otherwise make available any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
              </ul>
            </motion.div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>3. Intellectual Property</h2>
            <p className="mb-4">
              All Content on the Website, including but not limited to text, images, technical diagrams, logos, and software, is the exclusive property of GVS Controls or its licensors and is protected by applicable copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, display, perform, or otherwise use any Content without the prior written consent of GVS Controls, except as expressly permitted by these Terms or applicable law.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>4. Services and Contracts</h2>
            <p className="mb-4">
              The information provided on the Website regarding our Services is for general informational purposes only and does not constitute a binding offer. Any engagement for Services shall be subject to a separate written agreement between you and GVS Controls, which will set forth the specific terms and conditions applicable to such engagement.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>5. Privacy and Data Protection</h2>
            <p className="mb-4">
              Your privacy is important to us. Any personal information you provide through the Website will be handled in accordance with our <a href="/privacy-policy" className="underline hover:no-underline">Privacy Policy</a>. By using the Website, you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>6. Limitation of Liability</h2>
            <p className="mb-4">
              The Website and all Content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, GVS Controls disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. In no event shall GVS Controls, its affiliates, or its licensors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Website or any Content, even if advised of the possibility of such damages.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>7. Third-Party Links</h2>
            <p className="mb-4">
              The Website may contain links to third-party websites or resources. These links are provided for your convenience only. GVS Controls does not endorse and is not responsible for the content, products, or services on or available from those websites or resources. Access to any third-party websites is at your own risk.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>8. Termination</h2>
            <p className="mb-4">
              We reserve the right, in our sole discretion, to suspend or terminate your access to the Website at any time and for any reason, including but not limited to violation of these Terms. Upon termination, all rights granted to you under these Terms will immediately cease.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>9. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Tamil Nadu, India, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in Chengalpattu, Tamil Nadu, India.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>10. Changes to These Terms</h2>
            <p className="mb-4">
              We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when posted. Your continued use of the Website following the posting of revised Terms means that you accept and agree to the changes.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>11. Contact Information</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding these Terms or our Services, please contact us at:
            </p>
            <address className="not-italic mb-4">
              <strong>GVS Controls</strong><br />
              No.9/14, First Floor, EWS Plot, Gudalur, Maraimalai Nagar,<br />
              Chengalpattu District, Tamil Nadu, Pin: 603209<br />
              Email: <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a><br />
              Phone: <a href="tel:+919884001597" className="underline hover:no-underline">+91 98840 01597</a>
            </address>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;