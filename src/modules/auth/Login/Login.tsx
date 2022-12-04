import { Alert } from '@mui/material';
import styles from './Login.module.css';

import { useState } from 'react';

import { storeAccessToken } from 'lib/cookies/cookies';
import { NextPage } from 'next';
import { useLoginMutation } from 'services/generated/graphql';

const Login: NextPage = () => {
  // Input Variables: updated by user input
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  // const [showPassword, setShowPassword] = useState(false);

  const [isDoneWritingEmail, setIsDoneWritingEmail] = useState(false);
  const isEmailValid = !isDoneWritingEmail || /.+@.+\..+/.test(email);
  const [hasUpdatedAfterError, sethasUpdatedAfterError] = useState(false);

  /**  Error management*/
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  //Mutation : use the codegen hook: which return a function (Login),
  //           and the lifecycle of the request
  const [login, { data, loading, error }] = useLoginMutation({
    onCompleted(data) {
      setAlertType('success');
      setAlertMessage('Connexion réussie');
      setOpenAlert(true);
      storeAccessToken(data.login.access_token);
    },
    //Define what happened when the mutation call generate an error
    onError(error) {
      if (error.message == 'User not found') {
        setAlertMessage('E-mail ou mot de passe incorrect, veuillez réessayer');
      } else if (error.message == 'Mail not verified') {
        setAlertMessage(
          "Veuillez d'abord vérifier votre adresse e-mail (vérifiez vos spams)"
        );
      } else {
        setAlertMessage('Erreur, veuillez réessayer');
      }
      setAlertType('error');
      setOpenAlert(true);
    },
  });

  // Check if all fields are correct, and send the form to create User
  function sendForm() {
    //Set all forms to written, in order to display the error messages
    sethasUpdatedAfterError(false);
    login({
      variables: { email: email, password: pwd },
    });
  }
  if (data && !loading && !error) {
    // Authenticate(data.login.access_token);
  }

  // Display the conditionnal JSX to show the button, depending on the
  // corectness of the fields
  function displayButton() {
    if (error && !hasUpdatedAfterError) {
      return (
        <button className={styles.button} color="error" disabled>
          Veuillez réessayer
        </button>
      );
    }
    if (data) {
      // TODO : redirect user to his homepage
      return (
        <button className={styles.button} color="success">
          Login.success
        </button>
      );
    }

    return (
      <>
        <button
          disabled={loading}
          className={styles.button}
          onClick={() => {
            sendForm();
          }}
        >
          Connexion
        </button>
      </>
    );
  }

  function displayErrors() {
    return (
      <div className={openAlert ? styles.alert : styles.hidden}>
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={alertType == 'error' ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </div>
    );
  }

  return (
    <form className={styles.form}>
      <div className="formGroup">
        <label>Adresse mail</label>
        <input
          id="email"
          type="email"
          placeholder="entreprise@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value), sethasUpdatedAfterError(true);
          }}
          onBlur={() => setIsDoneWritingEmail(true)}
        />
      </div>

      {!isEmailValid && (
        <span className={styles.invalid}>common.invalid_email</span>
      )}
      <div className="formGroup">
        <label>Mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="monMot2Passe!!"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value), sethasUpdatedAfterError(true);
          }}
        />
      </div>

      <span className={styles.forgot_password}>Login.forgot_password</span>

      {displayButton()}
      {displayErrors()}
    </form>
  );
};

export default Login;
