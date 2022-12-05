import { withApollo } from '@/lib/apollo/withApollo';
import { GetServerSideProps } from 'next';
import {
  PageGetPriceListsComp,
  ssrGetPriceLists,
} from 'services/generated/page';

const Users: PageGetPriceListsComp = () => {
  const { data } = ssrGetPriceLists.usePage();
  return (
    <>
      {data?.myUser.price_lists.map((pricelist) => {
        return <div key={pricelist._id}>{pricelist.name}</div>;
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await ssrGetPriceLists.getServerPage({}, ctx);
};
export default withApollo(Users);
