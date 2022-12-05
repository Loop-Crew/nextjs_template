/* eslint-disable */
// THIS FILE IS GENERATED; DO NOT EDIT
import * as Types from './graphql';

import * as Operations from './graphql';
import { NextRouter, useRouter } from 'next/router';
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient, ApolloClientContext } from 'lib/apollo/withApollo';
export async function getServerPageGetPriceLists(
  options: Omit<
    Apollo.QueryOptions<Types.GetPriceListsQueryVariables>,
    'query'
  >,
  ctx: ApolloClientContext
) {
  const apolloClient = getApolloClient(ctx);

  const data = await apolloClient.query<Types.GetPriceListsQuery>({
    ...options,
    query: Operations.GetPriceListsDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      __APOLLO_STATE__: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetPriceLists = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetPriceListsQuery,
    Types.GetPriceListsQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetPriceListsDocument, options);
};
export type PageGetPriceListsComp = React.FC<{
  data?: Types.GetPriceListsQuery;
  error?: Apollo.ApolloError;
}>;
export const ssrGetPriceLists = {
  getServerPage: getServerPageGetPriceLists,

  usePage: useGetPriceLists,
};
