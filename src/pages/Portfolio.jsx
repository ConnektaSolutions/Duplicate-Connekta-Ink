import { MoveLeft, MoveRight } from "lucide-react";
import React, { useState, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import pageOne from "../assets/portfolio_Image/portfolio-1.png";
import pageTwo from "../assets/portfolio_Image/portfolio-2.png";
import pageThree from "../assets/portfolio_Image/portfolio-3.png";
import pageFour from "../assets/portfolio_Image/portfolio-4.png";
import pageFive from "../assets/portfolio_Image/portfolio-5.png";
import pageSix from "../assets/portfolio_Image/portfolio-6.png";
import pageSeven from "../assets/portfolio_Image/portfolio-7.png";
import pageEight from "../assets/portfolio_Image/portfolio-8.png";
import pageNine from "../assets/portfolio_Image/portfolio-9.png";
import pageTen from "../assets/portfolio_Image/portfolio-10.png";
import pageEleven from "../assets/portfolio_Image/portfolio-11.png";
import pageTwelve from "../assets/portfolio_Image/portfolio-12.png";
import { useTranslation } from "react-i18next";

// const isMobile = useIsMobile();

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return windowSize;
};

const Page = forwardRef(({ children, isImage }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        h-full w-full overflow-visible
        ${
          isImage
            ? "bg-transparent border-none shadow-none"
            : "bg-white border-r border-[#8F232C]/20 shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.1)]"
        }
      `}
    >
      <div className={`${isImage ? "p-0" : "p-1 md:p-2"} h-full w-full`}>
        {children}
      </div>
    </div>
  );
});

const Portfolio = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const isMobile = windowWidth < 550;
  const [current, setCurrent] = useState(1);
  const book = useRef();
  const total = 14;
  const { t } = useTranslation();

  const getBookDimensions = () => {
    if (isMobile) {
      let width = windowWidth - 50; // Safety buffer
      if (width > 380) width = 380; // Max width cap
      let height = Math.floor(width * 1.5); // Aspect ratio preserve
      return { width, height };
    }

    let containerW;
    if (windowWidth >= 1024) {
      containerW = windowWidth - 500;
    } else if (windowWidth >= 768) {
      containerW = windowWidth - 200;
    } else {
      // sm ranges or fallback
      containerW = windowWidth - 80;
    }

    const availableW = containerW - 40;

    let pageW = Math.floor(availableW / 2);

    let finalW = Math.min(pageW, 500);

    let finalH = Math.floor(finalW * (710 / 500));

    const maxH = windowHeight - 200;

    if (finalH > maxH) {
      finalH = maxH;

      finalW = Math.floor(finalH * (500 / 710));
    }

    return { width: finalW, height: finalH };
  };

  const { width: bookWidth, height: bookHeight } = getBookDimensions();
  const contentScale = bookWidth / 500;

  const onFlip = (e) => {
    const index = e.data;

    if (isMobile) {
      // Mobile = true single page
      setCurrent(index + 1);
    } else {
      // Desktop = 2-page spread
      setCurrent(index % 2 === 0 ? index + 1 : index);
    }
  };

  const moveBackward = () => {
    if (!book.current) return;
    if (current <= 1) return;
    book.current.pageFlip().flipPrev();
  };

  const moveForward = () => {
    if (!book.current) return;
    book.current.pageFlip().flipNext();
  };

  const imagePages = [
    { left: pageOne, right: pageTwo, title: "Branding & Marketing" },
    { left: pageThree, right: pageFour, title: "Software Development" },
    { left: pageFive, right: pageSix, title: "Branding & Marketing" },
    { left: pageSeven, right: pageEight, title: "Branding & Marketing" },
    { left: pageNine, right: pageTen, title: "Software Development" },
    { left: pageEleven, right: pageTwelve, title: "Branding & Marketing" },
  ];

  return (
    <div className="flex justify-start flex-col items-center z-20 px-2 sm:px-4 h-[calc(100vh-92px)] overflow-y-auto md:overflow-hidden pt-2 sm:pt-6">
      <div
        style={{
          width: isMobile ? "100%" : `${bookWidth * 2 + 80}px`, // 80px for padding
          minHeight: `${bookHeight + 60}px`, // 60px for vertical padding/controls
        }}
        className="h-auto relative border-2 sm:border-4 border-[#8F232C] md:ml-[-70px] sm:ml-[-60px] p-4 sm:py-6 md:px-0 2xl:p-10 font-sans z-20 flex flex-col items-center justify-center transition-all duration-300 ease-in-out"
      >
        {/* Decorative corner borders - hidden on mobile */}
        {/* <div className="hidden md:block absolute top-[-4px] bottom-[-4px] left-[-16px] w-6 border-t-4 border-l-4 border-b-4 border-[#8F232C]"></div>
        <div className="hidden md:block absolute top-2 bottom-2 left-[-28px] w-7 border-t-4 border-l-4 border-b-4 border-[#8F232C]"></div>
        <div className="hidden md:block absolute top-5 bottom-5 left-[-40px] w-10 border-t-4 border-l-4 border-b-4 border-[#8F232C]"></div>

        <div className="hidden md:block absolute top-[-4px] bottom-[-4px] right-[-16px] w-4 border-t-4 border-r-4 border-b-4 border-[#8F232C]"></div>
        <div className="hidden md:block absolute top-2 bottom-2 right-[-28px] w-7 border-t-4 border-r-4 border-b-4 border-[#8F232C]"></div>
        <div className="hidden md:block absolute top-5 bottom-5 right-[-40px] w-10 border-t-4 border-r-4 border-b-4 border-[#8F232C]"></div>

        <div className="hidden md:block absolute top-5 bottom-[-4px] left-0 w-[44%] border-b-4 border-[#8F232C]"></div>
        <div className="hidden md:block absolute top-5 bottom-[-4px] right-0 w-[44%] border-b-4 border-[#8F232C]"></div> */}

        <div className="mt-5 md:mt-0 w-full relative z-30">
          {/* Page Numbers */}
          <div className="absolute top-4 sm:top-6 right-2 sm:right-6 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold bg-transparent z-50">
            {current < total && (
              <span>
                {t("portfolio.page")} {current + 1}
              </span>
            )}
            {current < total && current + 1 !== total && (
              <MoveRight
                color="#8F232C"
                strokeWidth={2}
                size={24}
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={moveForward}
              />
            )}
          </div>

          {/* Left - Current Page + Back Button */}
          <div className="absolute top-4 sm:top-6 left-2 sm:left-6 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold bg-transparent z-50">
            {current > 1 && (
              <MoveLeft
                color="#8F232C"
                strokeWidth={2}
                size={24}
                className="cursor-pointer hover:scale-110 transition-transform"
                onClick={moveBackward}
              />
            )}
            <span>
              {" "}
              {t("portfolio.page")} {current}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex-1 flex items-center justify-center mt-2 md:mt-4 overflow-visible relative">
          {/* <div className="h-full w-full flex items-center justify-center"> */}
          <HTMLFlipBook
            width={bookWidth}
            height={bookHeight}
            size="fixed"
            // minWidth={280}
            // maxWidth={900} // ← allow bigger on large screens
            // minHeight={420}
            // maxHeight={1000}
            maxShadowOpacity={0.3}
            showCover={false}
            usePortrait={isMobile}
            mobileScrollSupport={true}
            disableFlipByClick={false}
            useMouseEvents={!isMobile}
            ref={book}
            onFlip={onFlip}
            className="h-full"
          >
            {/* Page 1: Branding & Marketing */}
            <Page number="1">
              <div
                style={{
                  width: `${100 / contentScale}%`,
                  height: `${100 / contentScale}%`,
                  transform: `scale(${contentScale})`,
                  transformOrigin: "top left",
                }}
              >
                <div
                  className="flex flex-col justify-center gap-4 2xl:gap-4 text-center items-center p-2 md:p-0 md:pt-3 2xl:p-4 min-h-full
"
                >
                  <div>
                    <h2 className="text-[#8F232C] text-2xl font-semibold">
                      Branding & Marketing
                    </h2>
                    <div className="w-[65%] mx-auto h-1 bg-[#8F232C] mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm text-black font-medium w-full px-2">
                      We offer comprehensive design services tailored to your
                      needs, leveraging industry-leading platforms such as
                      Figma, Photoshop, Illustrator, and InDesign. Our expertise
                      spans from creating intuitive UI/UX designs in Figma,
                      complete with interactive prototypes and responsive
                      layouts, to crafting pixel-perfect visual compositions and
                      photo edits in Photoshop.
                    </p>
                    <p className="text-sm text-black font-medium w-full px-2 mt-2">
                      With Illustrator, we deliver scalable vector graphics
                      ideal for high-definition creations and logos. We use
                      InDesign to create professional layouts for print and
                      digital publications, from multi-page magazines to sleek
                      brochures and interactive ebooks.
                    </p>
                    <p className="text-sm text-black font-medium mb-6 w-full px-2 mt-2">
                      By combining technical proficiency with flair, we provide
                      versatile solutions that bring your vision to life,
                      whether it’s for digital platforms, print media, or
                      branding.
                    </p>
                  </div>
                  {/* Icons */}
                  <div className="grid grid-cols-4 w-full px-2 md:px-3 gap-y-4 font-semibold mb-4">
                    {["PHOTOSHOP", "ILLUSTRATOR", "IN-DESIGN", "FIGMA"].map(
                      (label) => (
                        <div
                          key={label}
                          className="flex flex-col items-center mx-auto"
                        >
                          <div className="w-12 h-12 border-[4px] border-[#8F232C] rounded-full flex items-center justify-center text-[#8F232C] font-bold text-sm">
                            {label.substring(0, 2)}
                          </div>
                          <span className="text-xs mt-2 text-center">
                            {label}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Page>

            {/* Page 2: Software Development */}
            <Page number="2">
              <div
                style={{
                  width: `${100 / contentScale}%`,
                  height: `${100 / contentScale}%`,
                  transform: `scale(${contentScale})`,
                  transformOrigin: "top left",
                }}
              >
                <div
                  className="flex flex-col justify-center gap-4 2xl:gap-4 text-center items-center p-2 md:p-0 md:pt-3 2xl:p-4 min-h-full
"
                >
                  <div>
                    <h2 className="text-[#8F232C] text-2xl font-semibold">
                      Software Development
                    </h2>
                    <div className="w-[65%] mx-auto h-1 bg-[#8F232C] mt-1"></div>
                  </div>
                  <div>
                    <p className="text-sm text-black font-medium w-full px-2">
                      Our full-stack development services encompass both
                      front-end and back-end solutions, enabling the creation of
                      seamless, high-performance applications for mobile and
                      web.
                    </p>
                    <p className="text-sm text-black font-medium w-full px-2 mt-2">
                      On the front-end, we craft visually stunning and
                      interactive user interfaces using cutting-edge tools like
                      HTML, CSS, JavaScript, React, Angular, and Vue.js. For
                      mobile applications, we deliver cross-platform solutions
                      with Flutter and React Native or build native apps using
                      Swift and Kotlin.
                    </p>
                    <p className="text-sm text-black font-medium w-full px-2 mt-2">
                      On the back-end, we ensure robust server-side
                      functionality, secure database management, and API
                      development using Python, Java, Node.js, and Ruby with
                      powerful frameworks like Django, Spring Boot, and
                      Express.js. Whether it’s a responsive website or a
                      scalable mobile app, our expertise ensures your project is
                      efficient, user-friendly, and built to meet your needs.
                    </p>
                  </div>
                  {/* Icons */}
                  <div className="grid grid-cols-4 w-full px-2 md:px-3 gap-y-2 2xl:gap-y-4 font-semibold mb-2">
                    {[
                      "PHP",
                      "CODEIGNITER",
                      "HTML",
                      "HTML5",
                      "JAVA SCRIPT",
                      "JAVA",
                      "J QUERY",
                      "MONGODB",
                      "DJANGO",
                      "PYTHON",
                      "ANGULAR",
                      "REACT NATIVE",
                    ].map((label) => (
                      <div
                        key={label}
                        className="flex flex-col items-center w-[80px] mx-auto"
                      >
                        <div className="w-12 h-12 border-[4px] border-[#8F232C] rounded-full flex items-center justify-center text-[#8F232C] font-bold text-sm">
                          {label.split(" ")[0].substring(0, 2)}
                        </div>
                        <span className="text-xs mt-2 text-center">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Page>

            {/* Dynamic Image Pages */}

            {imagePages.map((pages, index) => [
              <Page key={`left-${index}`} isImage>
                <div className="flex justify-center items-center h-full w-full bg-white">
                  <img
                    src={pages.left}
                    className="w-full h-full object-contain" // ← changed
                    alt={`Portfolio Page ${index * 2 + 3}`}
                  />
                </div>
              </Page>,

              <Page key={`right-${index}`} isImage>
                <div className="flex justify-center items-center h-full w-full bg-white">
                  <img
                    src={pages.right}
                    className="w-full h-full object-contain" // ← changed
                    alt={`Portfolio Page ${index * 2 + 4}`}
                  />
                </div>
              </Page>,
            ])}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
