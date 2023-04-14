import './updatePassword.css';

import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import PasswordChecklist from 'react-password-checklist';
import { useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Banner from '../../../../Component/banner/Banner';
import { logout } from '../../../../utils/Auth/logout';
import useToken from '../../../../utils/Auth/useToken';
import useUser from '../../../../utils/Auth/useUser';
import { getPassword, modifUser } from '../../../../utils/axios_request';

function UpdatePassword() {
  const { user } = useUser();
  const { token } = useToken();
  const [retrievedPassword, setRetrievedPassword] = useState<string>('');
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confNewPassword, setConfNewPassword] = useState<string>('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confpasswordVisible, setConfPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const title = 'Modifier mot de passe';

  injectStyle();

  async function fetchPassword() {
    getPassword(user.id, setRetrievedPassword, token);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bcrypt.compareSync(oldPassword, retrievedPassword) && passwordValid) {
      await modifUser(
        user.id,
        {
          password: bcrypt.hashSync(newPassword.trim() as string, 8),
        },
        token,
      );
      await logout(user.id);
      toast.success(
        'Votre mot de passe a été modifié, vous allez devoir vous reconnecter',
      );
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setErrorPassword('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPassword();
    return () => controller?.abort();
  }, []);

  return (
    <div className="update-password-container">
      <ToastContainer position="top-center" transition={Slide} autoClose={2000} />
      <Banner title={title} />
      <div className="update-password-content">
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="update-password-password-wrapper"
        >
          {' '}
          <div className="input-field-update-password">
            <label htmlFor="password">
              <span className="label-style">Mot de passe actuel</span>
            </label>
            <div className="input-login-update-password">
              <input
                type={oldPasswordVisible ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {oldPasswordVisible ? (
                <BiShow
                  size={'20px'}
                  className="show-password"
                  onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                />
              ) : (
                <BiHide
                  size={'20px'}
                  className="show-password"
                  onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                />
              )}
            </div>
            <span className="error">{errorPassword}</span>
          </div>
          <div className="input-field-update-password">
            <label htmlFor="password">
              <span className="label-style">Nouveau mot de passe</span>
            </label>
            <div className="input-login-update-password">
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {newPasswordVisible ? (
                <BiShow
                  size={'20px'}
                  className="show-password"
                  onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                />
              ) : (
                <BiHide
                  size={'20px'}
                  className="show-password"
                  onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                />
              )}
            </div>
          </div>
          <div className="input-field-update-password">
            <label htmlFor="password">
              <span className="label-style">Confirmer nouveau mot de passe</span>
            </label>
            <div className="input-login-update-password">
              <input
                type={confpasswordVisible ? 'text' : 'password'}
                value={confNewPassword}
                onChange={(e) => setConfNewPassword(e.target.value)}
                required
              />
              {confpasswordVisible ? (
                <BiShow
                  size={'20px'}
                  className="show-password"
                  onClick={() => setConfPasswordVisible(!confpasswordVisible)}
                />
              ) : (
                <BiHide
                  size={'20px'}
                  className="show-password"
                  onClick={() => setConfPasswordVisible(!confpasswordVisible)}
                />
              )}
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
              className="password-checklist"
              iconSize={12}
              minLength={8}
              value={newPassword}
              valueAgain={confNewPassword}
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
          </div>
          <div>
            <button type="submit" className="submit-button">
              <span className="submit-text">Valider</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
