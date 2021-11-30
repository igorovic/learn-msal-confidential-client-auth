import { Configuration, LogLevel } from "@azure/msal-node";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: String(process.env.NEXT_PUBLIC_CLIENT_ID),
    authority: "https://login.microsoftonline.com/common",
    clientSecret: String(process.env.CLIENT_SECRET),
  },
  /* system: {
    loggerOptions: {
      loggerCallback: console.log,
      logLevel: LogLevel.Trace,
    },
  }, */
};
