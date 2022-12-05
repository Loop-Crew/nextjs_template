import { withApollo } from '@/lib/apollo/withApollo';
import Login from 'modules/auth/Login/Login';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return { props: {}, revalidate: 60 };
};

export default withApollo(Login);
