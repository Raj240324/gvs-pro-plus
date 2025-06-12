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
            Understanding How We Use Cookies
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
              This Cookie Policy explains how GVS Controls ("we", "us", or "our") uses cookies and similar technologies on our website, www.gvscontrols.com. This policy should be read in conjunction with our <a href="/privacy-policy" className="underline hover:no-underline">Privacy Policy</a> and <a href="/terms-of-service" className="underline hover:no-underline">Terms of Service</a>.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by enabling us to monitor which pages you find useful and which you do not. Cookies do not give us access to your device or any information about you, other than the data you choose to share with us.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>2. Types of Cookies We Use</h2>
            <div className="space-y-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Analytics Cookies</h3>
                <p>We use these cookies to understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Functionality Cookies</h3>
                <p>These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers whose services we have added to our pages.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2a9d8f]">Marketing Cookies</h3>
                <p>These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.</p>
              </div>
            </div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>3. Third-Party Cookies</h2>
            <p className="mb-4">
              Some cookies are placed by third-party services that appear on our pages. We use trusted third-party services that track this information on our behalf. These third parties may include:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Google Analytics for website usage analysis</li>
              <li>Social media platforms for sharing content</li>
              <li>Advertising networks for targeted advertising</li>
            </ul>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>4. Managing Cookies</h2>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience using our website. To learn more about cookies and how to manage them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">www.aboutcookies.org</a>.
            </p>
            <motion.div
              className="my-6 p-4 bg-[#e9f7f6] border-l-4 border-[#2a9d8f] rounded-lg shadow-sm"
              whileHover={{ scale: 1.01, backgroundColor: '#d4f0ee' }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-4">
                To manage cookies in your browser:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                <li>Safari: Preferences → Privacy → Cookies and website data</li>
                <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
              </ul>
            </motion.div>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>5. Updates to This Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <hr className="my-6 border-[#2a9d8f]/20" />
            <h2>6. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default CookiePolicy;