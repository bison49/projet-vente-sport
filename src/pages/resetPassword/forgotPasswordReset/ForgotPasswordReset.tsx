/* eslint-disable react/no-unescaped-entities */
import './forgotPasswordReset.css';
import 'react-toastify/dist/ReactToastify.css';

import bcrypt from 'bcryptjs';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import PasswordChecklist from 'react-password-checklist';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Banner from '../../../Component/banner/Banner';
import { modifPassword } from '../../../utils/axios_request';

function ForgotPasswordReset() {
  const { state } = useLocation();
  const { id } = state;
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordConfVisible, setPasswordConfVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const title = 'Modification mot de passe';
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handlePasswordVisible() {
    setPasswordVisible(!passwordVisible);
  }

  function handlePasswordConfVisible() {
    setPasswordConfVisible(!passwordConfVisible);
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (passwordValid) {
      const hashedPassword = bcrypt.hashSync(password as string, 8);
      await modifPassword(id, { password: hashedPassword });
      toast.success(
        'Nouveau mot de passe enregistré, vous allez être redirigé(e) vers la page de connexion',
      );
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    }
  };
  return (
    <div>
      <div className="reset-forgot-password-container">
        <Banner title={title} />
        <ToastContainer theme="light" autoClose={4000} />
        <div className="reset-forgot-password-wrapper">
          <form className="form-reset-forgot-password-wrapper">
            <div className="input-field">
              <label htmlFor="password">
                <span className="label-style">Nouveau mot de passe</span>
              </label>
              <div className="input-forgot-password">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordVisible ? (
                  <BiShow
                    size={'3vh'}
                    className="show-password"
                    onClick={handlePasswordVisible}
                  />
                ) : (
                  <BiHide
                    size={'3vh'}
                    className="show-password"
                    onClick={handlePasswordVisible}
                  />
                )}
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="password">
                <span className="label-style">Confirmation mot de passe</span>
              </label>
              <div className="input-forgot-password">
                <input
                  type={passwordConfVisible ? 'text' : 'password'}
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  required
                />
                {passwordConfVisible ? (
                  <BiShow
                    size={'3vh'}
                    className="show-password"
                    onClick={handlePasswordConfVisible}
                  />
                ) : (
                  <BiHide
                    size={'3vh'}
                    className="show-password"
                    onClick={handlePasswordConfVisible}
                  />
                )}
              </div>
            </div>
            <PasswordChecklist
              rules={[
                'minLength',
                'specialChar',
                'lowercase',
                'number',
                'capital',
                'match',
              ]}
              className="forgot-password-checklist"
              iconSize={12}
              minLength={8}
              value={password}
              valueAgain={passwordConf}
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
            <button
              type="submit"
              className="reset-forgot-password-button"
              onClick={handleSubmit}
            >
              Valider votre nouveau mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordReset;
