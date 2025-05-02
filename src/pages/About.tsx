import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Compare } from '../components/ui/compare';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { Timeline } from '../components/ui/timeline';
import pp1 from "../assets/pp-1.png";
import pp2 from "../assets/pp-2.png";
import pp3 from "../assets/pp-3.png";
import pp4 from "../assets/pp-4.png";
import pp5 from "../assets/pp-5.png";
import pp6 from "../assets/pp-6.png";
import re1 from "../assets/re-1.png";
import re2 from "../assets/re-2.png";
import re3 from "../assets/re-3.png";
import re4 from "../assets/re-4.png";
import re5 from "../assets/re-5.png";
import re6 from "../assets/re-6.png";
import cop1 from "../assets/cop-1.png";
import cop14 from "../assets/cop-14.png";
import cop15 from "../assets/cop-15.png";
import cop16 from "../assets/cop-16.png";
import cop17 from "../assets/cop-17.png";
import cop18 from "../assets/cop-18.png";
// Define the type for team member

// Use free business images from Pexels for Mission & Vision
const missionImageUrl: string = "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg";
const visionImageUrl: string = "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg";

// Array of power plant images in public/assets
const powerPlantImages: string[] = [
pp1,
pp2,
pp3,
pp4,
pp5,
pp6,
];

// Array of renewable energy images in public/assets
const renewableEnergyImages: string[] = [
re1,
re2,
re3,
re4,
re5,
re6,
];

// Array of control panel images in public/assets/gallery
const controlPanelImages: string[] = [
cop1,
cop14,
cop15,
cop16,
cop17,
cop18,

];

// Define the type for timeline data
interface TimelineItem {
title: string;
content: JSX.Element;
}

