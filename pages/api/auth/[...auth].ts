// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as msal from "@azure/msal-node";
import { msalConfig } from "app/confidential-auth/authConfig";
import { ResponseMode } from "@azure/msal-node";
import Cookies from "cookies";

const URLSafeBase64 = require("urlsafe-base64");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { auth } = req.query;

    const pca = new msal.ConfidentialClientApplication(msalConfig);
    const cookies = new Cookies(req, res);
    switch (true) {
      case auth.includes("callback"):
        //console.debug(req);
        const { code, client_info } = req.body;
        cookies.set("CLIENT_INFO", client_info, { httpOnly: false });
        const R2 = await pca.acquireTokenByCode({
          code,
          scopes: ["User.Read"],
          redirectUri: `https://${process.env.HOST}/api/auth/callback`,
        });
        //console.debug("R2", R2);
        if (R2) {
          const U = URLSafeBase64.encode(
            Buffer.from(
              JSON.stringify({
                ...R2,
                expires_in: 3600 * 1000,
              })
            )
          );
          return res.redirect(`https://${process.env.HOST}/auth#${U}`);
        }
        break;
      case auth.includes("login"):
        const R = await pca.getAuthCodeUrl({
          scopes: ["openid"],
          responseMode: ResponseMode.FORM_POST,
          redirectUri: `https://${process.env.HOST}/api/auth/callback`,
        });
        return res.redirect(R);
      default:
        return res.json("unknown");
    }
  } catch (e) {
    console.error(e);
  }
  res.status(200).json({ error: "Should not end here" });
}
