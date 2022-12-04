import DoneIcon from '@mui/icons-material/Done';
import { Button } from '@mui/material';
import routes from 'config/routes';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useVerifyEmailMutation } from 'services/generated/graphql';

export default function VerifyEmail() {
  const { t } = useTranslation('common');
  const router = useRouter();
  let { token, user_id } = router.query;
  if (token && typeof token != 'string') {
    token = token[0];
  }
  if (user_id && typeof user_id != 'string') {
    user_id = user_id[0];
  }
  const [isRequestSent, setIsRequestSent] = useState(false);

  //Mutation : use the codegen hook: which return a function (Login),
  //           and the lifecycle of the request
  const [verifyEmail, { data, loading, error }] = useVerifyEmailMutation();

  // Check if all fields are correct, and send the form to create User
  if (token && user_id && !isRequestSent) {
    setIsRequestSent(true);
    verifyEmail({ variables: { token: token, user_id: user_id } });
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>{t('verification.ongoing')}</div>
    );
  }

  if (error || (data && !data.verifyEmail?.success)) {
    if (error && error.message == 'This mail has already been verified') {
      return (
        <div style={{ textAlign: 'center', fontSize: '22px' }}>
          <DoneIcon color={'success'} style={{ fontSize: '60px' }} />
          <div>{t('verification.already_verified')}</div>
          <br />
          <Link href={routes.ACCOUNT_LOGIN} passHref>
            <Button color={'success'} variant={'outlined'}>
              {t('signin.button.signin')}
            </Button>
          </Link>
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center', fontSize: '22px' }}>
        <div>{t('verification.outdated')}</div>
        <Link href={routes.ACCOUNT_SIGNUP} passHref>
          <Button color={'success'} variant={'outlined'}>
            {t('common.button.create_account')}
          </Button>
        </Link>
      </div>
    );
  }
  if (data && data.verifyEmail?.success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <DoneIcon color={'success'} style={{ fontSize: '60px' }} />
        <div>{t('verification.success')}</div>
        <br />
        <Link href={routes.ACCOUNT_LOGIN} passHref>
          <Button color={'success'} variant={'outlined'}>
            {t('common.button.connect')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', fontSize: '18px' }}>
      <div>{t('verification.message_sent')}</div>
      <br />
      <Link href={routes.ACCOUNT_LOGIN} passHref>
        <Button color={'success'} variant={'outlined'}>
          {t('verification.back_to_login')}
        </Button>
      </Link>
    </div>
  );
}
