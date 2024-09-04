import "tailwindcss/tailwind.css";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Track visit on page load
    fetch("/api/track-visit", { method: "POST" });

    // Prevent mobile access
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw !important";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(255, 255, 255, 1)";
      overlay.style.color = "black";
      overlay.style.display = "flex";
      overlay.style.justifyContent = "center";
      overlay.style.alignItems = "center";
      overlay.style.zIndex = "9999";
      overlay.style.textAlign = "center";
      overlay.style.fontSize = "2.2rem";
      overlay.style.padding = "20px";
      overlay.style.pointerEvents = "none";

      overlay.innerHTML = `
        <div>
          <h1>Sorry, this website is not accessible on mobile devices.</h1>
          <p>Please visit us on a desktop or laptop.</p>
        </div>
      `;

      document.body.appendChild(overlay);

      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    }
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
