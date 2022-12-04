/* eslint-disable */
// From: https://github.com/correttojs/graphql-codegen-apollo-next-ssr/blob/main/example/src/withApollo.tsx
// See https://github.com/vercel/next.js/discussions/9542
// See https://github.com/borisowsky/next-advanced-apollo-starter
// See https://github.com/vercel/next.js/tree/ff2d28c4ff0a2cc1ce408817f2714eebf1cf72c2/examples/with-apollo

import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { IncomingMessage } from 'http';
import { NextPage } from 'next';
// @ts-ignore
import { NextApiRequestCookies } from 'next-server/server/api-utils';
import { useMemo } from 'react';
import { authLink, errorLink, httpLink } from './utils';

let apolloClient: ApolloClient<NormalizedCacheObject>;

export type ApolloClientContext = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
};

export const withApollo =
  (PageComponent: NextPage) =>
  ({
    apolloState,
    req,
  }: {
    apolloState: NormalizedCacheObject;
    req: ApolloClientContext;
  }) => {
    return (
      <ApolloProvider client={useApollo(apolloState, req)}>
        <PageComponent />
      </ApolloProvider>
    );
  };

export const useApollo = (initialState: any, req: ApolloClientContext) => {
  const store = useMemo(
    () => getApolloClient(req, initialState),

    [initialState]
  );
  return store;
};

export const getApolloClient = (
  ctx: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  let tmpApolloClient = apolloClient;

  if (!tmpApolloClient) {
    tmpApolloClient = createApolloClient(ctx, initialState);
  }

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    tmpApolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return tmpApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = tmpApolloClient;

  return tmpApolloClient;
};

export const createApolloClient = (
  ctx: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  const cache = new InMemoryCache().restore(initialState || {});
  const client = new ApolloClient({
    link: from([errorLink, authLink(ctx), httpLink]),
    cache,
  });
  return client;
};
