import { forwardRef } from "react";
import { Checkbox } from "../atoms/Checkbox/Checkbox";
import { Box } from "../atoms/Container/Container";
import { Paragraph } from "../atoms/Typography/Typography";

export const PolicyTerms = forwardRef((ref) => {
  return (
    <>
      <Checkbox id="terms" {...register("terms")} />
      <Box>
        <Paragraph size="sm">
          I agree to the{" "}
          <a
            className="text-blue-700"
            href="/terms"
            rel="noreferer"
            target="_blank"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="text-blue-700" href="/privacy" target="_blank">
            Privacy Policy
          </a>
          .
        </Paragraph>
      </Box>

      {errors.terms && (
        <span className={registerModule.registerError}>
          {errors.terms.message}
        </span>
      )}
    </>
  );
}, ref);
