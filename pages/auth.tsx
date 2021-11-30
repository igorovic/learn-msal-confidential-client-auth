import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

//@ts-ignore
import * as cookie from "cookie-cutter";
//@ts-ignore
import * as URLSafeBase64 from "urlsafe-base64";

export default function Auth() {
  const router = useRouter();
  const msal = useMsal();
  useEffect(() => {
    const Params = window.location.hash.substr(1);
    let tokenResponse = JSON.parse(URLSafeBase64.decode(Params));
    console.debug("TOKEN response", tokenResponse);
    const cache = msal.instance.getTokenCache();
    const client_info = cookie.get("CLIENT_INFO");

    cache.loadExternalTokens(
      tokenResponse,
      {
        access_token: tokenResponse.accessToken,
        id_token: tokenResponse.idToken,
        client_info,
        expires_in: tokenResponse.expires_in,
      },
      { clientInfo: client_info, extendedExpiresOn: tokenResponse.extExpiresOn }
    );
    cookie.set("CLIENT_INFO", "");
    router.push("/");
  });
  return <p>Authentication progress..</p>;
}
