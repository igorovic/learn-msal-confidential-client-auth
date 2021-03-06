import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import Link from "next/link";
import { loginRequest } from "app/auth/authConfig";

const Home: NextPage = () => {
  const router = useRouter();

  const { instance: msalInstance } = useMsal();

  function login() {
    msalInstance.loginRedirect({
      ...loginRequest,
      redirectUri: "/auth",
    });
  }

  function loginBackend() {
    router.push("/api/auth/login", "/api/auth/login", { shallow: true });
  }
  function logout() {
    const account = msalInstance.getActiveAccount();
    const logoutRequest = {
      account,
    };
    msalInstance.logout(logoutRequest);
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <AuthenticatedTemplate>
          <p className="text-2xl">Authenticated</p>
          <div className="mt-10">
            <button onClick={logout}>Logout</button>
          </div>
          <div className="flex justify-between mt-10">
            <Link href="/page-1">
              <span className="font-bold text-blue-500 cursor-pointer">
                got to page 1
              </span>
            </Link>
          </div>
        </AuthenticatedTemplate>
        <div>
          <Link href="/page-1">
            <span className="font-bold text-blue-500 cursor-pointer">
              got to page 1
            </span>
          </Link>
        </div>
        <UnauthenticatedTemplate>
          <h1 className="text-2xl">Unauthenticated</h1>
          <div className="flex justify-between mt-10 w-1/2">
            <button onClick={login}>Login public client</button>
            <Link href="#" passHref>
              <a onClick={loginBackend}>Login with confidential client</a>
            </Link>
          </div>
        </UnauthenticatedTemplate>
      </main>
    </div>
  );
};

export default Home;
