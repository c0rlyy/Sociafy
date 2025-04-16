import { AxiosError } from "axios";
import { ErrorConxtextFunctionT } from "../store/ErrorContext";

export function tryCatchErrorHandler(
  error: unknown,
  showErrorFn: ErrorConxtextFunctionT,
  type: "modal" | "toast" = "toast",
): void {
  if (error instanceof AxiosError) {
    showErrorFn({ error: error.response?.data }, type);
    return;
  }
  if (error instanceof Error) {
    showErrorFn({ error: "sorry for the inconvince error occured" }, type);
    return;
  }
  throw Error("try catch error handler was provided with incorect error");
}
