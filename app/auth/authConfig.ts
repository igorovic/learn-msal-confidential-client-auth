import { Configuration, LogLevel } from "@azure/msal-browser";
// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: String(process.env.NEXT_PUBLIC_CLIENT_ID),
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "/", // not used - since auth is done on backend
    postLogoutRedirectUri: "/",
  },
  /* system: {
    loggerOptions: {
      loggerCallback: console.log,
      logLevel: LogLevel.Trace,
    },
  }, */
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  //scopes: ["User.Read"],
  scopes: ["https://graph.microsoft.com/user.read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};
