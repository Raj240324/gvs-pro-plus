import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>
        <div className="prose max-w-none text-[#1e2a44]">
          <p className="mb-4">
            <strong>Last Updated: April 20, 2025</strong>
          </p>
          <p className="mb-4">
            At GVS Controls, a leading provider of electrical and automation solutions since 2017, we are committed to protecting your privacy. Our services span consultancy, engineering, manufacturing, and automation across industries such as power plants, renewable energy, cement, and automotive sectors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, www.gvscontrols.com, engage with our services, or interact with our turnkey project solutions.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, and other details you provide when contacting us, submitting forms, or engaging in project consultancy.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with our website or services, such as IP address, browser type, pages visited, and time spent.
            </li>
            <li>
              <strong>Cookies:</strong> Data collected via cookies and similar technologies to enhance your browsing experience (see our Cookie Policy for details).
            </li>
          </ul>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use your information to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to inquiries and provide customer support for our engineering and automation services.</li>
            <li>Improve our website, project management, and turnkey solutions.</li>
            <li>Send marketing communications about our services (with your consent).</li>
            <li>Comply with legal obligations in the industries we serve.</li>
          </ul>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            3. Sharing Your Information
          </h2>
          <p className="mb-4">
            We do not sell your personal information. We may share it with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service providers who assist with website operations or project execution (e.g., hosting, analytics, automation system integrators).</li>
            <li>Legal authorities when required by law.</li>
          </ul>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            4. Your Rights
          </h2>
          <p className="mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access, correct, or delete your personal information.</li>
            <li>Opt out of marketing communications.</li>
            <li>Request data portability.</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact us at <a href="mailto:gvscontrols@gmail.com" className="text-[#2a9d8f] hover:text-[#ff6f61]">gvscontrols@gmail.com</a>.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            5. Data Security
          </h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your data, aligning with the high standards required for our automation and electrical systems. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            6. International Transfers
          </h2>
          <p className="mb-4">
            Your data may be transferred to and processed in countries other than your own, especially for projects involving global clients like NTPC or Aditya Birla Group. We ensure appropriate safeguards are in place.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            7. Changes to This Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
          </p>

          <h2 className="font-montserrat font-semibold text-2xl mt-6 mb-4 text-[#ff6f61]">
            8. Contact Us
          </h2>
          <p className="mb-4">
            For questions about this Privacy Policy or our services, please contact:
          </p>
          <p className="mb-4">
            GVS Controls<br />
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

export default PrivacyPolicy;