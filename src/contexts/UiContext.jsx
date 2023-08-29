import React, { createContext, useContext, useState, useEffect } from "react";

const UiContext = createContext(undefined);

const DEFAULT_UI_STATE = {
  latestConversationOpenedId: 'offer',
  onboardingRegistration: false,  // went trough the registration onboarding process
  onboardingListings: false,
  onboardingMessages: false,
}

export const UiContextProvider = ({ children }) => {
  const [uiState, setUiState] = useState(() => {
    const storedState = (typeof window !== "undefined") ? localStorage.getItem("uiState") : undefined;
    return storedState ? JSON.parse(storedState) : DEFAULT_UI_STATE;
  });

  const changeUi = (key, value) => {
    const updatedState = { ...uiState, [key]: value };
    setUiState(updatedState);
    if (typeof window !== "undefined") {
      localStorage.setItem("uiState", JSON.stringify(updatedState));
    }
  };

  return (
    <UiContext.Provider
      value={{
        uiState,
        changeUi
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUi must be used within a UiProvider.");
  }
  return context;
};
