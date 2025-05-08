import { Box } from "../../atoms/Container/Container";
import Grid from "../../atoms/Grid/Grid";
import { GridItem } from "../../atoms/GridItem/GridItem";
import { Stack } from "../../atoms/Stack/Stack";
import CookiePreference from "../../molecules/CookiePreference/CookiePreference";

export default function Preferences() {
  return (
    <Box padding="md">
      <Grid columns={2}>
        <GridItem colStart={1} colEnd={2}>
          <CookiePreference
            cookieId="necessary"
            disabled
            cookiePreferenceText="Essentials"
          />
          <CookiePreference
            cookieId="preferences"
            cookiePreferenceText="Preferences"
          />
        </GridItem>
        <GridItem colStart={2} colEnd={2}>
          <CookiePreference
            cookieId="analytics"
            cookiePreferenceText="Analytics"
          />
          <CookiePreference
            cookieId="marketing"
            cookiePreferenceText="Marketing"
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
