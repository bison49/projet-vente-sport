/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './login.css';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { BiHide } from 'react-icons/bi';
import { TailSpin } from 'react-loading-icons';
import Modal from 'react-modal';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Banner from '../../Component/banner/Banner';
import useUser from '../../utils/Auth/useUser';
import { loginUser } from '../../utils/axios_request';
import { formLoginValidation } from '../../utils/form/formValidation';

function Login({ setToken }: any) {
  const { message } = useParams();
  const [email, setEmail] = useState<string>(
    localStorage.remember && localStorage.email !== '' ? localStorage.email : '',
  );
  const { setUser } = useUser();
  const [rememberChecked, setRememberChecked] = useState<boolean>(
    localStorage.remember ? true : false,
  );
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<any>({
    notActive: '',
    identifiants: '',
    email: '',
    password: '',
  });
  const [password, setPassword] = useState<string>(
    localStorage.remember && localStorage.password !== '' ? localStorage.password : '',
  );
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const title = 'Connexion';
  const navigate = useNavigate();
  const { state } = useLocation();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleCheckbox = () => {
    setRememberChecked(!rememberChecked);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  injectStyle();

  useEffect(() => {
    Modal.setAppElement('body');
    if (message === 'activated') {
      toast.success('Votre compte est activé, vous pouvez désormais vous connecter', {
        toastId: 'success1',
      });
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isLoading]);

  function handleVisible() {
    setPasswordVisible(!passwordVisible);
  }

  function handleNotActivated() {
    navigate('/verification-email', { state: { email: email } });
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ''));
    setErrorMessages({ ...errorMessages });
    if (formLoginValidation(email, password, errorMessages, setErrorMessages)) {
      if (rememberChecked && email !== '') {
        localStorage.email = email;
        localStorage.password = password;
        localStorage.remember = rememberChecked;
      } else if (!rememberChecked && localStorage.email !== '') {
        localStorage.removeItem('remember');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      await loginUser(
        email,
        password,
        setErrorMessages,
        errorMessages,
        setToken,
        setUser,
        setIsValidate,
        setIsLoading,
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isValidate) {
      navigate(state ? state.from.pathname : '/');
    }
  }, [isValidate]);

  return (
    <div className="container">
      <ToastContainer position="top-center" transition={Slide} autoClose={5000} />
      <Banner title={title} />
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="login-modal">
          <TailSpin fill="#06bcee" stroke="#06bcee" fillOpacity={10} />
          <span className="loading-text">loading...</span>
        </div>
      </Modal>
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="error">{errorMessages.identifiants}</span>
          <span className="error">
            {errorMessages.notActive}
            {errorMessages.notActive && (
              <button
                type="button"
                className="not-active-button"
                onClick={handleNotActivated}
              >
                {' '}
                cliquez ici
              </button>
            )}{' '}
            {errorMessages.notActive && ' pour recevoir un nouvel email.'}
          </span>
          <div className="input-field">
            <label htmlFor="username">
              <span className="label-style">Email</span>
            </label>
            <div className="input-login">
              <input
                type={'text'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <span>{errorMessages.email}</span>
          </div>
          <div className="input-field">
            <label htmlFor="password">
              <span className="label-style">Mot de passe</span>
            </label>
            <div className="input-login">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordVisible ? (
                <BiShow size={'20px'} className="show-password" onClick={handleVisible} />
              ) : (
                <BiHide size={'20px'} className="show-password" onClick={handleVisible} />
              )}
            </div>
            <span>{errorMessages.password}</span>
          </div>
          <div className="checkbox-remember-me">
            <input type="checkbox" checked={rememberChecked} onChange={handleCheckbox} />
            <span> Se rappeler de moi.</span>
          </div>
          <div>
            <button type="submit" className="submit-button">
              <span className="submit-text">Se connecter</span>
            </button>
          </div>
          <Link to="/reset/password/email" className="forgot-link">
            Mot de passe oublié ?
          </Link>
          <div className="text-no-account">
            Vous n'avez pas encore de compte sur notre application
          </div>
          <Link to="/register" className="register-link">
            <button type="button" className="new-account-button">
              Créez un compte
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
