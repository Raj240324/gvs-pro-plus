import { motion } from 'framer-motion';
import { FaCookieBite } from 'react-icons/fa';

const CookiePolicy = () => {
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-24 md:pt-28 lg:pt-44 pb-16 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 sm:mb-10">
          <div className="bg-[#2a9d8f] rounded-full p-4 shadow-lg mb-4 animate-bounce">
            <FaCookieBite className="text-white text-5xl" />
          </div>
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-2 text-[#2a9d8f] drop-shadow-lg tracking-tight text-center">
            Cookie Policy
          </h1>
          <p className="text-[#1e2a44] text-lg font-medium text-center max-w-xl">
            Transparency & Trust in Your Experience
          </p>
        </div>
        {/* Content Card */}
        <div className="w-full max-w-3xl bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 text-[#1e2a44] relative z-10 border border-[#2a9d8f]/20">
          <div className="prose max-w-none text-[#1e2a44] prose-headings:text-[#ff6f61] prose-a:text-[#2a9d8f] prose-a:hover:text-[#ff6f61]">
            <p className="mb-4 text-right text-sm text-[#888]">Last Updated: <strong>April 20, 2025</strong></p>
            <p className="mb-6">
              At <strong>GVS Controls</strong>, we are committed to protecting your privacy and ensuring transparency in how we use cookies and similar technologies on <span className="font-semibold">www.gvscontrols.com</span>. This Cookie Policy is inspired by best practices from leading organizations such as <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google</a>, <a href="https://www.microsoft.com/en-us/trust-center/privacy/cookies" target="_blank" rel="noopener noreferrer">Microsoft</a>, <a href="https://www.apple.com/legal/privacy/en-ww/cookies/" target="_blank" rel="noopener noreferrer">Apple</a>, and <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201890250" target="_blank" rel="noopener noreferrer">Amazon</a> to ensure clarity, compliance, and user empowerment.
            </p>
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device to store data that helps us enhance your experience, analyze site performance, and provide relevant content. They are essential for the smooth operation of our website and services. For more information, you can visit <a href="https://allaboutcookies.org/" target="_blank" rel="noopener noreferrer">All About Cookies</a>.
            </p>
            <h2>2. Types of Cookies We Use</h2>
            <ul>
              <li><strong>Essential Cookies:</strong> Enable core site functionality, such as secure logins and navigation. (Reference: <a href="https://policies.google.com/technologies/types" target="_blank" rel="noopener noreferrer">Google Cookie Types</a>)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site, so we can improve our services and content. (Reference: <a href="https://support.google.com/analytics/answer/11397207?hl=en" target="_blank" rel="noopener noreferrer">Google Analytics Help</a>)</li>
              <li><strong>Marketing Cookies:</strong> Allow us to deliver tailored advertisements and measure their effectiveness (only with your consent). (Reference: <a href="https://www.microsoft.com/en-us/trust-center/privacy/cookies" target="_blank" rel="noopener noreferrer">Microsoft Cookie Policy</a>)</li>
            </ul>
            <h2>3. How We Use Cookies</h2>
            <ul>
              <li>Ensure the website functions correctly and securely.</li>
              <li>Analyze traffic and usage patterns to enhance user experience.</li>
              <li>Personalize content and marketing communications, where applicable.</li>
            </ul>
            <h2>4. Your Choices</h2>
            <p>
              You can manage or disable cookies through your browser settings at any time. Please note that disabling essential cookies may impact the functionality of our website. For detailed instructions, refer to your browser’s help section or visit <a href="https://www.aboutcookies.org/how-to-manage-and-delete-cookies" target="_blank" rel="noopener noreferrer">How to Manage Cookies</a>.
            </p>
            <div className="my-6 p-4 bg-[#e9f7f6] border-l-4 border-[#2a9d8f] rounded shadow-sm">
              <strong>Cookie Preferences:</strong> <br />
              You can update your cookie preferences at any time. <span className="italic">(Feature coming soon)</span>
            </div>
            <h2>5. Third-Party Cookies</h2>
            <p>
              We may use third-party services (e.g., Google Analytics, Microsoft Clarity) to collect and analyze data about site usage. These providers have their own privacy and cookie policies, which we encourage you to review:
            </p>
            <ul>
              <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google Cookies Policy</a></li>
              <li><a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a></li>
              <li><a href="https://www.apple.com/legal/privacy/en-ww/cookies/" target="_blank" rel="noopener noreferrer">Apple Cookie Policy</a></li>
              <li><a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201890250" target="_blank" rel="noopener noreferrer">Amazon Cookie Policy</a></li>
            </ul>
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically. Any changes will be posted on this page with an updated effective date. We recommend reviewing this policy regularly to stay informed.
            </p>
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns about our Cookie Policy, please contact us:
            </p>
            <address className="not-italic mb-4">
              <strong>GVS Controls</strong><br />
              No.9/14, First Floor, EWS Plot, Gudalur, Maraimalai Nagar,<br />
              Chengalpattu District, Tamil Nadu, Pin: 603209<br />
              Email: <a href="mailto:gvscontrols@gmail.com">gvscontrols@gmail.com</a><br />
              Phone: <a href="tel:+919087772798">+91 90877 72798</a>
            </address>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CookiePolicy;