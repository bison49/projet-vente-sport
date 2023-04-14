/* eslint-disable react/no-unescaped-entities */
import './resetPasswordCode.css';

import { SetStateAction, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Banner from '../../../Component/banner/Banner';

function ResetPassword() {
  const { state } = useLocation();
  const { code, id, message } = state;
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const title = "Code d'autorisation";
  const [errorMessage, setErrorMessage] = useState('');
  injectStyle();

  function handleChange(otpInput: SetStateAction<string>) {
    setOtp(otpInput);
  }

  function reset() {
    setOtp('');
  }

  const regexCode = /^[0-9]{0,5}$/;
  useEffect(() => {
    setErrorMessage('');
    if (otp !== undefined && !regexCode.test(otp)) {
      if (code === parseInt(otp)) {
        setTimeout(() => {
          navigate('/reset/forgot/password', {
            state: { id: id },
          });
        }, 500);
      } else {
        setErrorMessage('code incorrect');
      }
    }
  }, [otp]);

  useEffect(() => {
    toast.info(message, {
      toastId: 'success3',
    });
  }, []);

  return (
    <div>
      <div className="reset-password-code-container">
        <Banner title={title} />
        <ToastContainer theme="dark" autoClose={false} />
        <div className="reset-password-code-wrapper">
          <div className="form-reset-password-code-wrapper">
            <span className="error">{errorMessage}</span>

            <div className="reset-password-code-input-wrapper">
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span>-</span>}
              />
            </div>
            <button type="button" className="reset-password-code-button" onClick={reset}>
              Effacer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
