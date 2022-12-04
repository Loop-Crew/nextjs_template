import { useAskResetPasswordUserMutation } from '@/services/generated/graphql';
import { Button, TextField } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import styles from '../Signup/Signup.module.css';

export default function Signin() {
  const { t } = useTranslation('common');
  // Input Variables: updated by user input
  const [email, setEmail] = useState('');
  const [hasUpdatedAfterError, setHasUpdatedAfterError] = useState(false);

  //Mutation : use the codegen hook: which return a function (Login),
  //           and the lifecycle of the request
  const [askResetPassword, { data, loading, error }] =
    useAskResetPasswordUserMutation();

  const [isDoneWritingEmail, setIsDoneWritingEmail] = useState(false);
  const isEmailValid = !isDoneWritingEmail || /.+@.+\..+/.test(email);

  // Check if all fields are correct, and send the form to create User
  function sendForm() {
    //Set all forms to written, in order to display the error messages
    setHasUpdatedAfterError(false);
    setIsDoneWritingEmail(true);
    if (isEmailValid) {
      askResetPassword({
        variables: { email: email },
      });
    }
  }

  // Display the conditionnal JSX to show the button, depending on the
  // corectness of the fields
  function displayButton() {
    if (error && !hasUpdatedAfterError) {
      let message = t('signin.error');
      if (error.message == 'Unauthorized') {
        message = t('reset.unkown_email');
      }
      return (
        <Button
          className={styles.inscription_button}
          variant="outlined"
          color="error"
        >
          {message}
        </Button>
      );
    }
    if (data) {
      // TODO : redirect user to his homepage
      return (
        <Button
          className={styles.inscription_button}
          variant="outlined"
          color="success"
        >
          {t('reset.sent.success')}
        </Button>
      );
    }

    return (
      <>
        <Button
          className={styles.inscription_button}
          variant="contained"
          color="success"
          style={{ marginTop: '20px' }}
          disabled={loading || !isEmailValid}
          onClick={() => {
            sendForm();
          }}
        >
          {loading ? t('common.button.sending') : t('reset.button.send')}
        </Button>
      </>
    );
  }

  return (
    <form className={styles.form}>
      <TextField
        id="email"
        type="email"
        label={t('reset.label.email')}
        variant="standard"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setHasUpdatedAfterError(true);
        }}
        onBlur={() => setIsDoneWritingEmail(true)}
        fullWidth
      />

      {!isEmailValid && (
        <span className={styles.invalid}>{t('common.invalid_email')}</span>
      )}

      {displayButton()}
    </form>
  );
}
