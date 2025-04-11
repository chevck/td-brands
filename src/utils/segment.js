import { AnalyticsBrowser } from "@segment/analytics-next";
import { generateUniqueId } from ".";
import { handleAppError } from "./error-handler";

export const analytics = new AnalyticsBrowser();
const brandPage = "mangrove";

export const initializeSegment = async () => {
  try {
    let userId = localStorage.getItem("ajs_user_id");
    analytics.load({ writeKey: process.env.REACT_APP_SEGMENT_WRITE_KEY });

    const ipResponse = await fetch("https://api64.ipify.org?format=json");
    const { ip } = await ipResponse.json();

    const response = await fetch(
      `https://ipinfo.io/${ip}/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`
    );
    const { ...rest } = await response.json();

    if (userId) return; // if there is a user initialized, return ::: this is to prevent multiple initializations
    userId = generateUniqueId();
    localStorage.setItem("ajs_user_id", userId);
    identifyUser(userId, {
      timestamp: new Date().toISOString(),
      device: window.navigator.userAgent,
      ...rest,
      brandPage,
    });
  } catch (error) {
    handleAppError();
  }
};

export const trackEvent = (event, properties) => {
  if (analytics) {
    let userId = JSON.parse(localStorage.getItem("ajs_user_id"));
    let userTraits = JSON.parse(localStorage.getItem("ajs_user_traits"));
    analytics.track(event, { ...properties, userId, ...userTraits, brandPage });
  } else {
    console.error("Segment not initialized");
  }
};

export const identifyUser = (userId, traits) => {
  if (analytics) {
    analytics.identify(userId, traits);
  } else {
    console.error("Segment not initialized");
  }
};

export const trackPageView = (page, properties = {}) => {
  if (analytics && localStorage.getItem("ajs_user_id")) {
    let userId = localStorage.getItem("ajs_user_id");
    let userTraits = JSON.parse(localStorage.getItem("ajs_user_traits"));
    analytics.page(page, { ...properties, userId, ...userTraits, brandPage });
  } else {
    console.error("Segment not initialized");
  }
};

export default analytics;
