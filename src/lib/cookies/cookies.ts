import { config } from 'config/config';
import routes from 'config/routes';
import Cookies from 'universal-cookie';

export const DEFAULT_COOKIES_OPTIONS = {
  path: '/',
  expires: undefined, // expires on browser close
};

export const getAccessToken = (cookies = new Cookies()) =>
  cookies.get(config.tokenPath);

export const storeAccessToken = (
  token: string,
  path: string = config.tokenPath
) => {
  const cookie = new Cookies();

  cookie.set(path, token, DEFAULT_COOKIES_OPTIONS);
};

export const clearAllCookies = () => {
  const cookie = new Cookies();
  const cookieNames = Object.keys(cookie.getAll() || {});
  cookieNames.forEach((cookieName) =>
    cookie.remove(cookieName, DEFAULT_COOKIES_OPTIONS)
  );
};

export async function logOutAndRedirect() {
  try {
    clearAllCookies();

    // Force the route => this will trigger a full reload, no apollo cache issues
    // https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
    window.location.href = routes.ACCOUNT_LOGIN.href;
  } catch (error) {
    console.error(error);
  }
}

export const isExpired = (expireAtTimestampInSeconds: number) => {
  const currentTimestampInSeconds = new Date().getTime() / 1000;

  if (expireAtTimestampInSeconds - currentTimestampInSeconds < 60) {
    return true;
  }

  return false;
};

export const getIdTokenFromSession = (session: {
  getIdToken: () => {
    (): any;
    new (): any;
    getJwtToken: { (): any; new (): any };
  };
}) => session.getIdToken().getJwtToken();

export const extractAndStoreIdTokenFromSession = (session: any) => {
  const idToken = getIdTokenFromSession(session);
  storeAccessToken(idToken, config.tokenPath);
};
