// ErrorContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import Modal from "../Components/Modals/Modal";

type ErrorType = {
  messages: Record<string, string>;
  type: "toast" | "modal";
};

export type ErrorConxtextFunctionT = (
  msgs: Record<string, string>,
  type?: "toast" | "modal",
) => void;

type ErrorContextType = {
  showError: ErrorConxtextFunctionT;
};

const ErrorContext = createContext<ErrorContextType | null>(null);

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useError must be used within ErrorProvider");
  return ctx;
};

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<ErrorType | null>(null);
  const closeModal = () => setError(null);

  const showError = (
    messages: Record<string, string>,
    type: "toast" | "modal" = "toast",
  ) => {
    if (type === "toast") {
      Object.entries(messages).forEach(([key, value]) => {
        toast.error(`${key}, ${value}`);
      });
    }
    if (type === "modal") {
      setError({ messages, type });
    }
  };
  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error?.type === "modal" && (
        <Modal size="lg">
          <button
            className="rounded-md bg-red-500 p-2 text-white transition  duration-300 hover:bg-red-800"
            type="button"
            onClick={closeModal}
          >
            close
          </button>
          <div className="space-y-2">
            {Object.entries(error.messages).map(([key, value]) => (
              <p key={key}>
                <strong className="text-red-600">{key}</strong>: {value}
              </p>
            ))}
          </div>
        </Modal>
      )}
    </ErrorContext.Provider>
  );
};
