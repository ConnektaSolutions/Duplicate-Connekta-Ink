// src/components/HomePage.tsx
import React from "react";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex sm:pr-20 z-10" style={{ minHeight: 'calc(100vh - 92px)' }}>
        <div className="w-[43%] max-[1290px]:w-[42%] flex-none md:block hidden"></div>
        {/* Right Content */}
        <div className="relative md:w-1/2 w-full xl:w-[54%] flex flex-col md:justify-center justify-start items-center">
          {/* Top Header */}

          {/* Main Text Content */}
          <div className="p-5 xl:p-10 !pl-5 mt-0 space-y-4 xl:space-y-6 text-gray-800 z-9">
            <h1 className="text-[30px] xl:text-[45px] font-bold">
              <span className="text-red-900"> {t('home.title').split(' ')[0]} </span>
              <span className="font-bold">{t('home.subtitle')}</span>-
              <span className="italic font-medium">{t('home.border')}</span> <br />
              <span className="text-red-900">{t('home.consulting')}</span>
            </h1>

            <p>{t('home.description1')}</p>

            <p>{t('home.description2')}</p>

            <p>{t('home.description3')}</p>

            <p>{t('home.description4')}</p>

            <p>{t('home.description5')}</p>

            <p className="font-bold italic text-gray-700">
              "{t('home.tagline')}"
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
