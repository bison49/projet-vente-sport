/* eslint-disable react/no-unescaped-entities */
import './sendMailResetPassword.css';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Banner from '../../../Component/banner/Banner';
import { formResetPasswordEmailValidation } from '../../../utils/form/formValidation';

function SendMailResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const title = 'Recherche email';
  const [errorMessage, setErrorMessage] = useState('');
  const message = `Un email a été envoyé sur votre boîte mail(${email}), validez le code et vous pourrez modifier votre mot de passe`;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formResetPasswordEmailValidation(email, setErrorMessage)) {
      await axios
        .post(`http://localhost:8000/api/resetpasswordmail`, { email: email })
        .then((res) => res.data)
        .then((data) => {
          navigate('/reset/password/code', {
            state: { code: data.success, id: data.id, message: message },
          });
        })
        .catch((error) => {
          if (error.response.data.status === 404) {
            setErrorMessage(error.response.data.detail);
          } else {
            console.log(error.response.data);
          }
        });
    }
  };
  return (
    <div>
      <Banner title={title} />
      <div className="reset-password-email-container">
        <div className="reset-password-email-wrapper">
          <form className="form-reset-password-email-wrapper">
            <span className="error">{errorMessage}</span>
            <input
              className="reset-password-email-input"
              placeholder="Tapez votre adresse email"
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            <button
              type="submit"
              className="reset-password-email-button"
              onClick={handleSubmit}
            >
              Appuyer ici pour envoyer le mail
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendMailResetPassword;
