/* eslint-disable react/no-unescaped-entities */
import './sendVerificationMail.css';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { logout } from '../../utils/Auth/logout';
import useToken from '../../utils/Auth/useToken';
import useUser from '../../utils/Auth/useUser';
import { sendMail } from '../../utils/axios_request';

function SendVerificationMail() {
  const { state } = useLocation();
  const { email } = state;

  const { token } = useToken();
  const { user } = useUser();

  async function sendVerifMail() {
    await sendMail(email);
    if (token) logout(user.id);
  }

  useEffect(() => {
    sendVerifMail();
  });
  return (
    <div className="verif-mail-container">
      <div className="verif-mail-wrapper">
        <div className="verif-mail-title">
          <h1>Envoi du mail d'activation</h1>
        </div>

        <div className="verif-mail-text">
          <p>
            Un email vous a été envoyé pour activer votre compte, vous pourrez ensuite
            vous connecter<br></br>
            et accéder à votre espace personnel.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SendVerificationMail;
