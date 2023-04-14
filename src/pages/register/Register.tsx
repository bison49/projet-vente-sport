/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './register.css';

import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import { useNavigate } from 'react-router-dom';

import pdf from '../../../resources/pdf/cgu.pdf';
import Banner from '../../Component/banner/Banner';
import CustomInput from '../../Component/customInput/CustomInput';
import { registerUser } from '../../utils/axios_request';
import { formRegisterValidation } from '../../utils/form/formValidation';
import { User } from '../../utils/object/user';

function Register() {
  const title = 'Inscription';
  const [conditionsChecked, setConditionsChecked] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [conditionError, setconditionError] = useState<string>('');
  const [isValidate, setIsValidate] = useState(false);
  const navigate = useNavigate();

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
    password: '',
    confPassword: '',
  });

  const [values, setValues] = useState<any>({
    firstname: '',
    lastname: '',
    username: '',
    birthdate: '',
    adress: '',
    postCode: '',
    city: '',
    email: '',
    phone: '',
    password: '',
    confPassword: '',
  });

  const inputs = [
    {
      id: 1,
      type: 'text',
      label: 'Nom',
      errorMessage: errorMessages.lastname,
      name: 'lastname',
      isRequired: true,
    },
    {
      id: 2,
      type: 'text',
      label: 'Prenom',
      errorMessage: errorMessages.firstname,
      name: 'firstname',
      isRequired: true,
    },
    {
      id: 3,
      type: 'text',
      label: "Nom d'utilisateur",
      errorMessage: errorMessages.username,
      name: 'username',
      isRequired: true,
    },
    {
      id: 4,
      type: 'email',
      label: 'Email',
      errorMessage: errorMessages.email,
      name: 'email',
      isRequired: true,
    },
    {
      id: 5,
      type: 'text',
      label: 'N° de téléphone',
      errorMessage: errorMessages.phone,
      name: 'phone',
      isRequired: false,
    },
    {
      id: 6,
      type: 'date',
      label: 'Date de naissance',
      errorMessage: errorMessages.birthdate,
      name: 'birthdate',
      isRequired: true,
    },
    {
      id: 7,
      type: 'text',
      label: 'Rue',
      errorMessage: errorMessages.adress,
      name: 'adress',
      isRequired: true,
    },
    {
      id: 8,
      type: 'text',
      label: 'Ville',
      errorMessage: errorMessages.city,
      name: 'city',
      isRequired: true,
    },
    {
      id: 9,
      type: 'text',
      label: 'Code postal',
      errorMessage: errorMessages.postCode,
      name: 'postCode',
      isRequired: true,
    },
    {
      id: 10,
      type: 'password',
      label: 'Mot de passe',
      errorMessage: errorMessages.password,
      name: 'password',
      isRequired: true,
    },
    {
      id: 11,
      type: 'password',
      label: 'Confirmation mot de passe',
      errorMessage: errorMessages.confPassword,
      name: 'confPassword',
      isRequired: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ''));
    setErrorMessages({ ...errorMessages });
    if (
      formRegisterValidation(
        errorMessages,
        setErrorMessages,
        values,
        passwordValid,
        setconditionError,
        conditionsChecked,
      )
    ) {
      User.email = values.email.trim();
      User.password = bcrypt.hashSync(values.password.trim() as string, 8);
      User.userInfo.fistname = values.firstname.trim();
      User.userInfo.lastname = values.lastname.trim();
      User.userInfo.phone = values.phone;
      User.username = values.username.trim();
      User.userInfo.birthdate = values.birthdate;
      User.userInfo.adress.street = values.adress.trim();
      User.userInfo.adress.city = values.city.trim();
      User.userInfo.adress.postCode = values.postCode;
      await registerUser(User, errorMessages, setErrorMessages, setIsValidate);
    }
  };

  useEffect(() => {
    if (isValidate) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        navigate('/verification-email', { state: { email: values.email.trim() } });
      }, 500);
    }
  }, [isValidate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheckbox = () => {
    setConditionsChecked(!conditionsChecked);
  };

  return (
    <div className="App-register">
      <Banner title={title} />
      <div className="register-wrapper">
        <form
          className="register-form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          {inputs.map((input) => (
            <CustomInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <PasswordChecklist
            rules={[
              'minLength',
              'specialChar',
              'lowercase',
              'number',
              'capital',
              'match',
            ]}
            className="password-checklist"
            iconSize={12}
            minLength={8}
            value={values.password}
            valueAgain={values.confPassword}
            onChange={(isValid) => {
              setPasswordValid(isValid);
            }}
            messages={{
              minLength: 'Le mot de passe possède au moins 8 catactères.',
              lowercase: 'Le mot de passe contient une miniscule.',
              capital: 'Le mot de passe contient une majuscule.',
              specialChar: 'Le mot de passe contient un caractère spécial.',
              number: 'Le mot de passe contient un chiffre.',
              match: 'Les mots de passe sont identiques.',
            }}
          />
          <div className="checkbox-conditions">
            <input
              type="checkbox"
              checked={conditionsChecked}
              onChange={handleCheckbox}
            />
            <span>
              {' '}
              J'ai lu et accepté{' '}
              <a href={pdf} target="_blank" rel="noreferrer">
                les conditions d'utilisation.
              </a>
            </span>
          </div>
          <span className="error">{conditionError !== '' && conditionError}</span>
          <button className="register-submit-button" type="submit">
            Créer votre compte
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
