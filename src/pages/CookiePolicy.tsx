import { motion } from 'framer-motion';
import { FaCookieBite } from 'react-icons/fa';

const CookiePolicy = () => {
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
            <FaCookieBite className="text-white text-5xl" />
          </motion.div>
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-2 text-[#e0f7fa] drop-shadow-lg tracking-tight text-center relative">
            Cookie Policy
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6f61] rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            />
          </h1>
          <p className="text-[#e0f7fa] text-lg font-medium text-center max-w-xl opacity-90">
            Transparency & Trust in Your Experience
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
            <p className="mb-4 text-right text-sm text-[#666]">Last Updated: <strong>April 20, 2025</strong></p>
            <p className="mb-6">
              At <strong>GVS Controls</strong>, we are committed to protecting your privacy and ensuring transparency in how we use cookies and similar technologies on <span className="font-semibold">www.gvscontrols.com</span>. This Cookie Policy is inspired by best practices from leading organizations such as <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google</a>, <a href="https://www.microsoft.com/en-us/trust-center/privacy/cookies" target="_blank" rel="noopener noreferrer">Microsoft</a>, <a href="https://www.apple.com/legal/privacy/en-ww/cookies/" target="_blank" rel="noopener noreferrer">Apple</a>, and <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201890250" target="_blank" rel="noopener noreferrer">Amazon</a> to ensure clarity, compliance, and user empowerment.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device to store data that helps us enhance your experience, analyze site performance, and provide relevant content. They are essential for the smooth operation of our website and services. For more information, you can visit <a href="https://allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">All About Cookies</a>.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-5">
              <li><strong>Essential Cookies:</strong> Enable core site functionality, such as secure logins and navigation. (Reference: <a href="https://policies.google.com/technologies/types" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google Cookie Types</a>)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site, so we can improve our services and content. (Reference: <a href="https://support.google.com/analytics/answer/11397207?hl=en" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google Analytics Help</a>)</li>
              <li><strong>Marketing Cookies:</strong> Allow us to deliver tailored advertisements and measure their effectiveness (only with your consent). (Reference: <a href="https://www.microsoft.com/en-us/trust-center/privacy/cookies" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Microsoft Cookie Policy</a>)</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>3. How We Use Cookies</h2>
            <ul className="list-disc pl-5">
              <li>Ensure the website functions correctly and securely.</li>
              <li>Analyze traffic and usage patterns to enhance user experience.</li>
              <li>Track interactions with PDF documents, such as views and downloads of our company profile, project reports, or technical specifications, to understand user engagement and improve our content delivery.</li>
              <li>Personalize content and marketing communications, where applicable.</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>4. Your Choices</h2>
            <p>
              You can manage or disable cookies through your browser settings at any time. Please note that disabling essential cookies may impact the functionality of our website, including access to downloadable PDFs. For detailed instructions, refer to your browser’s help section or visit <a href="https://www.aboutcookies.org/how-to-manage-and-delete-cookies" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">How to Manage Cookies</a>.
            </p>
            <motion.div
              className="my-6 p-4 bg-[#e9f7f6] border-l-4 border-[#2a9d8f] rounded-lg shadow-sm"
              whileHover={{ scale: 1.01, backgroundColor: '#d4f0ee' }}
              transition={{ duration: 0.3 }}
            >
              <strong>Cookie Preferences:</strong> <br />
              You can update your cookie preferences at any time. <span className="italic">(Feature coming soon)</span>
            </motion.div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>5. Third-Party Cookies</h2>
            <p>
              We may use third-party services (e.g., Google Analytics, Microsoft Clarity) to collect and analyze data about site usage, including interactions with PDFs. These providers have their own privacy and cookie policies, which we encourage you to review:
            </p>
            <ul className="list-disc pl-5">
              <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google Cookies Policy</a></li>
              <li><a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Microsoft Privacy Statement</a></li>
              <li><a href="https://www.apple.com/legal/privacy/en-ww/cookies/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Apple Cookie Policy</a></li>
              <li><a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201890250" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Amazon Cookie Policy</a></li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated effective date. We recommend reviewing this policy regularly to stay informed.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns about our Cookie Policy, including how we use cookies for PDF-related features, please contact us:
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

export default CookiePolicy;