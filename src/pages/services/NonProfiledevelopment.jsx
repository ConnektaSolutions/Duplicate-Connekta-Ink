import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceIcon2 from "../../assets/serviceIcon2.png";
import circlePath from "../../assets/circle-path.png";
import Tilt from "react-parallax-tilt";

const NonProfitDevelopment = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="text-[#1a1a1a] flex flex-col items-center justify-start lg:py-[10px] py-[10px] max-w-full w-full xl:px-[120px] pl-[40px] sm:pr-[160px] pr-[120px] md:pr-[200px] lg:pr-[240px] relative z-10"
      style={{ minHeight: "calc(100vh - 92px)" }}
    >
      <div className="flex justify-end w-full  2xl:max-w-[80%] mb-10 mt-6">
        {/* <Link
      to="/portfolio" 
      className="text-[#8b2e2e] text-xl hover:text-[#922E2E] font-semibold underline"
    >
      Non-profit 501C3
    </Link> */}
      </div>
      <div className="flex lg:flex-row flex-col justify-center 2xl:max-w-[80%] w-full lg:gap-16 items-center">
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
                className="min-[1320px]:max-w-[400px] lg:max-w-[250px] max-w-[150px] absolute top-1/2 left-1/2 w-full duration-1000"
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
                className="!bg-transparent !shadow-none !w-auto !p-0 !m-0 z-10"
              >
                <img
                  src={ServiceIcon2}
                  alt="Non-Profit Development Icon"
                  className="min-[1320px]:max-w-[400px] lg:max-w-[250px] max-w-[150px] mx-auto mb-8"
                />
              </Tilt>
            </div>
            <h3 className="hidden lg:block text-[23px] min-[1320px]:text-[28px] font-semibold uppercase text-black">
              {t("serviceDetails.nonProfitDevelopment.title")}
            </h3>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="space-y-4 xl:text-base text-[14px]">
          <h2 className="block lg:hidden text-center text-[24px] font-semibold uppercase text-black">
            {t("serviceDetails.nonProfitDevelopment.title")}
          </h2>

          <p>{t("serviceDetails.nonProfitDevelopment.description1")}</p>
          <p>{t("serviceDetails.nonProfitDevelopment.description2")}</p>
          <p>{t("serviceDetails.nonProfitDevelopment.description3")}</p>
          <p>{t("serviceDetails.nonProfitDevelopment.description4")}</p>
          <p>{t("serviceDetails.nonProfitDevelopment.description5")}</p>
          {/* <p>{t("serviceDetails.nonProfitDevelopment.description6")}</p> */}
        </div>
      </div>
    </section>
  );
};

export default NonProfitDevelopment;
