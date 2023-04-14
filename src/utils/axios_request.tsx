/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const API_URL = 'http://localhost:8000';

export async function loginUser(
  email: string,
  password: string,
  setErrorMessages: {
    (value: any): void;
    (arg0: { notActive: string; identifiants: string }): void;
  },
  errorMessages: { notActive: string; identifiants: string },
  setToken: any,
  setUser: any,
  setIsValidate: any,
  setIsLoading: any,
) {
  setIsLoading(true);
  const bodyFormData = new FormData();
  bodyFormData.append('email', email);
  bodyFormData.append('password', password);
  await axios
    .post(`${API_URL}/api/login`, bodyFormData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
    .then((data) => {
      const token = data.token;
      axios
        .get(`${API_URL}/api/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          setUser(data);
          setToken(token);
          setIsValidate(true);
        })
        .catch((error) => {
          if (error.response.data.status === 401) {
            errorMessages.notActive = error.response.data.detail;
            setErrorMessages({ ...errorMessages });
          } else {
            alert(error.message);
          }
        });
    })
    .catch((error) => {
      if (error.response && error.response.data.code === 401) {
        errorMessages.identifiants =
          "Identifiants incorrects, nom d'utilisateur ou mot de passe incorrect";
        setErrorMessages({ ...errorMessages });
      } else {
        alert(error.message);
      }
    });
}

export async function registerUser(
  user: {
    email: string;
    password: string;
    userInfo: {
      fistname: string;
      lastname: string;
      phone: string;
      creationDate: Date;
      lastConnectionDate: null;
      lastUpdateDate: null;
      birthdate: string;
      isActive: boolean;
      adress: { street: string; city: string; postCode: string };
    };
    username: string;
  },
  errorMessages: { email: string; username: string },
  setErrorMessages: {
    (value: any): void;
    (arg0: { email: string; username: string }): void;
  },
  setIsValidate: Dispatch<SetStateAction<boolean>>,
) {
  return await axios
    .post(`${API_URL}/api/users`, user, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data)
    .then(() => {
      setIsValidate(true);
    })
    .catch((error) => {
      const violations = error.response.data.violations;
      if (violations.length > 0) {
        violations.forEach((violation: { propertyPath: string; message: string }) => {
          if (violation.propertyPath === 'email') {
            errorMessages.email = violation.message;
          }
          if (violation.propertyPath === 'username') {
            errorMessages.username = violation.message;
          }
        });
        setErrorMessages({ ...errorMessages });
      } else {
        alert(error.message);
      }
    });
}

export async function sendMail(email: string) {
  const bodyFormat = new FormData();
  bodyFormat.append('email', email);
  await axios
    .post(`${API_URL}/sendMail`, bodyFormat, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function modifUser(
  id: number,
  userField: any,
  token?: string,
  errorMessages?: { email: string; username: string } | undefined,
  setErrorMessages?: { (value: any): void; (arg0: any): void } | undefined,
  setUser?: { (user: any): void; (arg0: any): void } | undefined,
  setErrorMessage?: Dispatch<SetStateAction<string>> | undefined,
  setIsValidate?:
    | { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
    | undefined,
) {
  let header;
  if (token && token !== undefined) {
    header = {
      'content-type': 'application/merge-patch+json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    header = {
      'content-type': 'application/merge-patch+json',
    };
  }
  await axios
    .patch(`${API_URL}/api/users/${id}`, userField, { headers: header })
    .then((res) => res.data)
    .then((data) => {
      if (token && token !== undefined) {
        if (setUser) setUser(data);
      }
      if (setIsValidate) setIsValidate(true);
    })
    .catch((error) => {
      if (error.response.data.violations !== undefined) {
        const violations = error.response.data.violations;
        if (violations.length > 0) {
          violations.forEach((violation: { propertyPath: string; message: string }) => {
            if (violation.propertyPath === 'email') {
              if (errorMessages && errorMessages !== undefined)
                errorMessages.email = violation.message;
              if (setErrorMessage && setErrorMessage !== undefined)
                setErrorMessage(violation.message);
            }
            if (violation.propertyPath === 'username') {
              if (errorMessages && setErrorMessages !== undefined)
                errorMessages.username = violation.message;
            }
          });
          if (setErrorMessages) setErrorMessages({ ...errorMessages });
        } else {
          alert(error.message);
        }
      } else {
        alert(error.message);
      }
    });
}

export async function modifPassword(id: number, userField: any) {
  await axios
    .patch(`${API_URL}/api/update-forgot-password/${id}`, userField, {
      headers: {
        'content-type': 'application/merge-patch+json',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      alert(error.message);
    });
}

export async function getCategories(setData: {
  (value: SetStateAction<any[]>): void;
  (arg0: any): void;
}) {
  await axios
    .get(`${API_URL}/api/categories`, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data)
    .then((data) => {
      setData(data['hydra:member']);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function addArticle(
  body: {
    name: string;
    description: string;
    price: number;
    isSold: boolean;
    dateForSale: Date;
    dateSold: null;
    categorie: string;
    seller: string;
    buyer: null;
  },
  token: string,
  files: any[],
  setMessage: { (value: SetStateAction<string>): void; (arg0: any): void },
  setIsValidate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
) {
  await axios
    .post(`${API_URL}/api/articles`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      try {
        addImage(files, data.id, token, setMessage, setIsValidate);
      } catch (error) {
        alert(error);
      }
    })
    .catch((error) => {
      alert(error.response.data);
    });
}

async function addImage(
  files: any[],
  articleId: number,
  token: any,
  setMessage: {
    (value: SetStateAction<string>): void;
    (arg0: any): void;
    (arg0: any): void;
  },
  setIsValidate: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
    (arg0: boolean): void;
  },
) {
  const body = new FormData();
  body.append('articleId', articleId.toString());
  files.forEach((file, i) => {
    body.append(`file-${i}`, file);
  });
  await axios
    .post(`${API_URL}/api/add-images`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .then((data) => {
      setMessage(data.message);
      setIsValidate(true);
    })
    .catch((error) => {
      alert(error.response.data);
    });
}

export async function getArticles(
  page: string,
  setArticles: (arg0: any) => void,
  setHydra: (arg0: any) => void,
  setTotalPages: any,
  setPrices: { (value: SetStateAction<number[]>): void; (arg0: number[]): void },
) {
  const ITEM_PER_PAGE = 20;
  await axios
    .get(`${API_URL}${page}`, {
      headers: { 'content-type': 'application/ld+json' },
    })
    .then((res) => res.data)
    .then((data) => {
      let minPrice = 0;
      let maxPrice = 100;
      if (data['hydra:totalItems'] !== 0) {
        data['hydra:member'].map((element: any) => {
          if (element.price > maxPrice) {
            maxPrice = element.price;
          }
          if (element.price < minPrice) {
            minPrice = element.price;
          }
        });
      } else {
        minPrice = 0;
        maxPrice = 1000;
      }
      setPrices([minPrice, maxPrice]);
      setArticles(data['hydra:member']);
      setHydra(data['hydra:view']);
      setTotalPages(Math.ceil(data['hydra:totalItems'] / ITEM_PER_PAGE));
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function getVicopoCities(
  setCities: {
    (value: SetStateAction<any[]>): void;
    (arg0: any): void;
  },
  value: string,
) {
  await axios
    .get(`https://vicopo.selfbuild.fr/search/${value}`)
    .then((res) => res.data)
    .then((data) => {
      setCities(data.cities);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function getArticle(
  setData: {
    (value: SetStateAction<any[]>): void;
    (arg0: any): void;
  },
  id: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) {
  await axios
    .get(`${API_URL}/api/articles/${id}`, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data)
    .then((data) => {
      setData(data);
      setIsLoading(false);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function getUserAdvert(
  id: string,
  setData: { (value: any): void; (arg0: any): void },
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setArticles: { (value: SetStateAction<any[]>): void; (arg0: any): void },
) {
  await axios
    .get(`${API_URL}/api/user-advert/${id}`, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data)
    .then((data) => {
      setData(data);
      setArticles(data.soldArticles);
      setIsLoading(false);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function getUserProfilAdvert(
  id: string,
  url: string,
  setIsLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setArticles: { (value: SetStateAction<any[]>): void; (arg0: any): void },
) {
  await axios
    .get(`${API_URL}/${url}`, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data)
    .then((data) => {
      setArticles(data['hydra:member']);
      setIsLoading(false);
    })
    .catch((error) => {
      alert(error.message);
    });
}

export async function deleteArticle(
  id: number,
  token: string,
  setArticleDelete: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
) {
  await axios
    .delete(`${API_URL}/api/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setArticleDelete(true);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateArticle(
  id: string,
  userField: any,
  setMessage: { (value: SetStateAction<string>): void; (arg0: string): void },
  token: string,
  setIsValidate: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
) {
  await axios
    .patch(`${API_URL}/api/articles/${id}`, userField, {
      headers: {
        'content-type': 'application/merge-patch+json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .then(() => {
      setMessage('Votre annonce a été mise à jour');
      setIsValidate(true);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

export async function getPassword(
  id: number,
  setPassword: (arg0: any) => void,
  token: string,
) {
  axios
    .get(`${API_URL}/api/user-password/${id}`, {
      headers: {
        'content-type': 'application/merge-patch+json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .then((data) => {
      setPassword(data.password);
    })
    .catch((error) => {
      alert(error.message);
    });
}
