import "tailwindcss/tailwind.css";
import { ThemeProvider } from "../context/ThemeContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Track visit on page load
    fetch("/api/track-visit", { method: "POST" });
  }, []);

  return (
    <>
      {/* <head>
        <title>Kannada Koota ECC</title>
      </head> */}
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
