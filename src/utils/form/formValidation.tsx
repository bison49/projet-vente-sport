/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from 'react';

export const formRegisterValidation = (
  errorMessages: {
    lastname: string;
    firstname: string;
    username: string;
    birthdate: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    postCode: string;
  },
  setErrorMessages: { (value: any): void; (arg0: any): void },
  values: {
    lastname: string;
    firstname: string;
    username: string;
    birthdate: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    postCode: string;
  },
  passwordValid?: boolean,
  setconditionError?: { (value: SetStateAction<string>): void; (arg0: string): void },
  conditionsChecked?: boolean,
) => {
  if (setconditionError) setconditionError('');
  let isValid = true;
  const dateRegex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
  //eslint-disable-next-line
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegex = /^((\+)33|0)[1-9](\d{2}){4}$/;
  const postCodeRegex = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
  if (values.lastname.trim() === '') {
    errorMessages.lastname = 'Le nom est requis.';
    isValid = false;
  } else if (values.lastname !== '' && values.lastname.length > 50) {
    errorMessages.lastname = 'Le nom ne doit pas comporter plus de 50 caractères.';
    isValid = false;
  }
  if (values.firstname.trim() === '') {
    errorMessages.firstname = 'Le prénom est requis.';
    isValid = false;
  } else if (values.firstname !== '' && values.lastname.length > 50) {
    errorMessages.firstname = 'Le prénom ne doit pas comporter plus de 50 caractères.';
    isValid = false;
  }
  if (values.username.trim() === '') {
    errorMessages.username = "Le nom d'utilisateur est requis.";
    isValid = false;
  } else if (values.username !== '' && values.lastname.length > 50) {
    errorMessages.username = "L'identifiant ne doit pas comporter plus de 50 caractères.";
    isValid = false;
  }
  if (dateRegex.test(values.birthdate) || values.birthdate === '') {
    errorMessages.birthdate = "La date n'est pas valide.";
    isValid = false;
  }
  if (!emailRegex.test(values.email.trim())) {
    errorMessages.email = "L'email n'est pas valide.";
    isValid = false;
  } else if (values.email !== '' && values.email.length > 80) {
    errorMessages.email = "L'email ne doit pas comporter plus de 80 caractères.";
    isValid = false;
  }
  if (values.phone.trim() !== '') {
    if (!phoneRegex.test(values.phone)) {
      errorMessages.phone = "Le numéro de téléphone n'est pas valide.";
      isValid = false;
    }
  }
  if (values.adress.trim() === '') {
    errorMessages.adress = 'La rue est requise.';
    setErrorMessages({ ...errorMessages });
    isValid = false;
  } else if (values.adress !== '' && values.lastname.length > 50) {
    errorMessages.adress = 'La rue ne doit pas comporter plus de 50 caractères.';
    isValid = false;
  }
  if (values.city.trim() === '') {
    errorMessages.city = 'La ville est requise.';
    isValid = false;
  } else if (values.city !== '' && values.lastname.length > 50) {
    errorMessages.city = 'La ville ne doit pas comporter plus de 50 caractères.';
    isValid = false;
  }
  if (!postCodeRegex.test(values.postCode)) {
    errorMessages.postCode = "Le code postal n'est pas valide.";
    isValid = false;
  }
  if (!conditionsChecked && conditionsChecked !== undefined) {
    if (setconditionError)
      setconditionError("Veuillez accepter les conditions d'utilisation");
    isValid = false;
  }

  if (!passwordValid && passwordValid !== undefined) {
    isValid = false;
  }
  setErrorMessages({ ...errorMessages });
  const inputError = document.querySelector('.error');
  inputError?.scrollIntoView();
  return isValid;
};

export function formLoginValidation(
  email: string,
  password: string,
  errorMessages: { email: string; password: string },
  setErrorMessages: { (value: any): void; (arg0: any): void },
) {
  let isValid = true;
  if (email.trim() === '') {
    errorMessages.email = "L'email est requis";
    isValid = false;
  }
  if (password.trim() === '') {
    errorMessages.password = 'Le mot de passe est requis';
    isValid = false;
  }
  setErrorMessages({ ...errorMessages });
  return isValid;
}

export function formResetPasswordEmailValidation(email: string, setErrorMessage: any) {
  let isValid = true;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email.trim())) {
    setErrorMessage("L'email n'est pas valide.");
    isValid = false;
  }
  return isValid;
}

export function formArticleValidation(
  values: {
    name: string;
    description: string;
    price: number;
    category: string;
  },
  setErrorMessages: {
    (
      value: SetStateAction<{
        name: string;
        description: string;
        price: string;
        category: string;
      }>,
    ): void;
    (arg0: any): void;
  },
  errorMessages: {
    name: string;
    description: string;
    price: string;
    category: string;
    images: string;
  },
  images: any,
) {
  let isValid = true;
  const regexNumeric = /^[0-9]*$/gm;
  if (values.name.trim() === '') {
    errorMessages.name = "Le nom de l'article est requis.";
    isValid = false;
  } else if (values.name !== '' && values.name.length > 100) {
    errorMessages.name =
      "Le nom de l'article ne doit pas comporter plus de 100 caractères.";
    isValid = false;
  }
  if (values.description.trim() === '') {
    errorMessages.description = "La description de l'article est requise.";
    isValid = false;
  } else if (values.description !== '' && values.description.length > 1000) {
    errorMessages.description =
      "La description de l'article ne doit pas comporter plus de 1000 caractères.";
    isValid = false;
  }
  if (values.price === null || values.price <= 0) {
    errorMessages.price = 'Vous devez indiquer un prix';
    isValid = false;
  } else if (!regexNumeric.test(values.price.toString())) {
    errorMessages.price = 'Veuillez utiliser uniquement des chiffres.';
    isValid = false;
  }
  if (values.category === '') {
    errorMessages.category = 'Vous devez choisir une catégorie';
    isValid = false;
  }
  if (images.length === 0) {
    errorMessages.images = 'Vous devez télécharger au moins 1 fichier(3 maximum)';
    isValid = false;
  }
  setErrorMessages({ ...errorMessages });
  return isValid;
}
