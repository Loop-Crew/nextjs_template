import { useResetPasswordMutation } from '@/services/generated/graphql';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../Signup/Signup.module.css';

export default function ResetPassword() {
  // Input Variables: updated by user input
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // State Variables : updated on events
  // Check if user has started to write fields, in order to display errors
  // Only if he has already clicked on the corresponding field

  const [isDoneWritingPwd, setIsDoneWritingPwd] = useState(false);
  const [isDoneWritingConfirmPwd, setIsDoneWritingConfirmPwd] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isWritingPwd, setIsWritingPwd] = useState(false);

  // Correctness variables : check if fields are correct
  const isPasswordValid =
    !isDoneWritingPwd ||
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?~!@$%^&*-]).{8,}$/.test(pwd);
  const hasPwdCorrectLength = pwd.length >= 8;
  const hasPwdUpperLetter = /(?=.*[A-Z])/.test(pwd);
  const hasPwdLowerLetter = /(?=.*[a-z])/.test(pwd);
  const hasPwdDigit = /(?=.*[0-9])/.test(pwd);
  const hasPwdSpecialChar = /(?=.*[#?~!@$%^&*-])/.test(pwd);
  const arePasswordsEquals = !isDoneWritingConfirmPwd || pwd == confirmPwd;

  const router = useRouter();
  let { token, user_id } = router.query;

  //Mutation : use the codegen hook: which return a function (createUser),
  //           and the lifecycle of the request
  const [resetPassword, { data, loading, error }] = useResetPasswordMutation();

  // Check if all fields are correct, and send the form to create User
  function sendForm() {
    //Set all forms to written, in order to display the error messages
    setIsDoneWritingPwd(true);
    setIsDoneWritingConfirmPwd(true);
    if (
      isPasswordValid &&
      isDoneWritingPwd &&
      arePasswordsEquals &&
      isDoneWritingConfirmPwd &&
      token &&
      user_id
    ) {
      if (token && typeof token != 'string') {
        token = token[0];
      }
      if (user_id && typeof user_id != 'string') {
        user_id = user_id[0];
      }
      resetPassword({
        variables: {
          new_password: pwd,
          token: token,
          user_id: user_id,
        },
      });
    }
  }

  // Display the conditionnal JSX to show the button, depending on the
  // corectness of the fields
  function displayButton() {
    if (error) {
      return (
        <Button
          className={styles.inscription_button}
          variant="outlined"
          color="error"
        >
          {t('signup.error')}
        </Button>
      );
    }
    if (!user_id || !token) {
      return (
        <Button
          className={styles.inscription_button}
          variant="outlined"
          color="error"
          disabled
        >
          {t('reset.invalid')}
        </Button>
      );
    }

    if (data) {
      // TODO : redirect user to his homepage
      return (
        <Link href={login_url} passHref>
          <Button
            className={styles.inscription_button}
            variant="outlined"
            color="success"
          >
            {t('reset.validation')}
          </Button>
        </Link>
      );
    }

    return (
      <>
        <Button
          className={styles.inscription_button}
          variant="contained"
          color="success"
          disabled={loading || !isPasswordValid || !arePasswordsEquals}
          onClick={() => sendForm()}
        >
          {loading ? t('common.button.sending') : t('reset.send.request')}
        </Button>
      </>
    );
  }

  return (
    <form className={styles.form}>
      <div className={styles.field_container}>
        <TextField
          type={showPassword ? 'text' : 'password'}
          id="password"
          label={t('signup.new_password')}
          variant="standard"
          value={pwd}
          onClick={() => setIsWritingPwd(true)}
          onBlur={() => {
            setIsDoneWritingPwd(true), setIsWritingPwd(false);
          }}
          onChange={(e) => setPwd(e.target.value)}
          error={!isPasswordValid}
          fullWidth
        />
        <div
          className={styles.visibility_button}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <div className={styles.visibility}>
              <VisibilityOff />
            </div>
          ) : (
            <div className={styles.visibility}>
              <Visibility />
            </div>
          )}
        </div>
      </div>
      {isWritingPwd || !isPasswordValid ? (
        <ul className={styles.password_checking}>
          {t('signup.password_help')}
          <li className={hasPwdCorrectLength ? styles.valid : styles.invalid}>
            {t('signup.password_help.length')}
          </li>
          <li className={hasPwdLowerLetter ? styles.valid : styles.invalid}>
            {t('signup.password_help.min')}
          </li>
          <li className={hasPwdUpperLetter ? styles.valid : styles.invalid}>
            {t('signup.password_help.maj')}
          </li>
          <li className={hasPwdDigit ? styles.valid : styles.invalid}>
            {t('signup.password_help.digit')}
          </li>
          <li className={hasPwdSpecialChar ? styles.valid : styles.invalid}>
            {t('signup.password_help.special_character')}
          </li>
        </ul>
      ) : (
        <></>
      )}

      <div className={styles.field_container}>
        <TextField
          type={showPassword ? 'text' : 'password'}
          id="confirm-password"
          label={t('signup.label.password_confirmation')}
          variant="standard"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          onBlur={() => {
            setIsDoneWritingConfirmPwd(true);
          }}
          error={!arePasswordsEquals}
          fullWidth
        />
        <div
          className={styles.visibility_button}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <div className={styles.visibility}>
              <VisibilityOff />
            </div>
          ) : (
            <div className={styles.visibility}>
              <Visibility />
            </div>
          )}
        </div>
      </div>
      {!arePasswordsEquals && (
        <span className={styles.invalid}>
          {t('signup.password_help.not_identical')}
        </span>
      )}
      {displayButton()}
    </form>
  );
}
