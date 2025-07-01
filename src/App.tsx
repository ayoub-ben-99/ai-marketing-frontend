import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";

export default function SooqAI() {
  const [darkMode, setDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  
  return (
    <div
      ref={containerRef}
      className={`overflow-x-hidden relative h-screen ${
        darkMode ? "text-white bg-black" : "bg-white text-black"
      }`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="absolute blur-lg w-full min-md:w-90 h-full min-md:h-90 top-1/2 left-1/2 -translate-1/2 bg-gradient-to-t from-prm to-transparent" />

      <div className="px-4 sm:px-6 lg:px-8 flex flex-col justify-between h-full">
        {/* Header */}
          <Header />

        {/* Main */}
        <main className="text-center flex justify-center flex-col items-center">
          <h2 className="animate-fade w-full max-w-3xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold my-4 leading-tight px-4">
            {t("title")}
          </h2>

          <p className="animate-fade text-lg md:text-xl text-gray-400 mb-6 px-4">
            {t("desc")}
          </p>

          <div className="animate-fade flex justify-center gap-4 flex-wrap mb-12">
            <button className="bg-prm cursor-pointer text-white px-6 py-2 rounded-full">
              {t("cta_main")} <i className="ri-sparkling-fill text-lg"></i>
            </button>
          </div>

          <div className="animate-fade bg-gradient-to-tl to-prm/10 from-dark/60 backdrop-blur-lg p-6 rounded-2xl max-w-3xl w-full shadow-xl">
            <div
              className={`w-full h-full bg-gradient-to-tl rounded-2xl backdrop-blur-lg ${
                darkMode ? "to-dark/10 from-dark" : "to-white/70 from-white/70"
              }`}
            >
              <textarea
                className={`w-full h-32 p-4 rounded-lg resize-none outline-0 border-0`}
                placeholder={t("input_example")}
              ></textarea>

              <div className="w-full p-4 flex justify-between items-center">
                <div className="flex gap-3">
                  <button
                    className={`w-10 h-10 border rounded-full  ${
                      darkMode
                        ? " border-white/20 bg-white/5 text-white"
                        : " border-dark/20 bg-dark/5 text-dark"
                    }`}
                  >
                    <i className="ri-attachment-2"></i>
                  </button>
                  <button
                    className={`w-10 h-10 border rounded-full  ${
                      darkMode
                        ? " border-white/20 bg-white/5 text-white"
                        : " border-dark/20 bg-dark/5 text-dark"
                    }`}
                  >
                    <i className="ri-lightbulb-line"></i>
                  </button>
                </div>
                <button className="w-10 h-10 rounded-full bg-prm text-white">
                  <i className="ri-arrow-up-long-line"></i>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="animate-fade text-center pb-5 text-xs text-gray-400">
          {t("footer")}
        </footer>
      </div>
    </div>
  );
}
