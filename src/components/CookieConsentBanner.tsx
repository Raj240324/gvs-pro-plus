import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Essential Only"
      enableDeclineButton
      cookieName="gvs-cookie-consent"
      style={{
        background: "rgba(15, 23, 42, 0.95)", // Slate-900 with opacity
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        alignItems: "center",
        zIndex: 9999,
      }}
      buttonStyle={{
        background: "linear-gradient(to right, #2a9d8f, #4ecdc4)", // Teal gradient
        color: "white",
        fontSize: "14px",
        fontWeight: "600",
        borderRadius: "9999px",
        padding: "10px 24px",
        margin: "0 10px 10px 0",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      declineButtonStyle={{
        background: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        color: "#e2e8f0",
        fontSize: "14px",
        borderRadius: "9999px",
        padding: "10px 20px",
        margin: "0 10px 10px 0",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      expires={150}
      onAccept={() => {
        // Cookies accepted — GA already loaded via App.tsx
      }}
    >
      <div className="text-sm md:text-base text-gray-200 pr-4">
        <span className="font-bold text-teal-400">We value your privacy.</span>
        <br className="sm:hidden" /> We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept All", you consent to our use of cookies.{" "}
        <Link 
          to="/privacy-policy" 
          className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
        >
          Read Policy
        </Link>
      </div>
    </CookieConsent>
  );
};

export default CookieConsentBanner;
