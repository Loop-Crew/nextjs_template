import { withApollo } from '@/lib/apollo/withApollo';
import { useGetPriceListsQuery } from 'services/generated/graphql';

const Users = () => {
  const { data } = useGetPriceListsQuery();
  return (
    <>
      {data?.myUser.price_lists.map((pricelist) => {
        return <div key={pricelist._id}>{pricelist.name}</div>;
      })}
    </>
  );
};

export default withApollo(Users);
