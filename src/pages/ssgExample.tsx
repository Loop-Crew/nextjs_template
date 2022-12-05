import { withApollo } from '@/lib/apollo/withApollo';
import { GetStaticProps } from 'next';
import {
  PageGetPriceListsComp,
  ssrGetPriceLists,
} from 'services/generated/page';

const Users: PageGetPriceListsComp = () => {
  // Using ssr generated hook because the syntax is the same
  const { data } = ssrGetPriceLists.usePage();
  return (
    <>
      {data?.myUser.price_lists.map((pricelist) => {
        return <div key={pricelist._id}>{pricelist.name}</div>;
      })}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  //This actual example does not work because GetPriceListDocuments needs authentication
  // (and you cannot do authenticated calls with static generation)
  // This example is just here for the syntax
  /*
  const apolloClient = getApolloClient(undefined, undefined);

  await apolloClient.query({
    query: GetPriceListsDocument,
    variables: {},
  });
  */
  return {
    props: {},
  };
};
export default withApollo(Users);
