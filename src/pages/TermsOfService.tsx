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
              <strong>"Services"</strong> refers to consultancy, engineering, manufacturing, automation, and related services offered by GVS Controls.<br />
              <strong>"Intellectual Property"</strong> means all patents, trademarks, service marks, trade names, copyrights, trade secrets, and other intellectual property rights owned or licensed by GVS Controls.
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
                <li>Do not use the Website for any commercial purpose without our express written consent.</li>
                <li>Do not collect or harvest any information or data from the Website or our systems.</li>
              </ul>
            </motion.div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>3. Intellectual Property</h2>
            <p className="mb-4">
              All Content on the Website, including but not limited to text, images, technical diagrams, logos, and software, is the exclusive property of GVS Controls or its licensors and is protected by applicable copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, display, perform, or otherwise use any Content without the prior written consent of GVS Controls, except as expressly permitted by these Terms or applicable law.
            </p>
            <p className="mb-4">
              Any unauthorized use of the Content may violate copyright laws, trademark laws, the laws of privacy and publicity, and communications regulations and statutes. GVS Controls reserves all rights not expressly granted in and to the Website and the Content.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>4. Services and Contracts</h2>
            <p className="mb-4">
              The information provided on the Website regarding our Services is for general informational purposes only and does not constitute a binding offer. Any engagement for Services shall be subject to a separate written agreement between you and GVS Controls, which will set forth the specific terms and conditions applicable to such engagement.
            </p>
            <p className="mb-4">
              We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, including the availability of any feature, database, or content. We may also impose limits on certain features and services or restrict your access to parts or all of the Services without notice or liability.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>5. Privacy and Data Protection</h2>
            <p className="mb-4">
              Your privacy is important to us. Any personal information you provide through the Website will be handled in accordance with our <a href="/privacy-policy" className="underline hover:no-underline">Privacy Policy</a>. By using the Website, you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.
            </p>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>6. Limitation of Liability</h2>
            <p className="mb-4">
              The Website and all Content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, GVS Controls disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p className="mb-4">
              In no event shall GVS Controls, its affiliates, or its licensors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Website or any Content, even if advised of the possibility of such damages.
            </p>
            <p className="mb-4">
              Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitation may not apply to you.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>7. Third-Party Links</h2>
            <p className="mb-4">
              The Website may contain links to third-party websites or resources. These links are provided for your convenience only. GVS Controls does not endorse and is not responsible for the content, products, or services on or available from those websites or resources. Access to any third-party websites is at your own risk.
            </p>
            <p className="mb-4">
              You acknowledge and agree that GVS Controls shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or resources.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>8. Termination</h2>
            <p className="mb-4">
              We reserve the right, in our sole discretion, to suspend or terminate your access to the Website at any time and for any reason, including but not limited to violation of these Terms. Upon termination, all rights granted to you under these Terms will immediately cease.
            </p>
            <p className="mb-4">
              The provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>9. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of Tamil Nadu, India, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in Chengalpattu, Tamil Nadu, India.
            </p>
            <p className="mb-4">
              You agree that any cause of action arising out of or related to the Website must commence within one (1) year after the cause of action accrues. Otherwise, such cause of action is permanently barred.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>10. Changes to These Terms</h2>
            <p className="mb-4">
              We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when posted. Your continued use of the Website following the posting of revised Terms means that you accept and agree to the changes.
            </p>
            <p className="mb-4">
              We encourage you to check this page periodically for any changes. The date of the last modification will be indicated at the top of the page.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>11. Contact Information</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding these Terms or our Services, please contact us at:
            </p>
            <address className="not-italic mb-4">
              <strong>GVS Controls</strong><br />
              Office & Works: Plot No.1476, Sengundram Main Road, Gokulapuram Chengalpattu Dist, Pin-603204<br />
              (Land Mark – Mas Robotics)<br />
              Reg. Office: No.46/1, 5th Cross Street, Bagavathy Nagar, Govindarajapuram, Guduvanchery – 603202, Kanchipuram Dist<br />
              Mobile: <a href="tel:+917338880027" className="underline hover:no-underline">+91 73388 80027</a> & <a href="tel:+919884001597" className="underline hover:no-underline">+91 98840 01597</a><br />
              Email: <a href="mailto:projects@gvscontrols.com" className="underline hover:no-underline">projects@gvscontrols.com</a>, <a href="mailto:services@gvscontrols.com" className="underline hover:no-underline">services@gvscontrols.com</a>, <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a>
            </address>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>12. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless GVS Controls, its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or expenses (including but not limited to attorney's fees) arising from your use of the Website, your violation of these Terms, or your violation of any rights of another.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>13. Force Majeure</h2>
            <p className="mb-4">
              GVS Controls shall not be liable for any failure or delay in performance of its obligations under these Terms due to causes beyond its reasonable control, including but not limited to acts of God, war, strikes, labor disputes, embargoes, government orders, or any other force majeure event.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>14. Severability</h2>
            <p className="mb-4">
              If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, such provision shall be severed and the remaining provisions shall remain in full force and effect.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>15. Entire Agreement</h2>
            <p className="mb-4">
              These Terms constitute the entire agreement between you and GVS Controls regarding your use of the Website and supersede all prior agreements and understandings, whether written or oral, relating to such subject matter.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;