const About: React.FC = () => {
// State to track the current image index for power plants and renewable energy
const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
// State to track the current image index for control panel images
const [currentControlPanelIndex, setCurrentControlPanelIndex] = useState<number>(0);

// Effect to rotate power plant and renewable energy images every 2 seconds
useEffect(() => {
const interval = setInterval(() => {
setCurrentImageIndex((prevIndex) => (prevIndex + 1) % renewableEnergyImages.length);
}, 2000); // Change every 2 seconds

return () => clearInterval(interval); // Cleanup interval on component unmount
}, []);

// Effect to rotate control panel images every 2 seconds
useEffect(() => {
const interval = setInterval(() => {
setCurrentControlPanelIndex((prevIndex) => (prevIndex + 1) % controlPanelImages.length);
}, 2000); // Change every 2 seconds

return () => clearInterval(interval); // Cleanup interval on component unmount
}, []);

useEffect(() => {
document.title = 'About GVS Controls - Our Journey and Expertise';
const metaDescription = document.querySelector('meta[name="description"]');
if (metaDescription) {
metaDescription.setAttribute(
'content',
'Learn about GVS Controls, established in 2017, offering innovative electrical engineering solutions with 30+ years of industry experience.'
);
}

const handleScroll = () => {
const elements = document.querySelectorAll('.aos-fade-up, .aos-fade-in, .aos-fade-right, .aos-fade-left');
elements.forEach((element) => {
const rect = element.getBoundingClientRect();
const windowHeight = window.innerHeight || document.documentElement.clientHeight;
if (rect.top <= windowHeight * 0.75) {
element.classList.add('aos-animate');
}
});
};

handleScroll();
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

const timelineData: TimelineItem[] = [
{
title: '2017',
content: (
<div>
<h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Founded GVS Controls</h3>
<p className="text-gray-600 mt-2">Established as a proprietary company with a vision for innovative, cost-effective engineering solutions.</p>
<img
src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
alt="Founded GVS Controls"
className="w-full h-40 object-cover rounded-xl shadow-md mt-4"
/>
</div>
),
},
{
title: '2018-2020',
content: (
<div>
<h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Early Projects</h3>
<p className="text-gray-600 mt-2">Collaborated with Shriram EPC Ltd., Black Stone Group, and L&T on power plants and material handling systems.</p>
<img
src={powerPlantImages[currentImageIndex]}
alt={`Power Plant Project ${currentImageIndex + 1}`}
className="w-full h-40 object-cover rounded-xl shadow-md mt-4"
/>
</div>
),
},
{
title: '2021',
content: (
<div>
<h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Expansion</h3>
<p className="text-gray-600 mt-2">Executed projects for SAIL, TISCO, and RINL in renewable energy and steel sectors.</p>
<img
src={renewableEnergyImages[currentImageIndex]}
alt={`Renewable Energy Project ${currentImageIndex + 1}`}
className="w-full h-40 object-cover rounded-xl shadow-md mt-4"
/>
</div>
),
},
{
title: '2022-2023',
content: (
<div>
<h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Automation Leadership</h3>
<p className="text-gray-600 mt-2">Introduced advanced PLC and VFD control systems for process plants.</p>
<div className="w-full h-40 overflow-hidden rounded-xl shadow-md mt-4">
<img
  src={controlPanelImages[currentControlPanelIndex]}
  alt={`Control Panel ${currentControlPanelIndex + 1}`}
  className="w-full h-full object-cover object-center"
/>
</div>
</div>
),
},
{
title: '2024-2025',
content: (
<div>
<h3 className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">Global Reach</h3>
<p className="text-gray-600 mt-2">Partnered with international clients like Titan Cement (Egypt) and Republic Cement (Philippines).</p>
<img
src="https://images.unsplash.com/photo-1727610542348-9636c3b65d2a?q=80&w=3179&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
alt="Global Reach"
className="w-full h-40 object-cover rounded-xl shadow-md mt-4"
/>
</div>
),
},
];

const teamValues = [
{
title: 'Integrity',
desc: 'Upholding ethical standards in all dealings, ensuring trust and reliability with clients like SAIL, TISCO, and NTPC.',
icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
<path d="M12 9v4" />
<path d="M12 17h.01" />
</svg>
),
},
{
title: 'Innovation',
desc: 'Pioneering cutting-edge automation and engineering solutions for complex challenges across power plants, renewable energy, and process industries.',
icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M12 2v5" />
<path d="m19.07 7.93-3.54 3.54" />
<path d="M22 12h-5" />
<path d="m19.07 16.07-3.54-3.54" />
<path d="M12 22v-5" />
<path d="m4.93 16.07 3.54-3.54" />
<path d="M2 12h5" />
<path d="m4.93 7.93 3.54 3.54" />
</svg>
),
},
{
title: 'Reliability',
desc: 'Delivering quality solutions on time with tailored timelines, backed by 30+ years of experience with industry leaders like Shriram EPC and L&T.',
icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5.4L2 8zm0-6l7 5.4L16 8" />
<path d="M20 4H4a2 2 0 0 0-2 2v2l7 5.4L16 8l7-5.4V6a2 2 0 0 0-2-2z" />
</svg>
),
},
{
title: 'Excellence',
desc: 'Striving for top-tier results in every project, leveraging updated technology and quality manufacturing for turnkey solutions.',
icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<circle cx="12" cy="12" r="10" />
<path d="m9 12 2 2 4-4" />
</svg>
),
},
{
title: 'Customer Focus',
desc: 'Listening to your needs and offering flexible, cost-effective services tailored to your business and technical objectives.',
icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
<circle cx="9" cy="7" r="4" />
<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
<path d="M16 3.13a4 4 0 0 1 0 7.75" />
</svg>
),
},
{
title: 'Efficiency',
desc: 'Maximizing resource efficiency to deliver results swiftly, with expertise in utility systems and operations.',
icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<circle cx="12" cy="12" r="10" />
<path d="M12 2v10" />
<path d="M12 12l-4-4" />
<path d="M12 12l4-4" />
</svg>
),
},
];

const cardVariants = {
hidden: { opacity: 0, y: 50 },
visible: (i: number) => ({
opacity: 1,
y: 0,
transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
}),
hover: {
scale: 1.05,
rotateX: 5,
rotateY: 5,
transition: { duration: 0.3 },
},
};

const iconVariants = {
hover: {
scale: 1.2,
rotate: 10,
transition: { duration: 0.4, yoyo: Infinity },
},
};

const missionVisionVariants = {
hidden: { opacity: 0, scale: 0.95 },
visible: {
opacity: 1,
scale: 1,
transition: { duration: 0.6, ease: 'easeOut' },
},
hover: {
scale: 1.03,
boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
transition: { duration: 0.3 },
},
};

