import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import circlePath from "../../assets/circle-path.png";
import ServiceIcon1 from "../../assets/serviceIcon1.png";
import ServiceIcon2 from "../../assets/serviceIcon2.png";
import ServiceIcon3 from "../../assets/serviceIcon3.png";
import Tilt from "react-parallax-tilt";

const Services = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      path: "/business-development",
      icon: ServiceIcon1,
      label: t("services.businessDevelopment"),
    },
    {
      path: "/strategic-communications",
      icon: ServiceIcon3,
      label: t("services.strategicCommunications"),
    },
    {
      path: "/non-profit-development",
      icon: ServiceIcon2,
      label: t("services.nonProfitDevelopment"),
    },
  ];

  return (
    <section
      className="relative flex flex-col items-center justify-center z-10 lg:pt-0 pt-[30px]"
      style={{ minHeight: "calc(100vh - 92px)" }}
    >
      <div className="relative z-10 w-full md:py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:max-w-[1500px] max-w-[1000px] mx-auto 2xl:gap-[80px] md:gap-[40px] items-center justify-items-center sm:pl-20 sm:pr-32 lg:pr-44">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-maroon flex flex-col md:gap-6 gap-4 md:mb-0 mb-5"
            >
              <div
                className="cursor-pointer md:mb-5 mb-3 relative"
                onClick={() => navigate(service.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background circle, rotates */}
                <img
                  src={circlePath}
                  className="absolute max-w-[160px] sm:max-w-[200px] xl:max-w-[220px] min-[1320px]:max-w-[300px] top-1/2 left-1/2 w-full duration-1000"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${hoveredIndex === index ? 270 : 0}deg)`,
                  }}
                />

                {/* Tilt effect on the icon */}
                <Tilt
                  glareEnable={false}
                  tiltMaxAngleX={25}
                  tiltMaxAngleY={25}
                  scale={1.01}
                  transitionSpeed={250}
                  className="!bg-transparent !shadow-none !w-auto !p-0 !m-0 z-10"
                >
                  <img
                    src={service.icon}
                    className="relative z-10 max-w-[160px] sm:max-w-[200px] xl:max-w-[220px] min-[1320px]:max-w-[300px] w-full mx-auto"
                    alt="Service Icon"
                  />
                </Tilt>
              </div>

              <div className="text-center">
                <p className="text-[18px] md:text-[20px] lg:text-[24px] xl:text-[27px] min-[1320px]:text-[34px] text-black tracking-[3px] uppercase font-bold mb-1">
                  {service.label.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
