import { useEffect, useState } from "react";

type CookiesConsentDataT = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: Date | string;
};
type CookiesConsentType = keyof CookiesConsentDataT;
const LS_KEY = "cookie-consent";
const defaultConsent: CookiesConsentDataT = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  timestamp: "",
};
export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookiesConsentDataT | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      setConsent(JSON.parse(saved));
    }
  }, []);
  const handleCookieSwitch = (
    consentType: CookiesConsentType,
    value: boolean,
  ) => {
    const newSetting = {
      [consentType]: value,
    };
    setCookiesData((prev) => ({ ...prev, ...newSetting }));
  };
  const updateConsent = (updates: Partial<CookiesConsentDataT>) => {
    const newConsent = {
      ...defaultConsent,
      ...consent,
      ...updates,
      timestamp: new Date().toISOString(),
    };
    setConsent(newConsent);
    localStorage.setItem(LS_KEY, JSON.stringify(newConsent));
  };
  const acceptAll = () => {
    updateConsent({
      necessary: true,
      marketing: true,
      analytics: true,
      preferences: true,
    });
  };
  const declineAll = () => {
    updateConsent({
      necessary: false,
      marketing: false,
      analytics: false,
      preferences: false,
    });
  };
  const markConsentReviewed = () => {
    localStorage.setItem("cookieConsentReviewed", "true");
  };
  const isReviewed = () => {
    const reviewed = localStorage.getItem("cookieConsentReviewed") === "true";
    if (reviewed) return true;
  };
  const hasConsented = Boolean(consent) || isReviewed();
  const hasReviewed = localStorage.getItem("cookieConsentReviewed") === "true";

  return {
    handleCookieSwitch,
    acceptAll,
    declineAll,
    updateConsent,
    markConsentReviewed,
    isReviewed,
    hasReviewed,
    hasConsented,
    consent,
  };
};
