// src/components/Layout/GlobalLayout.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Wifi,
  User,
  Receipt,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import ConnnektaLogo from "../assets/connekta-logo-without-tagline.png";
import bgPatterbg from "../assets/bg-pattern2.png";
import LanguageSwitcher from "../components/LanguageSwitcher";
import homeImg from "../assets/home-img.jpg"; // Replace with your image path`
import logoWhite from "../assets/logo-white.png"; // Replace with your logo path
import home from "../assets/home.svg";
import users from "../assets/users.svg";
import billing from "../assets/billing.svg";
import user from "../assets/user.svg";
import portfolio from "../assets/pdf-01-stroke-rounded.svg";

const MainLayout = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(location.pathname);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const bioPath = "/bio";

  useEffect(() => {
    setActiveNav(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // 🔴 Add this useEffect to handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Header */}
      {activeNav === "/bio" && (
        <div
          className="fixed top-0 right-0 h-full w-[40%] min-[1320px]:w-1/3 md:block hidden z-[9999]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%)",
          }}
        >
          <img
            src={homeImg}
            alt="People working"
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
          <div className="absolute inset-0 bg-[#69020B] bg-opacity-80 z-10" />

          <header className="absolute top-0 left-0 w-full z-20 h-[92px] flex justify-between items-center lg:px-16 px-5 bg-transparent">
            <div className="fixed lg:right-16 right-5 transform z-30">
              <LanguageSwitcher />
            </div>
          </header>
          <div className="fixed lg:right-16 right-5 xl:top-[92px] top-[92px] transform z-30 mt-2">
            <div className="flex flex-col gap-4">
              {[
                { icon: home, id: "/home" },
                { icon: users, id: "/services" },
                { icon: portfolio, id: "/portfolio" },
                { icon: billing, id: "/billing" },
                { icon: user, id: "/bio" },
              ].map(({ icon: icon, id }) => (
                <Link
                  to={id}
                  key={id}
                  onClick={() => setActiveNav(id)}
                  className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ring-2 ring-[#8F232C] ${
                    activeNav === id
                      ? "bg-[#8F232C] text-white"
                      : "bg-[#2B2A2A] text-white hover:bg-[#2B2A2A] hover:text-white"
                  } ${location.pathname === bioPath ? "border-[2px] border-white" : ""}`}
                >
                  <img
                    src={icon}
                    alt="icon"
                    className="w-5 h-5 filter invert brightness-0"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {(activeNav == "/home" || activeNav == "/billing") && (
        <div
          className="fixed w-1/2 -left-20 z-[9999] min-h-screen md:block hidden"
          style={{
            clipPath: "polygon(0 0, 99% 0, 50% 100%, 0% 100%)",
          }}
        >
          <img
            src={homeImg}
            alt="People working"
            className="w-full h-full object-cover absolute top-0 left-0 z-0"
          />
          <div className="absolute inset-0 bg-[#69020B] bg-opacity-80 z-10" />
          <span className="absolute top-8 lg:left-1/2 left-[53%] -translate-x-1/2 z-20 text-xl text-white">
            <img src={logoWhite} className="max-w-[235px]" />
          </span>
        </div>
      )}
      <header className="fixed top-0 left-0 w-full h-[92px] flex justify-between items-center lg:px-16 px-5 bg-[#eff3ff] z-50">
        <div className="flex items-center">
          {(activeNav != "/home" || isMobile) && (
            <img
              src={ConnnektaLogo}
              className="md:max-w-[235px] max-w-[130px] max-[375px]:max-w-[85px] cursor-pointer"
              onClick={() => navigate("/home")}
            />
          )}
        </div>
        <div className="flex items-center">
          <LanguageSwitcher />
          <Menu as="div" className="relative sm:hidden inline-block ml-2">
            <Menu.Button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 gap-x-1.5 bg-[#2B2A2A] p-0 text-sm font-semibold text-white shadow-xs rounded-full flex justify-center items-center ring-2 ring-[#8F232C]"
            >
              <Settings className="w-5 h-5" />
            </Menu.Button>
            <Transition ref={menuRef} show={menuOpen}>
              <Menu.Items
                static
                as="div"
                className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 outline-none overflow-hidden"
              >
                <div className="flex flex-col gap-4 px-3 py-2">
                  {[
                    { icon: home, id: "/home" },
                    { icon: users, id: "/services" },
                    { icon: portfolio, id: "/portfolio" },
                    { icon: billing, id: "/billing" },
                    { icon: user, id: "/bio" },
                  ].map(({ icon, id }) => (
                    <Link
                      to={id}
                      key={id}
                      onClick={() => {
                        setActiveNav(id);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ring-2 ring-[#8F232C] w-11 h-11 ${
                        activeNav === id
                          ? "bg-[#8F232C] text-white"
                          : "bg-[#2B2A2A] text-white hover:bg-[#2B2A2A] hover:text-white"
                      }`}
                    >
                      <img
                        src={icon}
                        alt="icon"
                        className="w-5 h-5 filter invert brightness-0"
                      />
                    </Link>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      {/* Right Floating Icons */}
      <div className="fixed lg:right-16 right-5 xl:top-[92px] top-[92px] transform z-30 mt-2 sm:block hidden">
        <div className="flex flex-col gap-4">
          {[
            { icon: home, id: "/home" },
            { icon: users, id: "/services" },
            { icon: portfolio, id: "/portfolio" },
            { icon: billing, id: "/billing" },
            { icon: user, id: "/bio" },
          ].map(({ icon: icon, id }) => (
            <Link
              to={id}
              key={id}
              onClick={() => setActiveNav(id)}
              className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ring-2 ring-[#8F232C] ${
                activeNav === id
                  ? "bg-[#8F232C] text-white"
                  : "bg-[#2B2A2A] text-white hover:bg-[#2B2A2A] hover:text-white"
              }`}
            >
              {/* <Icon className="w-5 h-5" /> */}
              <img
                src={icon}
                alt="icon"
                className="w-5 h-5 filter invert brightness-0"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Page Content goes here */}
      <main className="min-h-screen sm:pt-[72px] pt-[92px]">
        <Outlet />
        {activeNav != "/" &&
          activeNav != "/home" &&
          activeNav != "/bio" &&
          activeNav != "/enrollment-application" && (
            <div className="absolute bottom-0 right-0 z-0">
              <img
                src={bgPatterbg}
                alt="Background Pattern"
                className="w-full h-full object-cover"
              />
            </div>
          )}
      </main>
    </div>
  );
};

export default MainLayout;