return (
<div className="min-h-screen">
{/* Spacer to push content below fixed header */}
<div className="h-[84px] lg:h-[140px]"></div>
<main className="overflow-hidden">
{/* Hero Section */}
<section className="bg-gradient-to-br from-indigo-800 via-teal-600 to-fuchsia-700 text-white py-20 md:py-28 relative">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0,_transparent_60%)] opacity-80"></div>
<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPjxwYXR0ZXJuIGlkPSJhIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxjaXJjbGUgY3g9IjIuNSIgY3k9IjIuNSIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3BhdHRlcm4+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-30"></div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="max-w-3xl mx-auto text-center">
  <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-teal-200 text-sm mb-6 border border-white/30 shadow-md">
    Our Story
  </span>
  <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-300 drop-shadow-md">
    About GVS Controls
  </h1>
  <p className="text-lg text-white/90 leading-relaxed drop-shadow-sm">
    M/s GVS Controls - Started in the year 2017 as a Proprietary Company, The Company was established with Objective of highly Innovative and Cost Effective Engineering Solution and works with Single minded dedication, constantly redefining the term-“Customer Satisfaction”.
  </p>
</div>
</div>
</section>

{/* Main Content */}
<section className="py-16 md:py-20 bg-gradient-to-tr from-teal-100 via-indigo-200 to-purple-200 relative">
<div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[size:20px_20px] opacity-50"></div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
  {/* Enhanced Mission & Vision Cards */}
  <div className="space-y-8 aos-fade-right">
    {/* Mission Card */}
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={missionVisionVariants}
      className="relative rounded-3xl bg-gradient-to-br from-white/90 to-teal-50/50 backdrop-blur-2xl shadow-2xl border border-teal-200/50 p-8 md:p-10 overflow-hidden"
    >
      <GlowingEffect spread={40} glow={true} proximity={64} className="rounded-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.2)_0,_transparent_70%)] opacity-70"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-teal-500/20 text-teal-600 shadow-md">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0.2"/>
              <path d="M10 16.5L14 20.5L22 12.5" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 tracking-tight">
            Our Mission
          </h2>
        </div>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed font-medium">
          M/s GVS Controls - Started in the year 2017 as a Proprietary Company, The Company was established with Objective of highly <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent font-semibold">Innovative</span> and <span className="bg-gradient-to-r from-fuchsia-400 to-teal-400 bg-clip-text text-transparent font-semibold">Cost Effective</span> Engineering Solution and works with Single minded dedication, An inherent problem-solving culture ensures optimal interaction between the Man-machine interface.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The service spectrum of the company is vast, but focused on a single objective, constantly redefining the term-“<span className="font-bold text-teal-600">Customer Satisfaction</span>”. Promoters of this organization have more than <span className="font-bold text-teal-600">30 Years’ Experience</span> in EPC Projects By Working with Various Industries, Which Included M/s Shriram EPC Ltd., M/s Black Stone Group Technologies and L&T.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            { icon: <CheckCircle2 className="text-teal-500 w-5 h-5" />, title: 'Innovation', desc: 'Pioneering cutting-edge solutions.' },
            { icon: <CheckCircle2 className="text-indigo-500 w-5 h-5" />, title: 'Customer Focus', desc: 'Prioritizing your needs.' },
            { icon: <CheckCircle2 className="text-fuchsia-500 w-5 h-5" />, title: 'Excellence', desc: 'Delivering top-tier quality.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              className="flex items-center gap-2 bg-white/80 rounded-lg p-3 shadow-sm border border-teal-100/50"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-fuchsia-500 opacity-80 rounded-b-3xl"></div>
    </motion.div>

    {/* Vision Card */}
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={missionVisionVariants}
      className="relative rounded-3xl bg-gradient-to-br from-white/90 to-indigo-50/50 backdrop-blur-2xl shadow-2xl border border-indigo-200/50 p-8 md:p-10 overflow-hidden"
    >
      <GlowingEffect spread={40} glow={true} proximity={64} className="rounded-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.2)_0,_transparent_70%)] opacity-70"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-600 shadow-md">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="currentColor" fillOpacity="0.2"/>
              <path d="M16 10c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79-4-4-4z" fill="#4f46e5"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-600 tracking-tight">
            Our Vision
          </h2>
        </div>
        <p className="text-lg text-gray-800 mb-4 leading-relaxed font-medium">
          To be a global leader in <span className="bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent font-semibold">innovative automation</span> and <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-semibold">engineering solutions</span>, driving sustainable growth and redefining excellence in customer satisfaction.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We aim to leverage our <span className="font-bold text-indigo-600">30+ years of expertise</span> to pioneer cutting-edge technologies, foster sustainable practices, and deliver unparalleled value to clients across power, steel, and renewable energy sectors worldwide.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            { icon: <CheckCircle2 className="text-indigo-500 w-5 h-5" />, title: 'Global Leadership', desc: 'Leading in automation worldwide.' },
            { icon: <CheckCircle2 className="text-teal-500 w-5 h-5" />, title: 'Sustainability', desc: 'Promoting eco-friendly solutions.' },
            { icon: <CheckCircle2 className="text-fuchsia-500 w-5 h-5" />, title: 'Excellence', desc: 'Setting industry standards.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.4 }}
              className="flex items-center gap-2 bg-white/80 rounded-lg p-3 shadow-sm border border-indigo-100/50"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-teal-500 to-fuchsia-500 opacity-80 rounded-b-3xl"></div>
    </motion.div>
  </div>

  {/* Modern Compare Image Card */}
  <div className="relative aos-fade-left flex justify-center">
    <div className="relative w-full max-w-[500px]">
      <div className="border rounded-3xl bg-white/70 border-neutral-200 shadow-2xl overflow-hidden ring-2 ring-teal-300/20 backdrop-blur-xl">
        <Compare
          firstImage={missionImageUrl}
          secondImage={visionImageUrl}
          firstImageClassName="object-cover w-full h-full"
          secondImageClassname="object-cover w-full h-full"
          className="w-full h-[250px] md:h-[400px] rounded-2xl"
          slideMode="hover"
          initialSliderPercentage={50}
        />
      </div>
      <div className="absolute bottom-0 left-4 translate-y-1/2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg z-50">
        <p className="text-xl font-bold">30+ Years</p>
        <p className="text-sm">Industry Experience</p>
      </div>
    </div>
  </div>
</div>
</div>
</section>

{/* Timeline Section */}
<section className="py-16 md:py-20 bg-gradient-to-br from-teal-200 via-blue-300 to-indigo-400 relative">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.3)_0,_transparent_70%)] opacity-60"></div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-12 aos-fade-up">
  <span className="inline-block px-3 py-1 bg-teal-100/80 text-teal-800 rounded-full text-sm font-medium mb-3 border border-teal-200 shadow-sm">
    Our Journey
  </span>
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-md">Our Milestones</h2>
  <p className="text-gray-700 max-w-2xl mx-auto">
    Explore key milestones in GVS Controls’ growth since 2017.
  </p>
