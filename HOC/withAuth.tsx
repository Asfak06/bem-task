import React from 'react';
import { getCookie } from 'cookies-next';
import Router from 'next/router';
import type { NextPageContext } from 'next';

// Define cookie name for the auth token
const AUTH_TOKEN_COOKIE_NAME = 'authToken';

// Define redirect paths
const LOGIN_PAGE = '/signin';
const HOME_PAGE = '/home';

const withAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => <WrappedComponent {...props} />;

  Auth.getInitialProps = async (ctx: NextPageContext) => {
    const { req, res } = ctx;

    // Helper function to handle redirection
    const redirect = async (destination: string) => {
      if (res) {
        // Server-side redirection
        res.writeHead(302, { Location: destination });
        res.end();
      } else {
        // Client-side redirection
        await Router.push(destination);
      }
    };

    // Try to retrieve the token from the cookies
    const authToken = getCookie(AUTH_TOKEN_COOKIE_NAME, { req, res });

    // Redirect to the login page if there is no token and the user is not on the login page
    if (!authToken && ctx.pathname !== LOGIN_PAGE) {
      await redirect(LOGIN_PAGE);
      return {};
    }

    // If the user is on the login page but has a token, redirect to the home page
    if (authToken && ctx.pathname === LOGIN_PAGE) {
      await redirect(HOME_PAGE);
      return {};
    }

    // If the WrappedComponent has getInitialProps, call it
    let componentProps = {};
    if (WrappedComponent.getInitialProps) {
      componentProps = await WrappedComponent.getInitialProps(ctx);
    }

    return { ...componentProps };
  };

  return Auth;
};

export default withAuth;
