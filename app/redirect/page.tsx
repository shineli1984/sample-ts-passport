"use client";
import { config, passport } from "@imtbl/sdk";

const PUBLISHABLE_KEY = ""; // Replace with your Publishable Key from the Immutable Hub
const CLIENT_ID = ""; // Replace with your Client id from the Immutable Hub

const passportInstance = new passport.Passport({
  baseConfig: {
    environment: config.Environment.SANDBOX,
    publishableKey: PUBLISHABLE_KEY,
  },
  clientId: CLIENT_ID,
  redirectUri: "http://localhost:3000/redirect",
  logoutRedirectUri: "http://localhost:3000/logout",
  audience: "platform_api",
  scope: "openid offline_access email transact",
});

export default function Page() {
  passportInstance.loginCallback();
  return <></>;
}
