/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchHydra as baseFetchHydra,
  FieldGuesser,
  HydraAdmin,
  hydraDataProvider as baseHydraDataProvider,
  ListGuesser,
  ResourceGuesser,
} from '@api-platform/admin';
import { parseHydraDocumentation } from '@api-platform/api-doc-parser';
import { SetStateAction, useEffect, useState } from 'react';
import { CustomRoutes } from 'react-admin';
import { ReferenceField, TextField } from 'react-admin';
import { Navigate, Route } from 'react-router-dom';

import MyLayout from './MyLayout';

const entrypoint = 'http://127.0.0.1:8000/api';

const getHeaders = () => {
  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString as string);
  return {
    Authorization: `Bearer ${token}`,
  };
};

const RedirectToProfil = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString as string);
  const roles = user.role;

  if (roles.includes('ROLE_ADMIN')) {
    return <></>;
  }
  return <Navigate to="/Profile" />;
};
const apiDocumentationParser =
  (setRedirectToProfil: (arg0: boolean) => void) => async () => {
    try {
      setRedirectToProfil(false);

      return await parseHydraDocumentation(entrypoint, { headers: getHeaders });
    } catch (result) {
      const { api, response, status }: any = result;
      if (status !== 401 || !response) {
        throw result;
      }

      // Eviter une boucle infinie si le token est expirée
      localStorage.removeItem('token');

      setRedirectToProfil(true);

      return {
        api,
        response,
        status,
      };
    }
  };

const fetchHydra = (url: any, options = {}) =>
  baseFetchHydra(url, {
    ...options,
    headers: getHeaders,
  });

const dataProvider = (setRedirectToProfil: {
  (value: SetStateAction<boolean>): void;
  (arg0: boolean): void;
}) =>
  baseHydraDataProvider({
    entrypoint: entrypoint,
    httpClient: fetchHydra,
    apiDocumentationParser: apiDocumentationParser(setRedirectToProfil),
    mercure: true,
    useEmbedded: true,
  });

const UserList = (props: any) => (
  <ListGuesser {...props}>
    <FieldGuesser source="email" />
    <FieldGuesser label="identifiant" source="username" />
    <FieldGuesser source="roles" />
    <ReferenceField label="prénom" source="userInfo" reference="user_infos">
      <TextField source="fistname" />
    </ReferenceField>
    <ReferenceField label="nom" source="userInfo" reference="user_infos">
      <TextField source="lastname" />
    </ReferenceField>
  </ListGuesser>
);

const CategoriesList = (props: any) => (
  <ListGuesser {...props}>
    <FieldGuesser label="nom" source="name" />
  </ListGuesser>
);

const UserInfoList = (props: any) => (
  <ListGuesser {...props}>
    <FieldGuesser label="prénom" source="fistname" />
  </ListGuesser>
);

const ArticlesList = (props: any) => (
  <ListGuesser {...props}>
    <FieldGuesser label="Nom de l'article" source="name" />
    <FieldGuesser label="Description" source="description" />
    <FieldGuesser label="Prix" source="price" />
    <FieldGuesser label="Vendu" source="isSold" />
  </ListGuesser>
);

// To use Hydra:
const Admin = () => {
  const [redirectToProfil, setRedirectToProfil] = useState(false);

  useEffect(() => {
    document.title = 'Api platform admin';
  }, []);
  return (
    <>
      <HydraAdmin
        layout={MyLayout}
        basename="/admin"
        dataProvider={dataProvider(setRedirectToProfil)}
        entrypoint={window.origin}
      >
        <CustomRoutes>
          {redirectToProfil ? <Route path="/" element={<RedirectToProfil />} /> : null}
        </CustomRoutes>
        <ResourceGuesser name="users" list={UserList} />
        <ResourceGuesser name="articles" list={ArticlesList} />
        <ResourceGuesser name="categories" list={CategoriesList} />
        <ResourceGuesser name="user_infos" list={UserInfoList} />
      </HydraAdmin>
    </>
  );
};

export default Admin;
