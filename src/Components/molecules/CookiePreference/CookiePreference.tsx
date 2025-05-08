import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";
import { Paragraph } from "../../atoms/Typography/Typography";
import Switch from "../Switch/Switch";
import { useCookieConsent } from "../../../hooks/useCookieConsent";
export default function CookiePreference({
  cookiePreferenceText,
  onProp = true,
  disabled = false,
  cookieId,
}: {
  cookiePreferenceText: string;
  onProp?: boolean;
  disabled?: boolean;
  cookieId: "necessary" | "marketing" | "analytics" | "preferences";
}) {
  const { consent, updateConsent, markConsentReviewed } = useCookieConsent();
  const [isOn, setIsOn] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [localConsent, setLocalConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: "",
  });
  const hasFiredOnce = useRef(false);

  const handleToggle = () => {
    setIsOn((prev) => {
      const newState = !prev;
      updateConsent({ [cookieId]: newState });
      return newState;
    });
    markConsentReviewed();
    if (!hasFiredOnce.current) {
      console.log("Switch changed for the first time");
      hasFiredOnce.current = true;
    }
  };

  return (
    <Box padding="sm" id={cookieId}>
      <Stack direction="row" justify="center" align="center">
        <Paragraph variant="light" size="sm">
          {cookiePreferenceText}
        </Paragraph>
        <Switch
          ref={hasFiredOnce}
          onChange={handleToggle}
          disabled={disabled}
          on={localConsent?.[cookieId]}
        />
      </Stack>
    </Box>
  );
}
