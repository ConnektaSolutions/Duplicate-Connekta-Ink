import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loader from "../assets/loader-connecta-loop.gif";

const SplashScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Controls when to display the loading dots ("…") after the logo animation finishes
  const [showLoadingDots, setShowLoadingDots] = useState(false);

  useEffect(() => {
    // Duration (in ms) for the logo animation before showing the loading dots
    const logoAnimationDuration = 3000; // Adjust if your GIF animation length differs

    // Show loading dots once the logo animation is done
    const loadingTimer = setTimeout(() => {
      setShowLoadingDots(true);
    }, logoAnimationDuration);

    // Navigate to the home page 4 seconds after the loading dots appear
    const navigateTimer = setTimeout(() => {
      navigate("/home");
    }, logoAnimationDuration + 4000);

    // Clean up timers on unmount
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen splash-screen-bg">
      {/* Right-side pulsing red background */}
      {/* Center content */}
      <div className="z-10 relative flex flex-col justify-center items-center h-full text-red-700">
        {/* Logo animation */}
        <img
          className="mix-blend-screen xl:max-w-[650px] max-w-[450px] w-full"
          src={loader}
          alt="logo"
        />

        {/* Loading dots shown after the logo animation */}
        {showLoadingDots && (
          <p className="mt-8 text-black animate-pulse lg:text-[25px] text-[16px]">
            {t("loading")}…
          </p>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
