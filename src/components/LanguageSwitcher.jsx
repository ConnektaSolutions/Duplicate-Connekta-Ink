import React from "react";
import { useTranslation } from "react-i18next";
import imgUsa from "../assets/language-usa.svg";
import countryImg from "../assets/language-mexico.svg";
import { Link, useLocation } from "react-router-dom";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const bioPath = "/bio";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const renderLink = () => {
    const baseClasses =
      "font-bold underline transition-colors duration-200 text-xs sm:text-sm md:text-base lg:text-lg";

    if (location.pathname === "/non-profit-development") {
      return (
        <a
          // href="https://www.connektasolutions.org/"
          // target="_blank"
          // rel="noopener noreferrer"
          className={`${baseClasses} text-[#8b2e2e] hover:text-[#922E2E] text-center`}
        >
          {/* {t("services.nonProfitPortfolio")} */}
        </a>
      );
    }

    if (location.pathname === "/services") {
      return (
        <Link
          to="/portfolio"
          className={`${baseClasses} text-[#8b2e2e] hover:text-[#922E2E]`}
        >
          {t("services.portfolio")}
        </Link>
      );
    }

    if (location.pathname === "/home") {
      return (
        <Link
          to="/enrollment-application"
          className={`${baseClasses} text-black hover:text-black animate-flash ml-2 mr-2 sm:mr-8 md:mr-16 lg:mr-24 leading-tight text-center`}
        >
          Baja English <br className="block sm:hidden" /> Course
        </Link>
      );
    }

    return null;
  };

  const isBioPage = location.pathname === bioPath;

  // Common flag styles – extracted for DRY
  const flagBaseClasses =
    "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-[#5D0322] cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F232C]";

  const activeRingClasses =
    "ring-2 ring-[#8F232C] ring-offset-2 ring-offset-white";

  return (
    <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
      {renderLink()}

      <img
        src={imgUsa}
        className={`
          ${flagBaseClasses}
          ${i18n.language === "en" ? activeRingClasses : ""}
          ${isBioPage ? "md:ring-white ring-[#8F232C] ring-offset-0 md:ring-offset-2" : ""}
        `}
        alt="English (USA)"
        title="English"
        onClick={() => changeLanguage("en")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            changeLanguage("en");
          }
        }}
      />

      <img
        src={countryImg}
        className={`
          ${flagBaseClasses}
          ${i18n.language === "es" ? activeRingClasses : ""}
          ${isBioPage ? "md:ring-white ring-[#8F232C] ring-offset-0 md:ring-offset-2" : ""}
        `}
        alt="Español (Mexico)"
        title="Español"
        onClick={() => changeLanguage("es")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            changeLanguage("es");
          }
        }}
      />
    </div>
  );
};

export default LanguageSwitcher;
