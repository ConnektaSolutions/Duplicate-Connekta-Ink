import React, { useState } from "react";
import bioIcon1 from "../assets/bioIcon1.png";
import bioIcon2 from "../assets/bioIcon2.png";
import bioIcon3 from "../assets/bioIcon3.png";
import bioIcon4 from "../assets/bioIcon4.png";
import circlePath from "../assets/circle-path.png";
import phoneIcon from "../assets/phone.png";
import whatsappIcon from "../assets/whatsapp.png";
import emailIcon from "../assets/email.png";
import Tilt from "react-parallax-tilt";
import { Minus, Plus } from "lucide-react";

const Billing = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openKey, setOpenKey] = useState(null);

  const toggleAccordion = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const categories = [
    {
      title: "Branding & Design",
      items: ["Graphic Design", "Cohesive Branding", "Web & Mobile App Design"],
    },
    {
      title: "Technical Development",
      items: [
        "SEO Analysis Report",
        "SEO Marketing Campaign",
        "Technical Maintenance",
        "Technical Project Management",
        "Website & Mobile App Development",
      ],
    },
    {
      title: "Workshop Facilitator",
      items: [
        "Admin Departments",
        "Non-Profit Programs",
        "Probation/ Parole/ Social Services",
      ],
    },
    {
      title: "1 on 1 Consultation",
      items: ["1 Hour Complimentary Consultation"],
    },
  ];

  const paymentIcons = [
    { src: bioIcon1, alt: "Cash App" },
    { src: bioIcon2, alt: "Venmo" },
    { src: bioIcon3, alt: "Zelle" },
    { src: bioIcon4, alt: "Visa" },
  ];

  return (
    <div
      className="flex sm:pr-20 z-10 relative"
      style={{ minHeight: "calc(100vh - 92px)" }}
    >
      {/* Spacer for Left Side Background */}
      <div className="w-[43%] max-[1290px]:w-[42%] flex-none md:block hidden"></div>

      {/* Right Content */}

      <div className="relative md:w-1/2 w-full xl:w-[54%] flex flex-col justify-center items-start py-10 px-6 sm:px-8 lg:px-12">
        {/* <div className="w-full max-w-2xl space-y-6 text-left"> */}
        <div className="w-full space-y-6 text-left">
          {/* Intro Text */}
          <p className="text-[#1a1a1a] text-lg leading-relaxed font-medium">
            To better understand our services and how we can support and enhance
            your operations, please review the areas we specialize in and reach
            out with a brief email to discuss how we can work together.
          </p>

          {/* Accordion Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex flex-col items-start gap-1">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="bg-transparent p-0 border-none shadow-none hover:bg-transparent flex items-center gap-2 font-bold text-xl text-[#8b2e2e] hover:text-[#5e1f1f] transition-colors text-left"
                >
                  {openKey === idx ? (
                    <Minus className="size-5 text-[#8b2e2e]" />
                  ) : (
                    <Plus className="size-5 text-[#8b2e2e]" />
                  )}
                  {cat.title}
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ml-7 ${
                    openKey === idx
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <ul className="list-disc text-[#4a4a4a] pl-4 space-y-1 mt-1 marker:text-[#8b2e2e]">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-base font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-4 space-y-4">
            <p className="text-[#1a1a1a] text-base leading-relaxed">
              We provide an initial 1-hour consultation to discuss your project
              goals and needs; subsequent sessions will be billed at an hourly
              rate.
            </p>

            <div className="flex flex-wrap items-center gap-1 text-[#1a1a1a] text-base font-bold">
              <span>
                Contact our office today for further details on how to move
                forward:
              </span>
              <a
                href="mailto:iam@connekta.net"
                className="underline decoration-[#8b2e2e] decoration-2 underline-offset-4 whitespace-nowrap"
              >
                iam@connekta.net
              </a>
            </div>
          </div>

          {/* Payment Icons */}
          <div className="pt-6">
            <div className="flex justify-center gap-8 sm:gap-12 pb-6">
              {paymentIcons.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Tilt
                    glareEnable={false}
                    tiltMaxAngleX={25}
                    tiltMaxAngleY={25}
                    scale={1.1}
                    transitionSpeed={250}
                    className="!bg-transparent !shadow-none"
                  >
                    <div
                      className="w-[60px] sm:w-[85px] h-[60px] sm:h-[85px]
  rounded-full flex items-center justify-center
  bg-transparent
  relative z-10"
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-[85%] h-[85% object-contain"
                      />
                    </div>
                  </Tilt>

                  <img
                    src={circlePath}
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] sm:w-[150px] transition-transform duration-1000 z-20 pointer-events-none"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${
                        hoveredIndex === index ? 270 : 0
                      }deg)`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#8b2e2e] flex items-center justify-center flex-shrink-0">
                  <img src={phoneIcon} alt="Phone" className="w-3.5" />
                </div>
                <span className="text-[#8b2e2e] font-bold text-sm sm:text-base">
                  305.771.2095
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#8b2e2e] flex items-center justify-center flex-shrink-0">
                  <img src={whatsappIcon} alt="WhatsApp" className="w-3.5" />
                </div>
                <span className="text-[#8b2e2e] font-bold text-sm sm:text-base">
                  619.343.0175
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#8b2e2e] flex items-center justify-center flex-shrink-0">
                  <img src={emailIcon} alt="Email" className="w-3.5" />
                </div>
                <span className="text-[#8b2e2e] font-bold text-sm sm:text-base">
                  iam@connekta.net
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