</div>
<Timeline data={timelineData} />
</div>
</section>

{/* Enhanced Team Values Section */}
<section className="py-16 md:py-20 bg-gradient-to-bl from-indigo-100 via-teal-100 to-fuchsia-200 relative">
<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTYwIDMwIHEtMTUgMTUtMzAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-40"></div>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="text-center mb-12 aos-fade-up">
  <span className="inline-block px-3 py-1 bg-indigo-100/80 text-indigo-800 rounded-full text-sm font-medium mb-3 border border-indigo-200 shadow-sm">
    Our Values
  </span>
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 drop-shadow-md">What Drives Us</h2>
  <p className="text-gray-700 max-w-2xl mx-auto">
    Core values guiding our work with clients like SAIL, NTPC, and TISCO, ensuring innovative and reliable solutions.
  </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {teamValues.map((value, i) => (
    <motion.div
      key={i}
      custom={i}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="relative bg-gradient-to-br from-white/80 to-teal-50/50 backdrop-blur-md p-6 rounded-xl shadow-xl border border-teal-200/50 overflow-hidden transform-gpu"
    >
      <GlowingEffect spread={40} glow={true} proximity={64} className="rounded-xl" />
      <div className="relative z-10">
        <motion.div
          variants={iconVariants}
          className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-600 mb-4 shadow-sm"
        >
          {value.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600">
          {value.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </motion.div>
  ))}
</div>
</div>
</section>
</main>
</div>
);
};

export default About;