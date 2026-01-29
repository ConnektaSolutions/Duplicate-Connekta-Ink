// src/components/HomePage.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import homeImg from "../assets/home-img.jpg";

const Bio = () => {
  const { t } = useTranslation();

  return (
    <div className="relative md:w-1/2 w-full xl:w-[70%] flex flex-col md:justify-center justify-start items-center">
      <div
        className="flex flex-col justify-center relative min-[1320px]:pr-20 md:pr-4 sm:pr-20"
        style={{ minHeight: "calc(100vh - 92px)" }}
      >
        {/* Main Text Content */}
        <div className="md:p-10 p-5 pt-0 space-y-6 text-gray-800">
          <p>{t("bio.description1")}</p>

          <p>{t("bio.description2")}</p>

          <p>{t("bio.description3")}</p>

          <p>{t("bio.description4")}</p>
          <p>{t("bio.description5")}</p>
          <p>{t("bio.description6")}</p>
          <p>{t("bio.description7")}</p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
