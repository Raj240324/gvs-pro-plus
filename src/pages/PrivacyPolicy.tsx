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
            <ul className="list-disc pl-5 mb-4">
              <li>
                <strong>Personal Information:</strong> Name, email address, phone number, and other details you provide when contacting us, submitting forms, or engaging in project consultancy.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our website or services, such as IP address, browser type, pages visited, and time spent.
              </li>
              <li>
                <strong>Cookies:</strong> Data collected via cookies and similar technologies to enhance your browsing experience (see our <a href="/cookie-policy" className="underline hover:no-underline">Cookie Policy</a> for details).
              </li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>2. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information to:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Respond to inquiries and provide customer support for our engineering and automation services.</li>
              <li>Improve our website, project management, and turnkey solutions.</li>
              <li>Send marketing communications about our services (with your consent).</li>
              <li>Comply with legal obligations in the industries we serve.</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>3. Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share it with:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Service providers who assist with website operations or project execution (e.g., hosting, analytics, automation system integrators).</li>
              <li>Legal authorities when required by law.</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>4. Your Rights</h2>
            <motion.div
              className="my-6 p-4 bg-[#e9f7f6] border-l-4 border-[#2a9d8f] rounded-lg shadow-sm"
              whileHover={{ scale: 1.01, backgroundColor: '#d4f0ee' }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of marketing communications.</li>
                <li>Request data portability.</li>
              </ul>
              <p className="mb-4">
                To exercise these rights, contact us at <a href="mailto:gvscontrols@gmail.com" className="underline hover:no-underline">gvscontrols@gmail.com</a>.
              </p>
            </motion.div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>5. Data Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your data, aligning with the high standards required for our automation and electrical systems. However, no method of transmission over the internet is 100% secure.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>6. International Transfers</h2>
            <p className="mb-4">
              Your data may be transferred to and processed in countries other than your own, especially for projects involving global clients like NTPC or Aditya Birla Group. We ensure appropriate safeguards are in place.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>7. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>8. Contact Us</h2>
            <p className="mb-4">
              For questions about this Privacy Policy or our services, please contact:
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

export default PrivacyPolicy;