import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceIcon1 from "../../assets/serviceIcon1.png";
import circlePath from "../../assets/circle-path.png";
import Tilt from "react-parallax-tilt";

const StrategicCommunications = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="text-[#1a1a1a] flex flex-col items-center justify-start lg:py-[10px] py-[10px] max-w-full w-full xl:px-[120px] pl-[40px] sm:pr-[160px] pr-[120px] md:pr-[200px] lg:pr-[240px] relative z-10"
      style={{ minHeight: "calc(100vh - 92px)" }}
    >
      <div className="flex lg:flex-row flex-col justify-center 2xl:max-w-[80%] w-full lg:gap-16 items-center mt-12">
        {/* Left Icon Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex-none">
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={circlePath}
                className="min-[1320px]:max-w-[400px] lg:max-w-[250px] max-w-[150px] absolute top-1/2 left-1/2 w-full duration-1000 z-0"
                style={{
                  transform: `translate(-50%, -50%) rotate(${isHovered ? 270 : 0}deg)`,
                }}
              />
              <Tilt
                glareEnable={false}
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                scale={1.01}
                transitionSpeed={250}
                className="!bg-transparent !shadow-none !w-auto !p-0 !m-0 !z-0"
              >
                <img
                  src={ServiceIcon1}
                  alt="Strategic Communications Icon"
                  className="min-[1320px]:max-w-[400px] lg:max-w-[250px] max-w-[150px] mx-auto mb-8"
                />
              </Tilt>
            </div>
            <h3 className="hidden lg:block min-[1320px]:text-[28px] text-[24px] font-semibold uppercase text-black">
              {t("serviceDetails.businessDevelopment.title")}
            </h3>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="space-y-4 xl:text-base text-[14px]">
          <h2 className="block lg:hidden text-center text-[24px] font-semibold uppercase text-black">
            {t("serviceDetails.businessDevelopment.title")}
          </h2>

          <p>{t("serviceDetails.businessDevelopment.description1")}</p>
          <p>{t("serviceDetails.businessDevelopment.description2")}</p>
          <p>{t("serviceDetails.businessDevelopment.description3")}</p>
          <p>{t("serviceDetails.businessDevelopment.description4")}</p>
          <p>{t("serviceDetails.businessDevelopment.description5")}</p>
          <p>{t("serviceDetails.businessDevelopment.description6")}</p>
        </div>
      </div>
    </section>
  );
};

export default StrategicCommunications;
