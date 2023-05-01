/* eslint-disable @typescript-eslint/no-explicit-any */
import './App.css';

import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './pages/admin/admin';
import AddArticle from './pages/article/AddArticle/AddArticle';
import ArticleDetails from './pages/article/articleDetails/ArticleDetails';
import UpdateArticle from './pages/article/updateArticle/UpdateArticle';
import Error404 from './pages/Error404/error404';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import UserAdvert from './pages/profile/userAdvert/UserAdvert';
import UserBoughtArticle from './pages/profile/userBoughtArticle/UserBoughtArticle';
import UserCurrentAdvert from './pages/profile/userCurrentAdvert/UserCurrentAdvert';
import UserFavorite from './pages/profile/userFavorite/UserFavorite';
import UpdateEmail from './pages/profile/userProfil/updateEmail/UpdateEmail';
import UpdatePassword from './pages/profile/userProfil/updatePassword/UpdatePassword';
import UserProfil from './pages/profile/userProfil/UserProfil';
import UserSoldArticle from './pages/profile/userSoldArticle/UserSoldArticle';
import Register from './pages/register/Register';
import ForgotPasswordReset from './pages/resetPassword/forgotPasswordReset/ForgotPasswordReset';
import ResetPasswordCode from './pages/resetPassword/resetPasswordCode/ResetPasswordCode';
import SendMailResetPassword from './pages/resetPassword/sendMailResetPassword/SendMailResetPassword';
import SendVerificationMail from './pages/sendMailActivation/SendVerificationMail';
import AuthVerify from './utils/Auth/authVerify';
import { logout } from './utils/Auth/logout';
import useToken from './utils/Auth/useToken';
import useUser from './utils/Auth/useUser';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const { setToken } = useToken();
  const { token } = useToken();
  const { user } = useUser();

  async function disconnect(id: number) {
    await logout(id);
  }

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        disconnect(user.id);
      }
    }
  }, []);

  return (
    <div>
      <AuthVerify />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="article/:id" element={<ArticleDetails />} />
          <Route path="login/:message?" element={<Login setToken={setToken} />} />
          <Route path="reset/forgot/password" element={<ForgotPasswordReset />} />
          <Route path="reset/password/code" element={<ResetPasswordCode />} />
          <Route path="reset/password/email" element={<SendMailResetPassword />} />
          <Route path="user-advert/:id" element={<UserAdvert />} />
          <Route
            path="admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="verification-email" element={<SendVerificationMail />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-article"
            element={
              <ProtectedRoute>
                <AddArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-articles-sold"
            element={
              <ProtectedRoute>
                <UserSoldArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-articles-bought"
            element={
              <ProtectedRoute>
                <UserBoughtArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-adverts"
            element={
              <ProtectedRoute>
                <UserCurrentAdvert />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-profil"
            element={
              <ProtectedRoute>
                <UserProfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="update-article"
            element={
              <ProtectedRoute>
                <UpdateArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-favorite"
            element={
              <ProtectedRoute>
                <UserFavorite />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-profil-update-password"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-profil-update-email"
            element={
              <ProtectedRoute>
                <UpdateEmail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
