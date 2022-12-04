import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { config } from 'config/config';
import Cookies from 'universal-cookie';
import { ApolloClientContext } from './withApollo';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const httpLink = createHttpLink({
  uri: config.apiURL,
  fetch,
});

// export const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// https://github.com/apollographql/apollo-client/blob/main/docs/source/networking/authentication.mdx
export const authLink = (ctx: ApolloClientContext) =>
  setContext(async (_, { headers }) => {
    try {
      // Retrieve cookies
      const cookies = isServerRenderCtx(ctx)
        ? new Cookies(ctx.req.headers.cookie)
        : new Cookies();

      // Extract authorization from cookies
      const token = cookies.get(config.tokenPath);

      // In case SSR, add cookies manually from context
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          cookie: ctx?.req?.headers?.cookie,
        },
      };
    } catch (error) {
      console.error(error);
    }
  });

export const isServerRenderAppCtx = (appContext: {
  ctx: { res: { writeHead: any } };
}) =>
  !!(
    appContext &&
    appContext.ctx &&
    appContext.ctx.res &&
    appContext.ctx.res.writeHead
  );

export const isServerRenderCtx = (ctx: { req: any }) => !!(ctx && ctx.req);

export const isClient = typeof window !== 'undefined';
