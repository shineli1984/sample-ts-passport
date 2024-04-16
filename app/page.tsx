"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { config, passport } from "@imtbl/sdk";
import { useState } from "react";

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

  logoutMode: "redirect",

  crossSdkBridgeEnabled: true,
});

export default function Home() {
  const [accounts, setAccounts] = useState("");
  return (
    <main className={styles.main}>
      <button
        onClick={async () => {
          const provider = await passportInstance.connectImx();
          const registered = await provider.isRegisteredOffchain();
          if (!registered) {
            const rego = await provider.registerOffchain();
            console.log(rego);
          }
          const accounts = await provider.getAddress();
          setAccounts(accounts);
        }}
      >
        LOGIN
      </button>
      <div>{accounts}</div>
    </main>
  );
}
