import { Alert } from '@mui/material';
import routes from 'config/routes';
import useTranslation from 'next-translate/useTranslation';
import Router from 'next/router';
import { useState } from 'react';
import { useCreateUserMutation } from 'services/generated/graphql';
import styles from './Signup.module.css';

// import amplitude from 'amplitude-js';

export default function Signup() {
  const { t } = useTranslation('common');

  /* Form logic */
  const [currentPage, setCurrentPage] = useState(0);

  /* Informations relative to society */
  const [societyName, setSocietyName] = useState('');
  const [isDoneWritingSocietyName, setIsDoneWritingSocietyName] =
    useState(false);
  const isSocietyValid = !isDoneWritingSocietyName || societyName.length > 0;

  /* informations relative to phone */
  const [phone, setPhone] = useState('');
  const [isDoneWritingPhone, setIsDoneWritingPhone] = useState(false);
  const isPhoneValid = !isDoneWritingPhone || phone.length > 0;

  /* informations relative to address */
  const [address, setAddress] = useState('');
  const [isDoneWritingAddress, setIsDoneWritingAddress] = useState(false);
  const isAddressValid = !isDoneWritingAddress || address.length > 0;

  /* informations relative to city */
  const [city, setCity] = useState('');
  const [isDoneWritingCity, setIsDoneWritingCity] = useState(false);
  const isCityValid = !isDoneWritingCity || city.length > 0;

  /* informations relative to country */
  const [country, setCountry] = useState('');
  const [isDoneWritingCountry, setIsDoneWritingCountry] = useState(false);
  const isCountryValid = !isDoneWritingCountry || country.length > 0;

  /* informations relative to postcode */
  const [postCode, setPostCode] = useState('');
  const [isDoneWritingPostCode, setIsDoneWritingPostCode] = useState(false);
  const isPostCodeValid = !isDoneWritingPostCode || postCode.length > 0;

  /* informations relative to siret */
  // const [siret, setSiret] = useState('');
  // const [isDoneWritingSiret, setIsDoneWritingSiret] = useState(false);
  // const isSiretValid = !isDoneWritingSiret || siret.length > 0;

  /* informations relative to email */
  const [email, setEmail] = useState('');
  const [isDoneWritingEmail, setIsDoneWritingEmail] = useState(false);
  const isEmailValid = !isDoneWritingEmail || /.+@.+\..+/.test(email);

  /* informations relative to pwd */
  const [pwd, setPwd] = useState('');
  const [isWritingPwd, setIsWritingPwd] = useState(false);
  const [isDoneWritingPwd, setIsDoneWritingPwd] = useState(false);
  const isPasswordValid =
    !isDoneWritingPwd ||
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?~!@$%^&*-]).{8,}$/.test(pwd);
  const hasPwdCorrectLength = pwd.length >= 8;
  const hasPwdUpperLetter = /(?=.*[A-Z])/.test(pwd);
  const hasPwdLowerLetter = /(?=.*[a-z])/.test(pwd);
  const hasPwdDigit = /(?=.*[0-9])/.test(pwd);
  const hasPwdSpecialChar = /(?=.*[#?~!@$%^&*-])/.test(pwd);

  /* informations relative to confirmPwd */
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isDoneWritingConfirmPwd, setIsDoneWritingConfirmPwd] = useState(false);
  const arePasswordsEquals = !isDoneWritingConfirmPwd || pwd == confirmPwd;

  /* Alert message */
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  //Mutation : use the codegen hook: which return a function (createUser),
  //           and the lifecycle of the request
  const [createUser, { loading }] = useCreateUserMutation({
    //Define what happened when the mutation is called
    onCompleted() {
      setAlertType('success');
      setAlertMessage('Votre compte a bien été crée !');
      setOpenAlert(true);
      Router.push(routes.HOME);
    },
    //Define what happened when the mutation call generate an error
    onError(error: { message: string }) {
      console.log(error);
      if (error.message == 'Email or Siret already registered') {
        setAlertMessage('Erreur, un compte existe déjà avec cet e-mail.');
      } else {
        setAlertMessage('Erreur, veuillez réessayer');
      }
      setAlertType('error');
      setOpenAlert(true);
    },
  });
  //Error management

  // Check if all fields are correct, and send the form to create User
  function sendForm() {
    //Set all forms to written, in order to display the error messages
    setIsDoneWritingPhone(true);
    setIsDoneWritingSocietyName(true);
    setIsDoneWritingSocietyName(true);
    setIsDoneWritingAddress(true);
    setIsDoneWritingCity(true);
    setIsDoneWritingPostCode(true);
    setIsDoneWritingCountry(true);
    // setIsDoneWritingSiret(true);
    setIsDoneWritingEmail(true);
    setIsDoneWritingPwd(true);
    setIsDoneWritingConfirmPwd(true);
    if (
      isPasswordValid &&
      isDoneWritingPwd &&
      isPhoneValid &&
      isDoneWritingPhone &&
      isSocietyValid &&
      isDoneWritingSocietyName &&
      isEmailValid &&
      isDoneWritingEmail &&
      arePasswordsEquals &&
      isDoneWritingConfirmPwd
    ) {
      console.log('creating user');
      createUser({
        variables: {
          company_name: societyName,
          email: email,
          password: pwd,
          phone: phone,
          address: address,
          city: city,
          zip: postCode,
          country: country,
          // siret: siret,
        },
      });
    }
  }
  function checkIfFirstPageIsCorrect() {
    if (!isDoneWritingPwd || !isDoneWritingEmail || !isDoneWritingConfirmPwd) {
      setIsDoneWritingEmail(true);
      setIsDoneWritingPwd(true);
      setIsDoneWritingConfirmPwd(true);
    } else if (isPasswordValid && isEmailValid && arePasswordsEquals) {
      setCurrentPage(1);
    }
  }

  // Display the conditionnal JSX to show the button, depending on the
  // corectness of the fields
  function displayButton() {
    if (currentPage == 0) {
      return (
        <>
          <button
            type="button"
            disabled={!isPasswordValid || !isEmailValid || !arePasswordsEquals}
            onClick={() => checkIfFirstPageIsCorrect()}
            className={styles.button}
          >
            Suivant
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className={styles.button}
            disabled={
              loading ||
              !isPasswordValid ||
              !isPhoneValid ||
              !isSocietyValid ||
              !isEmailValid ||
              !arePasswordsEquals
            }
            onClick={(e) => {
              e.preventDefault();
              sendForm();
            }}
          >
            {loading ? 'Envoi en cours' : "M'inscrire"}
          </button>
        </>
      );
    }
  }

  function displayFields() {
    if (currentPage == 0) {
      return (
        <>
          <div className="formGroup">
            <label>Adresse mail</label>
            <input
              id="email"
              type="email"
              placeholder="entreprise@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setIsDoneWritingEmail(true)}
            />
          </div>
          {!isEmailValid && (
            <span className={styles.invalid}>{t('common.invalid_email')}</span>
          )}
          <div className="formGroup">
            <label>mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="monMot2Passe!!"
              value={pwd}
              onClick={() => setIsWritingPwd(true)}
              onBlur={() => {
                setIsDoneWritingPwd(true), setIsWritingPwd(false);
              }}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          {isWritingPwd || !isPasswordValid ? (
            <ul className={styles.password_checking}>
              {t('signup.password_help')}
              <li
                className={hasPwdCorrectLength ? styles.valid : styles.invalid}
              >
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
          <div className="formGroup">
            <label>Confirmer mot de passe</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="monMot2Passe!!"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              onBlur={() => {
                setIsDoneWritingConfirmPwd(true);
              }}
            />
          </div>
          {!arePasswordsEquals && (
            <span className={styles.invalid}>
              {t('signup.password_help.not_identical')}
            </span>
          )}
        </>
      );
    } else if (currentPage == 1) {
      return (
        <>
          <div className="formGroup">
            <label>N° téléphone</label>
            <input
              id="phone"
              type="text"
              placeholder="+33 6 01 02 03 04"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setIsDoneWritingPhone(true)}
            />
          </div>
          {!isPhoneValid && (
            <span className={styles.invalid}>
              Vous devez renseigner votre téléphone
            </span>
          )}
          <div className="formGroup">
            <label>Nom de la société</label>
            <input
              id="societyName"
              type="text"
              placeholder="Votre société"
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
              onBlur={() => setIsDoneWritingSocietyName(true)}
            />
          </div>
          {!isSocietyValid && (
            <span className={styles.invalid}>
              Vous devez renseigner votre nom de société
            </span>
          )}
          <div className="formGroup">
            <label>Adresse (N° et voie)</label>
            <input
              id="address"
              type="text"
              placeholder="2 place Bellecour"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => setIsDoneWritingAddress(true)}
            />
          </div>
          {!isAddressValid && (
            <span className={styles.invalid}>
              Vous devez renseigner votre adresse
            </span>
          )}
          <div className="formGroup">
            <label>Ville</label>
            <input
              id="city"
              type="text"
              placeholder="Lyon"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onBlur={() => setIsDoneWritingCity(true)}
            />
          </div>
          {!isCityValid && (
            <span className={styles.invalid}>
              Vous devez renseigner votre Ville
            </span>
          )}
          <div className="formGroup">
            <label>Code Postal</label>
            <input
              id="postcode"
              type="text"
              placeholder="69005"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              onBlur={() => setIsDoneWritingPostCode(true)}
            />
          </div>
          {!isPostCodeValid && (
            <span className={styles.invalid}>
              Vous devez renseigner votre code postal
            </span>
          )}
          <div className="formGroup">
            <label>Pays</label>
            <input
              id="country"
              type="text"
              placeholder="France"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onBlur={() => setIsDoneWritingCountry(true)}
            />
          </div>
          {!isCountryValid && (
            <span className={styles.invalid}>
              Vous devez renseigner votre Pays
            </span>
          )}
        </>
      );
    }
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
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div className={styles.progressBar}>
        <div
          className={
            currentPage == 0 ? `${styles.elem} ${styles.selected}` : styles.elem
          }
          onClick={() => setCurrentPage(0)}
        ></div>
        <div
          className={
            currentPage == 1 ? `${styles.elem} ${styles.selected}` : styles.elem
          }
          onClick={() => checkIfFirstPageIsCorrect()}
        ></div>
      </div>
      {displayFields()}
      {displayButton()}
      {displayErrors()}
    </form>
  );
}
