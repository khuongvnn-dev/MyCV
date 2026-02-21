import { UserAnalytics } from "@/types/User";
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export const useUserAnalytics = () => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const parser = new UAParser();
      const result = parser.getResult();

      const userLanguage =
        navigator.language || (navigator as any).userLanguage;

      let country = "Unknown";
      try {
        const response = await fetch("https://ipwho.is/");
        if (response.ok) {
          const geo = await response.json();
          console.debug("IP Data:", geo);
          country = geo.country || "Unknown";
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin địa lý:", error);
      }

      const data: UserAnalytics = {
        language: userLanguage,
        country: country,
        deviceType: result.device.type || "desktop",
        os: result.os.name || "Unknown",
        browser: result.browser.name || "Unknown",
      };

      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  return analytics;
};
