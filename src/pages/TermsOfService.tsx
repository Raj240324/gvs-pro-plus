import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-[#1e2a44] to-[#2a9d8f] bg-fixed aos-fade-up"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%), url('https://via.placeholder.com/2000x2000?text=Circuit+Pattern')`,
        backgroundSize: 'cover, 2000px 2000px',
        backgroundPosition: 'center, center',
      }}
      animate={{ backgroundPosition: ['center, 0% 0%', 'center, 100% 100%'] }}
      transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
    >
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-24 md:pt-28 lg:pt-44 pb-16 text-[#1e2a44] bg-white/90 backdrop-blur-md rounded-xl relative z-10"
      >
        <h1 className="font-montserrat font-bold text-4xl mb-8 text-[#2a9d8f]">
          Terms of Service
        </h1>
        <div className="prose max-w-none text-[#1e2a44]">
          <p className="mb-4">
            <strong>Last Updated: April 20, 2025</strong>
          </p>
          <p className="mb-4">
            Welcome to <strong>www.gvscontrols.com</strong> (the "Website"), operated by GVS Controls ("Company", "we", "us", or "our"). These Terms of Service ("Terms") govern your access to and use of the Website and any services, information, or content provided by GVS Controls. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please refrain from using the Website.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            1. Definitions
          </h2>
          <p className="mb-4">
            <strong>"User"</strong> refers to any individual or entity accessing or using the Website.<br />
            <strong>"Content"</strong> means all information, text, images, graphics, logos, documents, and other materials available on the Website.<br />
            <strong>"Services"</strong> refers to consultancy, engineering, manufacturing, automation, and related services offered by GVS Controls.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            2. Use of the Website
          </h2>
          <p className="mb-4">
            You agree to use the Website solely for lawful purposes and in accordance with these Terms. You shall not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Engage in any activity that could damage, disable, overburden, or impair the Website or interfere with any other party's use of the Website.</li>
            <li>Attempt to gain unauthorized access to any portion or feature of the Website, or any systems or networks connected to the Website.</li>
            <li>Transmit or upload any viruses, malware, or other harmful code.</li>
            <li>Use the Website to infringe upon the rights of others, including intellectual property, privacy, or contractual rights.</li>
            <li>Post, transmit, or otherwise make available any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.</li>
          </ul>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            3. Intellectual Property
          </h2>
          <p className="mb-4">
            All Content on the Website, including but not limited to text, images, technical diagrams, logos, and software, is the exclusive property of GVS Controls or its licensors and is protected by applicable copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, display, perform, or otherwise use any Content without the prior written consent of GVS Controls, except as expressly permitted by these Terms or applicable law.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            4. Services and Contracts
          </h2>
          <p className="mb-4">
            The information provided on the Website regarding our Services is for general informational purposes only and does not constitute a binding offer. Any engagement for Services shall be subject to a separate written agreement between you and GVS Controls, which will set forth the specific terms and conditions applicable to such engagement.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            5. Privacy and Data Protection
          </h2>
          <p className="mb-4">
            Your privacy is important to us. Any personal information you provide through the Website will be handled in accordance with our <a href="/privacy-policy" className="text-[#2a9d8f] hover:text-[#ff6f61]">Privacy Policy</a>. By using the Website, you consent to the collection, use, and disclosure of your information as described in the Privacy Policy.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            6. Limitation of Liability
          </h2>
          <p className="mb-4">
            The Website and all Content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by law, GVS Controls disclaims all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. In no event shall GVS Controls, its affiliates, or its licensors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of, or inability to use, the Website or any Content, even if advised of the possibility of such damages.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            7. Third-Party Links
          </h2>
          <p className="mb-4">
            The Website may contain links to third-party websites or resources. These links are provided for your convenience only. GVS Controls does not endorse and is not responsible for the content, products, or services on or available from those websites or resources. Access to any third-party websites is at your own risk.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            8. Termination
          </h2>
          <p className="mb-4">
            We reserve the right, in our sole discretion, to suspend or terminate your access to the Website at any time and for any reason, including but not limited to violation of these Terms. Upon termination, all rights granted to you under these Terms will immediately cease.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            9. Governing Law and Dispute Resolution
          </h2>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of the State of Tamil Nadu, India, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts located in Chengalpattu, Tamil Nadu, India.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            10. Changes to These Terms
          </h2>
          <p className="mb-4">
            We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when posted. Your continued use of the Website following the posting of revised Terms means that you accept and agree to the changes.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            11. Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions, concerns, or requests regarding these Terms or our Services, please contact us at:
          </p>
          <p className="mb-4">
            <strong>GVS Controls</strong><br />
            No.9/14, First Floor, EWS Plot, Gudalur, Maraimalai Nagar,<br />
            Chengalpattu District, Tamil Nadu, Pin: 603209<br />
            Email: <a href="mailto:gvscontrols@gmail.com" className="text-[#2a9d8f] hover:text-[#ff6f61]">gvscontrols@gmail.com</a><br />
            Phone: +91 98840 01597
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;