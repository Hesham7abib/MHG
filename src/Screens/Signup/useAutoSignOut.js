import { useEffect, useRef } from "react";
import { AppState } from 'react-native';

const useAutoSignOut = (signOutFunction, autoSignOutTime) => {
  const appState = useRef(AppState.currentState);
  const appStateChangeListener = useRef(null);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        appState.current = nextAppState;
        // App has gone to the background, start the timer for auto sign-out
        appStateChangeListener.current = setTimeout(() => {
          signOutFunction();
        }, autoSignOutTime);
      } else if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        appState.current = nextAppState;
        // App has come back to the foreground, clear the auto sign-out timer
        if (appStateChangeListener.current) {
          clearTimeout(appStateChangeListener.current);
        }
      }
    };

    // Add the AppState change listener
    appStateChangeListener.current = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Clear the auto sign-out timer when the component unmounts
    return () => {
      if (appStateChangeListener.current) {
        clearTimeout(appStateChangeListener.current);
      }
      // Remove the AppState change listener
      appStateChangeListener.current && appStateChangeListener.current.remove();
    };
  }, [autoSignOutTime, signOutFunction]);
};

export default useAutoSignOut;
