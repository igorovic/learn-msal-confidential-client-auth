import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import store from "app/store";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "app/auth/authConfig";
import { CustomNavigationClient } from "app/auth/NavigationClient";
import { useRouter } from "next/router";
import Link from "next/link";
import SwitchLng from "components/switchLng";
export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  console.debug("MSAL event", event);
  //@ts-ignore
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    //@ts-ignore
    const account = event.payload.account;
    console.debug("SET ACCOUNT", account);
    msalInstance.setActiveAccount(account);
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);
  return (
    <Provider store={store}>
      <MsalProvider instance={msalInstance}>
        <Component {...pageProps} />
        <SwitchLng />
      </MsalProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
