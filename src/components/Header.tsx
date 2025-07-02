import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import gsap from "gsap";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../lib/i18n";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const navItems = t("nav_bar", { returnObjects: true }) as string[];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".animate-fade"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, [i18n.language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  // Animate menu when opened
  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (settingsOpen) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        onComplete: () => setSettingsOpen(false),
      });
    } else {
      setSettingsOpen(true);
    }
  };

  useEffect(() => {
    if (settingsOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [settingsOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="flex z-30 py-5 px-4 justify-between items-center relative">
      <h1 className="text-2xl font-bold text-black dark:text-white">سوقي</h1>

      {/* زر القائمة في الهاتف */}
      <button
        className="sm:hidden text-2xl text-black dark:text-white z-40"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i className="ri-menu-line"></i>
      </button>

      {/* القائمة - سطح المكتب */}
      <ul className="hidden sm:flex gap-6 text-sm sm:text-base items-center">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer active:scale-95 transition duration-300 dark:text-gray-100/70 dark:hover:text-white text-black/70 hover:text-black`}
          >
            {t(item)}
          </li>
        ))}
      </ul>

      {/* إعدادات اللغة والوضع */}
      <div
        className="hidden sm:flex gap-2 items-center relative"
        ref={containerRef}
      >
        {/* زر الإعدادات */}
        <button
          type="button"
          onClick={toggleMenu}
          className="bg-white/6 hover:bg-white/10 flex flex-row justify-center items-center py-0.5 px-2.5 rounded-full"
        >
          <i className="ri-settings-line text-xl"></i>
          <i className="ri-arrow-down-s-line ml-1"></i>
        </button>

        {/* القائمة المنسدلة */}
        {settingsOpen && (
          <div
            ref={menuRef}
            className="absolute top-full mt-2 -right-20 bg-white dark:bg-white/5 rounded-xl shadow-lg p-1 flex flex-row z-50 justify-center items-center"
          >
            {/* تغيير اللغة */}
            <Button
              variant="ghost"
              className="dark:hover:text-white hover:text-black dark:text-gray-100/70"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
              }
            >
              <i className="ri-earth-line mr-1"></i>
              {i18n.language === "ar" ? "EN" : "AR"}
            </Button>
            <hr />
            {/* تبديل الوضع */}
            <Button
              variant="ghost"
              className="dark:hover:text-white hover:text-black dark:text-gray-100/70"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* القائمة - في وضع الهاتف */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-dark backdrop-blur-lg z-30 flex flex-col items-center justify-center gap-6 text-xl transition-all duration-500`}
        >
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer list-none active:scale-95 transition duration-300 dark:text-gray-100 dark:hover:text-white text-black hover:text-gray-900`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t(item)}
            </li>
          ))}

          {/* إعدادات اللغة والوضع داخل القائمة */}
          <div className="flex gap-4 items-center pt-8">
            <Button
              variant="ghost"
              onClick={() =>
                i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
              }
            >
              {i18n.language === "ar" ? "EN" : "AR"}
            </Button>
            <Button
              className={"dark:hover:bg-white hover:bg-black"}
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="" /> : <Moon />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
