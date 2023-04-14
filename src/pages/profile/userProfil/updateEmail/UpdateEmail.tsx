/* eslint-disable react/no-unescaped-entities */
import './updateEmail.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Banner from '../../../../Component/banner/Banner';
import useToken from '../../../../utils/Auth/useToken';
import useUser from '../../../../utils/Auth/useUser';
import { modifUser } from '../../../../utils/axios_request';
import { formResetPasswordEmailValidation } from '../../../../utils/form/formValidation';

function UpdateEmail() {
  const [email, setEmail] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const navigate = useNavigate();
  const title = 'Modifier votre adresse email';
  const { user } = useUser();
  const { token } = useToken();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formResetPasswordEmailValidation(email, setErrorMessage)) {
      if (email.trim() !== user.email) {
        await modifUser(
          user.id,
          { email: email.trim(), userInfo: { isActive: false } },
          token,
          undefined,
          undefined,
          undefined,
          setErrorMessage,
          setIsValidate,
        );
      } else {
        setErrorMessage('Votre adresse email est identique à la précédente');
      }
    }
  };

  useEffect(() => {
    if (isValidate) {
      navigate('/verification-email', { state: { email: email.trim() } });
    }
  }, [isValidate]);

  return (
    <div>
      <Banner title={title} />
      <div className="reset-password-email-container">
        <div className="reset-password-email-wrapper">
          <form className="form-reset-password-email-wrapper">
            <span className="error">{errorMessage}</span>
            <input
              className="reset-password-email-input"
              placeholder="Tapez votre nouvelle adresse email"
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

export default UpdateEmail;
