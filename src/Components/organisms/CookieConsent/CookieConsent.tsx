import { useEffect, useState } from "react";
import Button from "../../atoms/Button/Button";
import { Box } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";
import { Heading, Paragraph } from "../../atoms/Typography/Typography";
import ButtonGroup from "../../molecules/ButtonGroup/ButtonGroup";
import { Popup } from "../../molecules/Popup/Popup";
import Switch from "../../molecules/Switch/Switch";

export default function CookieConsent() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const existingAgreement = localStorage.getItem("cookie-consent");
    if (!existingAgreement) {
      setShowCookieConsent(true);
    }
  }, [setShowCookieConsent]);
  const handleConsentAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowCookieConsent(false);
  };
  const handleConsentDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowCookieConsent(false);
  };
  if (!showCookieConsent) return null;
  return (
    <Popup id="cookie-consent" position="center" size="lg">
      <Box padding="sm">
        <Stack direction="col" justify="center" align="center" gap="md">
          <Heading level={3}>Cookie Consent</Heading>
          <Box className="h-48">
            <Box className="h-full overflow-y-scroll">
              <Paragraph>
                We use cookies to make Sociafy work properly and securely.
                Essential cookies are used for core functionality like user
                login and session management.
              </Paragraph>
              <Paragraph>
                With your consent, we’d also like to use cookies for:
              </Paragraph>
              <ul>
                <li>Improving your experience through analytics</li>
                <li>Understanding how Sociafy is used</li>
                <li>Remembering your preferences</li>
              </ul>
              <Paragraph>
                By clicking “Accept All,” you agree to the use of all cookies.
                You can also manage your cookie preferences or read our Privacy
                Policy for more details.
              </Paragraph>
            </Box>
          </Box>
          <ButtonGroup>
            <Button
              onClick={handleConsentAccept}
              size="md"
              variant="primary"
              type="button"
            >
              Accept all
            </Button>
            <Button size="md" variant="outline">
              Preferences
            </Button>
            <Button
              onClick={handleConsentDecline}
              size="md"
              variant="secondary"
              type="button"
            >
              Decline
            </Button>
          </ButtonGroup>
        </Stack>
        <Switch />
      </Box>
    </Popup>
  );
}
