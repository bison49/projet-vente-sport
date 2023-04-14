/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './userProfil.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import Banner from '../../../Component/banner/Banner';
import useToken from '../../../utils/Auth/useToken';
import useUser from '../../../utils/Auth/useUser';
import { modifUser } from '../../../utils/axios_request';
import { formRegisterValidation } from '../../../utils/form/formValidation';

function UserProfil() {
  const title = 'Mon profil';
  const { user, setUser } = useUser();
  const { token } = useToken();
  const [namesDisabled, setNamesDisabled] = useState<boolean>(true);
  const [contactDisabled, setContactDisabled] = useState<boolean>(true);
  const [adressDisabled, setAdressDisabled] = useState<boolean>(true);

  const [errorMessages, setErrorMessages] = useState<any>({
    lastname: '',
    firstname: '',
    username: '',
    birthdate: '',
    adress: '',
    postCode: '',
    city: '',
    email: '',
    phone: '',
  });

  const [values, setValues] = useState<any>({
    firstname: user.userInfo.fistname,
    lastname: user.userInfo.lastname,
    username: user.username,
    birthdate: user.userInfo.birthdate,
    adress: user.userInfo.adress.street,
    postCode: user.userInfo.adress.postCode,
    city: user.userInfo.adress.city,
    email: user.email,
    phone: user.userInfo.phone,
  });

  const handleUpdate = async (userField: any) => {
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ''));
    setErrorMessages({ ...errorMessages });
    if (formRegisterValidation(errorMessages, setErrorMessages, values)) {
      await modifUser(
        user.id,
        userField,
        token,
        errorMessages,
        setErrorMessages,
        setUser,
      );
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="App-my-profil">
      <Banner title={title} />
      <div className="my-profil-wrapper">
        <div className="my-profil-info-wrapper">
          <h2 className="my-profil-title">Informations personnelles:</h2>
          <div className="my-profil-input-wrapper">
            <div className="my-profil-inputs-wrapper">
              <div className="my-profil-name-wrapper lastname">
                <label htmlFor="lastname">Nom</label>
                <div>
                  <input
                    type="text"
                    name={'lastname'}
                    className={namesDisabled ? 'outline' : ''}
                    value={values.lastname}
                    onChange={onChange}
                    disabled={namesDisabled}
                    required
                  />
                  <span className="error">{errorMessages.lastname}</span>
                </div>
              </div>
              <div className="my-profil-name-wrapper">
                <label htmlFor="firstname">Prénom</label>
                <div>
                  <input
                    type="text"
                    className={namesDisabled ? 'outline' : ''}
                    name={'firstname'}
                    value={values.firstname}
                    onChange={onChange}
                    disabled={namesDisabled}
                    required
                  />
                  <span className="error">{errorMessages.firstname}</span>
                </div>
              </div>
            </div>

            <div className="my-profil-update-button">
              {namesDisabled ? (
                <button
                  className="update-button update"
                  type="button"
                  onClick={() => {
                    setNamesDisabled(!namesDisabled);
                  }}
                >
                  Modifier
                </button>
              ) : (
                <button
                  className="update-button save"
                  type="button"
                  onClick={() => {
                    handleUpdate({
                      userInfo: { lastname: values.lastname, fistname: values.firstname },
                    });
                    setNamesDisabled(!namesDisabled);
                  }}
                >
                  Enregistrer
                </button>
              )}
            </div>
          </div>
          <div className="my-profil-input-wrapper">
            <div className="my-profil-inputs-wrapper">
              <div className="my-profil-street-wrapper">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    className={'outline'}
                    type="email"
                    name={'adress'}
                    value={user.email}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-profil-input-wrapper">
            <div className="my-profil-inputs-wrapper">
              <div className="my-profil-email-wrapper">
                <label htmlFor="username">Username</label>
                <div>
                  <input
                    type="text"
                    name={'username'}
                    className={contactDisabled ? 'outline' : ''}
                    value={values.username}
                    onChange={onChange}
                    disabled={contactDisabled}
                    required
                  />
                  <span className="error">{errorMessages.username}</span>
                </div>
              </div>
              <div className="my-profil-phone-wrapper">
                <label htmlFor="phone">N° Tel</label>
                <div>
                  <input
                    type="text"
                    name={'phone'}
                    className={contactDisabled ? 'outline' : ''}
                    value={values.phone}
                    onChange={onChange}
                    disabled={contactDisabled}
                    required
                  />
                  <span className="error">{errorMessages.phone}</span>
                </div>
              </div>
            </div>
            <div className="my-profil-update-button">
              {contactDisabled ? (
                <button
                  className="update-button update"
                  type="button"
                  onClick={() => {
                    setContactDisabled(!contactDisabled);
                  }}
                >
                  Modifier
                </button>
              ) : (
                <button
                  className="update-button save"
                  type="button"
                  onClick={() => {
                    handleUpdate({
                      username: values.username,
                      userInfo: { phone: values.phone },
                    });
                    setContactDisabled(!contactDisabled);
                  }}
                >
                  Enregistrer
                </button>
              )}
            </div>
          </div>
          <div className="my-profil-input-wrapper">
            <div className="my-profil-inputs-wrapper">
              <div className="my-profil-street-wrapper">
                <label htmlFor="adress">Rue</label>
                <div>
                  <input
                    type="text"
                    name={'adress'}
                    className={adressDisabled ? 'outline' : ''}
                    value={values.adress}
                    onChange={onChange}
                    disabled={adressDisabled}
                    required
                  />
                  <span className="error">{errorMessages.adress}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-profil-input-wrapper">
            <div className="my-profil-inputs-wrapper">
              <div className="my-profil-name-wrapper lastname">
                <label htmlFor="city">Ville</label>
                <div>
                  <input
                    type="text"
                    name={'city'}
                    className={adressDisabled ? 'outline' : ''}
                    value={values.city}
                    onChange={onChange}
                    disabled={adressDisabled}
                    required
                  />
                  <span className="error">{errorMessages.city}</span>
                </div>
              </div>
              <div className="my-profil-name-wrapper">
                <label htmlFor="postCode">Code postal</label>
                <div>
                  <input
                    type="text"
                    className={adressDisabled ? 'outline' : ''}
                    name={'postCode'}
                    value={values.postCode}
                    onChange={onChange}
                    disabled={adressDisabled}
                    required
                  />
                  <span className="error">{errorMessages.postCode}</span>
                </div>
              </div>
            </div>

            <div className="my-profil-update-button">
              {adressDisabled ? (
                <button
                  className="update-button update"
                  type="button"
                  onClick={() => {
                    setAdressDisabled(!adressDisabled);
                  }}
                >
                  Modifier<div>(adresse)</div>
                </button>
              ) : (
                <button
                  className="update-button save"
                  type="button"
                  onClick={() => {
                    handleUpdate({
                      userInfo: {
                        adress: {
                          street: values.adress,
                          city: values.city,
                          postCode: values.postCode,
                        },
                      },
                    });
                    setAdressDisabled(!adressDisabled);
                  }}
                >
                  Enregistrer
                </button>
              )}
            </div>
          </div>
          <h2 className="my-profil-title">Modifier vos identifiants:</h2>
          <div className="update-credentials-wrapper">
            <span className="update-credentials-text">
              Vous souhaitez modifier votre adresse email
            </span>
            <div className="update-credential-wrapper">
              <Link className="update-credentials-link" to="/my-profil-update-email">
                Cliquez ici
              </Link>
            </div>
          </div>
          <div className="update-credentials-wrapper">
            <span className="update-credentials-text">
              Vous souhaitez modifier votre mots de passe
            </span>
            <div className="update-credential-wrapper">
              <Link className="update-credentials-link" to="/my-profil-update-password">
                Cliquez ici
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
